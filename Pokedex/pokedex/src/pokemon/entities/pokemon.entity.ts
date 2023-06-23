import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Extiende de Document de monggose
// Se debe colocar el decorador de squema de mongo
@Schema()
export class Pokemon  extends Document{

    // El ID no se especifica porque
    // Mongo lo da
    @Prop({
        unique:true,
        index: true

    })	
    name:string;

    @Prop({
        unique:true,
        index: true

    })
    no: number;
}
export const PokemonSchema = SchemaFactory.createForClass( Pokemon);