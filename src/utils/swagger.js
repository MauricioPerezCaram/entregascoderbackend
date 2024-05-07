import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Apple Sotre Mendoza",
      description: "Documentacion de la API",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default options;
