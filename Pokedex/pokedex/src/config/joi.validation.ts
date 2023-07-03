import * as Joi from 'joi'



export const JoiValidationSchema = Joi.object({

    // Crear reglas de validacion para las variables de entorno

    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAUL_LIMIT: Joi.number().default(6)


})