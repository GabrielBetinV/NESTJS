import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { Roleprotected } from './roleprotected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRolesGuard } from '../guards/user-roles/user-roles.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    Roleprotected(...roles),
    UseGuards(AuthGuard(), UserRolesGuard),

  );
}