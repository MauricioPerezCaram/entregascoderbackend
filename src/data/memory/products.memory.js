import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductManager {
  static #products = [];

  constructor() {}
  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, options }) {
    try {
      if (ProductManager.#products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      ProductManager.#products = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager();
export default products;
