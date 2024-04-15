import fs from "fs";
import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import winston from "../../utils/logger/winston.utils.js";

class ProductsManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  async create(data) {
    try {
      this.products.push(data);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      winston.INFO("create " + data.id);
      return data;
    } catch (error) {
      winston.INFO(error.message);
      return error.message;
    }
  }
  read({ filter, options }) {
    try {
      if (this.products.length === 0) {
        throw new Error("No hay productos");
      } else {
        winston.INFO(this.products);
        return this.products;
      }
    } catch (error) {
      winston.INFO(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = this.products.find((each) => each._id === id);
      if (!one) {
        throw new Error("No hay producto con el id " + id);
      } else {
        winston.INFO(
          "Leer el producto con id " + id + " " + JSON.stringify(one, null, 2)
        );
        return one;
      }
    } catch (error) {
      winston.INFO(error.message);
      return error.message;
    }
  }

  async update(pid, data) {
    try {
      const one = this.readOne(pid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.products = this.products.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductsManager("./src/data/fs/files/products.json");
export default products;
