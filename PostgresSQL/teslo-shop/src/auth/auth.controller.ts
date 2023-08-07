import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto ,LoginUserDto} from './dto/index';
import { AuthGuard } from '@nestjs/passport';
import * as request from 'supertest';
import { Auth, GetUser,RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRolesGuard } from './guards/user-roles/user-roles.guard';
import { Roleprotected } from './decorators/roleprotected.decorator';
import { validate } from 'uuid';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }


  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@Req() request :Express.Request

    // Obtenedremos el usuario
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
    ){





   // console.log({user: request.user})
    return {
      ok: true,
      user,
      userEmail,
      rawHeaders,
      headers

    }
  }


  @Get('private2')
  //@SetMetadata('roles', ['admin','super-user','']) // En esta metada tenemos un arreglo de roles
  @Roleprotected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRolesGuard)
  privateRoute2(
    
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }

  }



  @Get('private3')
  //@SetMetadata('roles', ['admin','super-user','']) // En esta metada tenemos un arreglo de roles
  //@Roleprotected(ValidRoles.superUser, ValidRoles.admin)
  //@UseGuards(AuthGuard(), UserRolesGuard)
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  privateRoute3(
    
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }

  }


@Get('check-status')
@Auth()
checkAuthStatus(
  @GetUser() user: User
){
  return this.authService.checkAuthStatus(user);
}


}
