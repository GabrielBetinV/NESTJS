import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateUserDto) {
    try {
      /// Destructuramos el objeto para separar  la contraseña
      const { password, ...userData } = createAuthDto;

      // Utilizamos el hasSync
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);

      // Eliminamos la propiedad de password del objeto para no mostrarla
      delete user.password;

      return {
        ...user,
      token: this.getJwtToken({id: user.id})
    };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    //Destrucutrar el objeto que recibimos
    const { password, email } = loginUserDto;

    // Consultar el usuario que encuentre con el email

    // const user = await this.userRepository.findOneBy({ email });

    // otra manera de consultar
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id:true },
    });

    // Validar el email
    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    // Validar la contraseña
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    // try {

    // } catch (error) {
    //   this.handleDBErrors(error)
    // }

    //Retornar el usuario
    return {
      ...user,
      token: this.getJwtToken({id: user.id})
  };
  }

  // Funcion para obtener el token
  private getJwtToken(payload: JwtPayload) {
    // Generar el token
    const token = this.jwtService.sign(payload);

    return token;
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }


  async checkAuthStatus(user: User){

    return {
      ...user,
      token: this.getJwtToken({id: user.id})
    }

  }

}
