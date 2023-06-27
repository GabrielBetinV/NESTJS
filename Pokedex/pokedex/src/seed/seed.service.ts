import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance =  axios;


  async executeSeed(){
    const {data } =  await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10'); 
    
    //Recorremos la data para obtener  el nombre y la url
    data.results.forEach(({name, url}) => {

      // Realizamos un split a la URL y obtendremos la posicion en donde se encuentra el no del Pokemon
      const segments = url.split('/');
      console.log(segments)
      const no:number = + segments[segments.length -2];


      console.log({name,url,no})

    });

    return data.results
  }

}
