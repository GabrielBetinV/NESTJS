
/* ESTO ES UN ARREGLO */
export const pokemonIds = [1,20,30,34,66];

/* INSERTAR UN NUMERO AL ARRGELO Y CONVERTIMOS UN STRING A NUMBER4 CON EL +  */
pokemonIds.push(+'1');


/*ESTO ES UN OBJETO */
export const pokemon = {

    id:1,
    name:'Bulbasaur'

}

/* ESTA ES UNA INTERFACE */
interface PokemonInt {
    id: number;
    name: string;
    age: number;
}

/*
PODRIAMOS COLOCAR ALGUN CAMPO DE LA INTERFACE COMO OPCIONAL
DE ESTAS DOS MANERAS

=> Con ?  Puede venir o no el campo
interface PokemonInt {
    id: number;
    name: string;
    age?: number;
}

=> Con undefined  Debe venir o number o undefined
interface PokemonInt {
    id: number;
    name: string;
    age: number | undefined;
}

*/


/* EXPORTAMOS LA CONSTANTE DE TIPO INTERFACE PokemonInt */
export const bulbasaur:PokemonInt = {
    id: 1,
    name: 'Bulbasaur',
    age: 2
}

// export const charmander: Pokemon = {
//     id: 4,
//     name: 'Charmander',
//     age: 1
// }

// export const pokemons: Pokemon[] = [];

// pokemons.push( charmander, bulbasaur );

// console.log(pokemons)