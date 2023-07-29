import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";



export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
     
        // Obtenemos la reques desde el contexto
        const req = ctx.switchToHttp().getRequest();
        
        // Almacenamos el usuario enun a variable
        const user = req.user;

        if(!user)
            throw new InternalServerErrorException('User not found (request)');

        // Agregamos un ternario para que si tiene data retorne el arreglo de objetos    
        return (!data)
              ? user
              : user[data]
    }

);