 import { pokemonIds , pokemon, bulbasaur} from './bases/02-objects';
 //import { name, age,templateString } from './bases/01-types';
// import { charmander } from './bases/03-classes';
// import { charmander } from './bases/04-injection';
// import { charmander } from './bases/05-decorators';
//import { charmander } from './bases/06-decorators2';

import './style.css';



const app = document.querySelector<HTMLDivElement>('#app')!;


/*02-OBJECTS */
 app.innerHTML = `
 
   <h1> EL ARREGLO =>  ${pokemonIds}!</h1>
   
   <h1> OBJETO LITERAL=>  ${pokemon.id}  -  ${pokemon.name}!</h1>

   <h1> INTERFACE=>  ${bulbasaur.name}!</h1>

 `;



/*01-TYPES */
//  app.innerHTML = `
//    <h1> ${ name } ${ age }!</h1>
//    <h1> ${ templateString}!</h1>

//  `;



// app.innerHTML = `
//   <h1>Hello ${ charmander.name } ${ charmander.id }!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;
