const nombre: string = "Mauricio";
const mascotas: number = 2;
const edad: number = 27;
const hijos: boolean = false;
const colores: string[] = ["Azul", "Verde"];

interface Persona {
  nombre: string;
  mascotas?: number;
  edad: number;
  hijos?: boolean;
  colores: Array<string>;
}

const profe: Persona = {
  nombre: "Ignacio",
  edad: 32,
  hijos: false,
  colores: ["Negro", "Violeta"],
};
const alumno: Persona = { nombre, mascotas, edad, hijos, colores };

const personas: Array<Persona> = [alumno, profe];
console.log(personas);

const primerElemento = <arrayDeAlgo>(data: arrayDeAlgo): arrayDeAlgo => {
  return data[0];
};
console.log(primerElemento<Persona[]>(personas));
console.log(primerElemento<string[]>(["Mauri", "Alfredo"]));
