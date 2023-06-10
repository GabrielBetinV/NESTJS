import { HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter } from '../api/pokeApi.adapter';
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
  


    constructor(
        public readonly id: number, 
        public name: string,
        // Todo: inyectar dependencias, ver la clase creada a la carpeta de API

        // // Inyectar la primera forma de inyectar la dependencia creada
        // private readonly http:PokeApiAdapter

        
        // Inyectar la interface, para poder utilirzar cualquier
        // clase que implemente esta interface
        private readonly http:HttpAdapter


 
        // Inyectar una dependencia que podra usar internamente axios o fetch
        // Esa seria la ventaja
        //private readonly http: HttpAdapter,
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        // const { data } = await axios.get<PokeapiReponse>('https://pokeapi.co/api/v2/pokemon/4');
       // const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        
        // Utilizar la primera inyeccion de dependencia
       //const data = await this.http.get('https://pokeapi.co/api/v2/pokemon/4');
      //console.log( data.moves );        
      //return data.moves;


      // Utilizar la segunda forma de inyeccion pero enviando un tipo de dato, como se coloco
      // En el adapter <T>, este este caso enviares un  tipo especifico
      const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
      console.log( data.moves );        
      return data.moves;

 

    }

}

//Crear instancias de clases para pasarla a instanciar la clase Pokemon
 const pokeApi= new PokeApiAdapter();

// const pokeApiAxios = new PokeApiAdapter();

// Crear intancia de un adaptador que utiliza fetch y no axios
 
const pokeApiFetch = new PokeApiFetchAdapter();

// Aca podriamos utilizar cualquier adaptador pero no lo deja, porque
// El constructor dice que es de tipo PokeApiAdapter, por eso se
// recomienda utilizar el principio solid de sustitucion liskov
//export const charmander = new Pokemon( 4, 'Charmander', pokeApiFetch );

export const charmander = new Pokemon( 4, 'Charmander', pokeApi );
charmander.getMoves();