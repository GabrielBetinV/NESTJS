import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";



export const RawHeaders = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
     
        // Obtenemos la reques desde el contexto
        const req = ctx.switchToHttp().getRequest();
        
       
        return req.rawHeaders;
    }

);