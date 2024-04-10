import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js";

function productsMock() {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
  };
}

export async function createProduct() {
  try {
    const data = productsMock();
    await repository.create(data);
    console.log("Producto Mock creado");
  } catch (error) {
    console.log(error);
  }
}
