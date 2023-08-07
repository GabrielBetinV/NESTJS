import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[

    ConfigModule,

    TypeOrmModule.forFeature([User]),

    PassportModule.register({ defaultStrategy: 'jwt'}),


    // Modulo asyncrono agregando el ConfigService para obtener la variable de entorno
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => {
        //console.log('JWT_SECRET =>',  configService.get('JWT_SECRET') )

        return {
          secret: configService.get('JWT_SECRET') ,
          signOptions:{
            expiresIn: '2h'
          }
        }
      }

    })

    // Modulo asyncrono
    // JwtModule.registerAsync({
    //   imports:[],
    //   inject:[],
    //   useFactory: () => {
    //     console.log('JWT_SECRET =>',  process.env.JWT_SECRET)

    //     return {
    //       secret: process.env.JWT_SECRET,
    //       signOptions:{
    //         expiresIn: '2h'
    //       }
    //     }
    //   }

    // })

    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2h'
    //   }

    // })
  ],
  exports:[
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
  
  ]
})
export class AuthModule {}
