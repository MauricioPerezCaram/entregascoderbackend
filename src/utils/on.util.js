import winston from "../utils/logger/winston.utils.js";

process.on("exit", (code) =>
  winston.INFO("El proceso termino con el codigo " + code)
);

process.on("uncaughtException", (error) =>
  winston.INFO("Ha ocurrido un error" + error.message)
);

winston.INFO(process.pid);
process.pid();

process.exit(1);
