import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/roleprotected.decorator';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    // ME ayuda a aver iformacion de los decoradores y metadada
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //console.log('UserRoleGuard')

    // Obtenemos el arreglo de roles del metadata
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    // Si  no hay metadata de arreglos, se retorna true  
    if(!validRoles) return true;
    if(validRoles.length === 0) return true;

    // Obtenemos el usuario
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    // Validamos si el usuario no exista
    if (!user) throw new BadRequestException('User not found');

    // asi obtenemos el rol del usuario
    console.log({ userRoles: user.roles });

    //console.log(validRoles)

    // Recorremos el arreglo de usuario
    for (const role of user.roles) {
      // Si al menos hay un role dentro del arreglo retornamos true
      if (validRoles.includes(role)) {
        return true;
      }
    }

    // Si no esta en el arreglo retornamos la exception, informando 
    // los tipos de usuarios que debe tener
    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`
    )

    //return true;
  }
}
