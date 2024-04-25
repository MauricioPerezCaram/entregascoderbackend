let nombere = "Mauri";
const apellido: string = "Perez Caram";

console.log(nombre);
console.log(apellido);

const edad: number = 27;
let mascotas: boolean = true;
// mascotas = "Perro";

let id: number | string = "123456";
id = 123456;

interface Product {
  title: string;
  price: number;
  stock: number;
  photo: string;
  available?: boolean;
}

const remera: Product = {
  title: "Remera",
  price: 9999,
  stock: 25,
  photo: "Foto remera",
  //   available: true,
};
const pantalon: Product = {
  title: "Pantalon",
  price: 1599,
  stock: 5,
  photo: "Foto pantalon",
  available: true,
};

console.log(remera);

function sumar(num1: number, num2: number): void {
  console.log(num1 + num2);
  // return num1+num2
}
const restar = (num1: number, num2: number): string => {
  console.log(num1 - num2);
  const resultado = num1 - num2;
  return "Resultado de la resta: " + resultado;
};

let produtos: string[] = ["Remera", "Pantalon", "Zapatillas", "Gorra"];
let productosCreados: Product[] = [pantalon, remera];
const productos3: Array<string> = ["Telefono", "Computadora"];
const productos4: Array<Product> = [remera, pantalon];

function esgenerica<CualquierTipo>(data: CualquierTipo): string {
  const tipodeDato: string = typeof data;
  return "El parámetro pasado es de tipo: " + typeof data;
}
const resultado1 = esgenerica<string>("Es string");
console.log(resultado1);

const resultado2 = esgenerica<number>(1234);
console.log(resultado2);

const resultado3 = esgenerica<Product>(remera);
console.log(resultado3);
