import { faker } from "@faker-js/faker";
import repository from "../../repositories/users.rep.js";
import winston from "../../utils/logger/winston.utils.js";

function usersMock() {
  return {
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email:
      faker.person.firstName().toLowerCase() +
      faker.person.lastName().toLowerCase() +
      "@gmail.com",
    password: "hola1234",
  };
}

async function createMocks() {
  try {
    const data = usersMock();
    await repository.create(data);
    winston.INFO("Mock de usuario creado");
  } catch (error) {
    winston.INFO(error);
  }
}
createMocks();
