
// Nueva clase que vamos a instanciar cuando se use el decorador
class NewPokemon {
    constructor(
        public readonly id: number,
        public name: string,
    ) {}

    scream() {
        console.log(`NO QUIERO!!`);
    }

    speak() {
        console.log(`NO QUIERO HABLAR!!`);
    }
}


// Los decoladores son funciones
// Creamos un ejemplo

// const MyDecorator = () => {

//     // Target es una clase o una funcion
//     // En este caso vamos a retornar la clase que tiene el decorador
//     return ( target: Function ) => {
//          console.log(target)
    
//     }
// }


// En este caso retornamos una clase nueva con el decorador
const MyDecorator = () => {

    // Target es una clase o una funcion
    // Vamos  retornar la instancion de una nueva clase
    return ( target: Function ) => {
         console.log(target)
        return NewPokemon;
    }
}



// Esta clase utilizara el derador
// El decorador tiene acceso a la clase
@MyDecorator()
export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string,
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!`)
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }!`)
    }

}

export const charmander = new Pokemon(4, 'Charmander');

charmander.scream();
charmander.speak();