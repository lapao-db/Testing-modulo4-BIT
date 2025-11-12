// Archivo .test.js -> se conoce como suit de PRuebas
//Lugar donde se definen los CASOS por TEMATICAS


//1. IMPORTACIONES
import { suma } from "../src/utils/ejemplo.js";


//2. DESARROLLO


/* 
   *** estas palabras reservadas se pueden usar porque ya descargamos JEST 
    1. Bloque de prueba (agrupa por método) -> 'describe'
    2. Casos individuales  de pruebas -> 'it' (una descripción, fn flecha)
        - Es que abarquen la mayoria de los casos posibles
        - Conozca el resultado esperado
*/

describe('Probar funcion suma...', ()=>{
    //definir los casos individuales de prueba
    it('Caso 1: suma correcta de numeros positivos', ()=>{
        expect(suma(2, 3)).toBe(5);
    });

    it('Caso 2: suma correcta de numero con cero', ()=>{
        expect(suma(7,0)).toBe(7);
    });
    it('Caso 3: suma correcta de numeros negativos', ()=>{
        expect(suma(-2,-4)).toBe(-6);
    });

});