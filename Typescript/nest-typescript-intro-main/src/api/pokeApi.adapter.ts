import axios from 'axios';

// Creamos esta interface, para que todos las clases la implementen
// Y desde la implementacion podamos implementar cualquier clase
// adaptadora siguiente el principio solid, principio de 
// sustitucion

// En la implementacion de las clases no colocaqueremos las clases
// si no mas bien, la interface
export interface HttpAdapter {
    
    get<T>( url: string ):Promise<T>;
    
}


// Todas las clases deben implementar la interface

// Una clase que utiliza fetch en vez de axios 
export class PokeApiFetchAdapter implements HttpAdapter {

    async get<T>( url: string ):Promise<T> {
        const resp = await fetch(url);
        const data: T = await resp.json();
        console.log('con fetch');
        return data;
    }


    
}


export class PokeApiAdapter implements HttpAdapter {

    //  usamos la propiedad de axios
    private readonly axios = axios;


    // Primera forma de utilizar axios para que sea una dependencia
    // async get(url: string){

    //     const {data} = await axios.get(url);
    //     return data;
    // }


    // SegundaPrimera forma de utilizar axios para que sea una dependencia
    // Utilizando genericos =>  <T>
    // Decimos que la respuesta es de tipo T, Generica
    async get<T>(url: string): Promise<T>{
        const {data} = await axios.get<T>(url);
        console.log('con axios');
        return data;
    }


    // async get<T>( url: string ): Promise<T> {
    //     const { data } = await this.axios.get<T>(url);
    //     console.log('con axios');
    //     return data;
    // }

    async post( url: string, data: any ) {
        
    }
    async patch( url: string, data: any ) {

    }
    async delete( url: string ) {

    }
    


}



// // Una clase que utiliza fetch en vez de axios 
// export class PokeApiFetchAdapter {

//     async get<T>( url: string ):Promise<T> {
//         const resp = await fetch(url);
//         const data: T = await resp.json();
//         console.log('con fetch');
//         return data;
//     }


    
// }


// export class PokeApiAdapter  {

//     //  usamos la propiedad de axios
//     private readonly axios = axios;


//     // Primera forma de utilizar axios para que sea una dependencia
//     // async get(url: string){

//     //     const {data} = await axios.get(url);
//     //     return data;
//     // }


//     // SegundaPrimera forma de utilizar axios para que sea una dependencia
//     // Utilizando genericos =>  <T>
//     // Decimos que la respuesta es de tipo T, Generica
//     async get<T>(url: string): Promise<T>{
//         const {data} = await axios.get<T>(url);
//         return data;
//     }


//     // async get<T>( url: string ): Promise<T> {
//     //     const { data } = await this.axios.get<T>(url);
//     //     console.log('con axios');
//     //     return data;
//     // }

//     async post( url: string, data: any ) {
        
//     }
//     async patch( url: string, data: any ) {

//     }
//     async delete( url: string ) {

//     }
    


// }

