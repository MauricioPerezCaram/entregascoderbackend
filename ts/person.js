var nombre = "Mauricio";
var mascotas = 2;
var edad = 27;
var hijos = false;
var colores = ["Azul", "Verde"];
var profe = {
    nombre: "Ignacio",
    edad: 32,
    hijos: false,
    colores: ["Negro", "Violeta"],
};
var alumno = { nombre: nombre, mascotas: mascotas, edad: edad, hijos: hijos, colores: colores };
var personas = [alumno, profe];
console.log(personas);
var primerElemento = function (data) {
    return data[0];
};
console.log(primerElemento(personas));
console.log(primerElemento(["Mauri", "Alfredo"]));
