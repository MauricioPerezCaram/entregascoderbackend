import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/db.js";
import winston from "../../src/utils/logger/winston.utils.js";

const environment = argsUtil.env;

let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    winston.INFO("MEMORY CONNECTED");
    const { default: productsMemory } = await import(
      "./memory/products.memory.js"
    );
    const { default: usersMemory } = await import("./memory/users.memory.js");
    const { default: ordersMemory } = await import(
      "./memory/ordersManager.memory.js"
    );
    dao = {
      products: productsMemory,
      users: usersMemory,
      orders: ordersMemory,
    };
    break;

  case "dev":
    //vamos a usar FS
    winston.INFO("FS CONNECTED");
    const { default: productsFs } = await import("./fs/products.fs.js");
    const { default: ordersFs } = await import("./fs/ordersManager.fs.js");
    const { default: usersFs } = await import("./fs/users.fs.js");
    dao = {
      products: productsFs,
      users: usersFs,
      orders: ordersFs,
    };
    break;

  case "prod":
    dbConnection().then(() => winston.INFO("MONGO CONNECTED"));
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
    const { default: usersMongo } = await import("./mongo/users.mongo.js");

    dao = {
      products: productsMongo,
      users: usersMongo,
      orders: ordersMongo,
    };
    break;
}

export default dao;
