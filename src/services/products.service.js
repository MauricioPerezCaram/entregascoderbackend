import { products } from "../data/mongo/manager.mongo.js";

class ProductsController {
  constructor() {
    this.model = products;
  }

  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, options }) => {
    try {
      const response = await this.model.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (pid) => {
    try {
      const response = await this.model.readOne(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (pid, data) => {
    try {
      const response = await this.model.update(pid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (pid) => {
    try {
      const response = await this.model.destroy(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsController();
export default service;