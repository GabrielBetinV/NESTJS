// Decoracion Deprecated,  se utiliza para marcar una función, 
//método, clase o propiedad como obsoleta o desaconsejada
const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
       console.log({target})
      return {

        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
        
      }
    }   
}


export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string,
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!`)
    }


    // Se coloca un mensaje para que los desarrolladores
    // Puedan ver que este metodo no se debe usar
    // y deben uutilizar el siguiente metodo
    @Deprecated('Most use speak2 method instead')
    speak() {
        console.log(`${ this.name }, ${ this.name }!`)
    }

    @Deprecated('Most use speak3 method instead')
    speak2() {
        console.log(`${ this.name }, ${ this.name }!!!`)
    }

}

export const charmander = new Pokemon(4, 'Charmander');

charmander.speak();