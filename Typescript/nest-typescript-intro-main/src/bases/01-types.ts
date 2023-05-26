
/* ESTA ES UNA VARIABLE - SE PODRA NODIFICAR EN SU PROXIMO SET */
export let name: string = 'Fernando';

/* ESTAS SON CONSTANTES, NO SEPODRA CAMBIARLO */
export const age: number = 32;
export const isValid: boolean = true;

name = 'Gabriel';

/*NO SE PUEDEN COLOCAR VALORES QUE NO CORRESPONDAN AL TIPO DE DATOS */
// name = 123;
// name = true;

/**/ 
export const templateString = ` Esto es un string
multilinea
que puede tener
" dobles
' simple
inyectar valores ${ name }
expresiones ${ 1 + 1 }
números: ${ age }
booleanos: ${ isValid }
`

console.log( templateString );
