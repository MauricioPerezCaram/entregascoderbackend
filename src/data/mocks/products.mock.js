import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js";
import winston from "../../utils/logger/winston.utils.js";

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
    winston.INFO("Producto Mock creado");
  } catch (error) {
    winston.INFO(error);
  }
}
