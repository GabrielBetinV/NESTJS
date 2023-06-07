import axios from "axios";
import { Move, PokeapiResponse } from "../interfaces/pokeapi-response.interface";
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

// export class Pokemon {

//     // Metodo Get de la imagen, con la url y el id
//      get imageUrl(): string {
//          return `https://pokemon.com/${ this.id }.jpg`;
//      }

//     constructor(public readonly id: number, public name: string) {}

//      // Metodos, se puede colocar los modificadores de acceso public o private
//     scream() {
//         console.log(`${ this.name.toUpperCase() }!!!`);
//     }

//     speak() {
//         console.log(`${ this.name }, ${ this.name }`);
//     }

//   }

//   //Instanciar la clase
//   export const charmander = new Pokemon(4, "Charmander");
//   console.log(charmander.name)

//   // Invocar los metodos
//   charmander.scream();
//   charmander.speak();

// Metodo asincrono

export class Pokemon {
  public id: number;
  public name: string;

  // get imageUrl(): string {
  //     return `https://pokemon.com/${ this.id }.jpg`;
  // }

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // constructor(
  //     public readonly id: number,
  //     public name: string,
  // Todo: inyectar dependencias

  //) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

//   //Funcion asyncrona basica, en el consle se mostrara que la promesa es fulfilled cuando es cumplida
//   async getMoves(){
//       return 10
//   }

  //Funcion asyncrona y axios
  // Instalar axios para las peticiones http => yarn add axios 

//   async getMoves() {

//     // Con el await obtengo la data, es decir, espera a que se rsuelva la promesa
//     const resp =  await axios.get('https://pokeapi.co/api/v2/pokemon/4');

//     // Accedemos a la data
//     console.log(resp.data);
//     console.log(resp.data.moves);
//     //return resp
//   }

// Destructurando la respuesra
// async getMoves() {

//     // Ve documentacion de destructuracion => https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//     const {data}=  await axios.get('https://pokeapi.co/api/v2/pokemon/4');

//     // Accedemos a la data directamente
//     console.log(data);
//     console.log(data.moves);
//     //return resp
//   }




  // Tipos de datos a la respuesta

  /* REALIZAR LOS SGTES PASOS PARA CREAR INTERFACES PARA LOS TIPOS DE DATOS
  
  1.  Crear una carpeta llamada interface
  2. Crear un archivo llamado => pokeapi-response.interface.ts
  3. Instalar la extension Paste JSON as Code
  4. Ir a una respuesta de api,por ejemplo => https://pokeapi.co/api/v2/pokemon/4
  5. Tomar el objeto json y copiarlo, dejarlo en el portapapael
  6. Abrimos el archivo pokeapi-response.interface.ts y la paleta de comando
  7. Escribimos Paste JASON a code
  8. Digitamos el nombre de la interface => PokeapiResponse
  9. Listo, ya se creo
  
  */

  // Al colocar el click sobre getMoves() se mostrara que es una promesa quie
  // resuelve un arreglo de movimientos

  // Si queremos podemos colocar el tipo a la funcion
  async getMoves(): Promise<Move[]> {

      // Aca tomamos la data y la tipamos con la interface PokeapiResponse
      const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');

      // Podriamos obtener especificamente la informacion de la data y elintellince  mostrara las prop
      //console.log( data.moves[0].move.name );

      return data.moves;
  }
}

//Instanciar la clase
export const charmander = new Pokemon(4, "Charmander");

//console.log(charmander.getMoves());
charmander.getMoves();
