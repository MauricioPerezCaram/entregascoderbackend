import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/db.js";

const environment = argsUtil.env;

let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    console.log("MEMORY CONNECTED");
    const { default: productsMemory } = await import(
      "./memory/products.memory.js"
    );
    const { default: usersMemory } = await import("./memory/users.memory.js");
    const { default: ordersMemory } = await import("./memory/orders.memory.js");
    dao = {
      products: productsMemory,
      users: usersMemory,
      orders: ordersMemory,
    };
    break;

  case "dev":
    //vamos a usar FS
    console.log("FS CONNECTED");
    const { default: productsFs } = await import("./fs/products.fs.js");
    const { default: ordersFs } = await import("./fs/orders.fs.js");
    const { default: usersFs } = await import("./fs/users.fs.js");
    dao = {
      products: productsFs,
      users: usersFs,
      orders: ordersFs,
    };
    break;

  case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection().then(() => console.log("MONGO CONNECTED"));
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
