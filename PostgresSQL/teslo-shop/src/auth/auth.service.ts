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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

      return user;
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
      select: { email: true, password: true },
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
    return user;
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
