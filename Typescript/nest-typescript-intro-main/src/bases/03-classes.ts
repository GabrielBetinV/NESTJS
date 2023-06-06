import axios from "axios";
import { Move, PokeapiReponse } from "../interfaces/pokeapi-response.interface";
import { name } from "./01-types";

// FORMA TRADICIONAL DE CREAR UNA CLASE
// export class Pokemon {
//   public id: number;
//   public name: string;

//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }
// }

// // Instanciar la clase
// export const charmander = new Pokemon(4, "Charmander");

// ---------------------------------------------------------

// Forma corta de declarar e inicializar una clase
// Se coloca el modificador de acceso desde el constructor
// el readonly no permite que el valor se puedamodificar posteriormente

// export class Pokemon { 

//   constructor(public readonly id: number, public name: string) {}
// }

// //Instanciar la clase
// export const charmander = new Pokemon(4, "Charmander");

//------------------------------------------------------------

// Getters y Setters

// export class Pokemon { 


//     // Metodo Get de la imagen, con la url y el id
//      get imageUrl(): string {
//          return `https://pokemon.com/${ this.id }.jpg`;
//      }


//     constructor(public readonly id: number, public name: string) {}
//   }
  
//   //Instanciar la clase
//   export const charmander = new Pokemon(4, "Charmander");
//   console.log(charmander)
//----------------------------------------

//----------------------------------------------------

// Metodos

export class Pokemon { 


    // Metodo Get de la imagen, con la url y el id
     get imageUrl(): string {
         return `https://pokemon.com/${ this.id }.jpg`;
     }


    constructor(public readonly id: number, public name: string) {}



     // Metodos, se puede colocar los modificadores de acceso public o private
    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }
  

  }


 
  //Instanciar la clase
  export const charmander = new Pokemon(4, "Charmander");
  console.log(charmander.name)


  // Invocar los metodos
  charmander.scream();
  charmander.speak();


// export class Pokemon {

//     public id: number;
//     public name: string;

//     // get imageUrl(): string {
//     //     return `https://pokemon.com/${ this.id }.jpg`;
//     // }

// constructor(id:number, name:string){
//     this.id = id;
//     this.name= name;

// }

//     // constructor(
//     //     public readonly id: number,
//     //     public name: string,
//         // Todo: inyectar dependencias

//     //) {}

//     scream() {
//         console.log(`${ this.name.toUpperCase() }!!!`);
//     }

//     speak() {
//         console.log(`${ this.name }, ${ this.name }`);
//     }

//     async getMoves(): Promise<Move[]> {
//         const { data } = await axios.get<PokeapiReponse>('https://pokeapi.co/api/v2/pokemon/4');
//         console.log( data.moves );

//         return data.moves;
//     }

// }

// Instanciar la clase
//export const charmander = new Pokemon( 4, 'Charmander' );

//charmander.getMoves();
