import argsUtil from "../utils/args.util.js";
console.log(argsUtil);

const enviroment = argsUtil.env;

let dao = {};

switch (enviroment) {
  case "test":
    console.log("MEMORY connected");
    const { default: productsMemory } = await import(
      "./memory/products.memory.js"
    );
    const { default: usersMemory } = await import("./memory/users.memory.js");
    dao = { products: productsMemory };
    dao = { users: usersMemory };

    break;
  case "dev":
    console.log("FS connected");
    const { default: productsFs } = await import("./fs/products.fs.js");
    const { default: usersFs } = await import("./fs/users.fs.js");
    dao = { products: productsFs };
    dao = { users: usersFs };
    break;
  case "prod":
    console.log("MONGO connected");
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: usersMongo } = await import("./mongo/users.mongo.js");
    dao = { products: productsMongo };
    dao = { users: usersMongo };
    break;

  default:
    break;
}

export default dao;
