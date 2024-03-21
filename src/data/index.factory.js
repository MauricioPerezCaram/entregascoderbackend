import argsUtil from "../utils/args.util.js";
console.log(argsUtil);

const enviroment = argsUtil.env;

let dao = {};

switch (enviroment) {
  case "test":
    //MEMORY
    console.log("MEMORY connected");
    const { default: productsMemory } = await import(
      "./memory/products.memory.js"
    );
    dao = { products: productsMemory };
    break;
  case "dev":
    //FS
    console.log("FS connected");
    const { default: productsFs } = await import("./fs/products.fs.js");
    dao = { products: productsFs };
    break;
  case "prod":
    //MONGO
    console.log("MONGO connected");
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    dao = { products: productsMongo };
    break;

  default:
    break;
}

export default dao;
