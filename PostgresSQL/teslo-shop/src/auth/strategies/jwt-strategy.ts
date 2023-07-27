import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

//Inyectamos el patron repositorio de usuario y el configService para obtener variables de entorno
 constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService    
 ){
    super({
        secretOrKey:  configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Esta es la autenticacion que escogeremos en postman etc
    })
 }



   // Este metodo nos ayudara a validar si el usuario existe
   async validate(payload: JwtPayload): Promise<User>{

    // Destructuramos el payload
    const {email} = payload; 

    /// Buscamos el usuario por el email
    const user = await this.userRepository.findOneBy({email});


    // Validamos si el usuario existe
    if (!user)
        throw new UnauthorizedException('Token not valid');

    // Validamos si esta activo    
    if (!user.isActive)
        throw new UnauthorizedException('User is inactive, talk with an admin');


    //Retornamos el usuario
    return user;

   }



}