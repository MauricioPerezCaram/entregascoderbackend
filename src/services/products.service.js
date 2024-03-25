import repository from "../repositories/products.rep.js";

class ProductsController {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, options }) => {
    try {
      const response = await this.repository.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (pid) => {
    try {
      const response = await this.repository.readOne(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (pid, data) => {
    try {
      const response = await this.repository.update(pid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (pid) => {
    try {
      const response = await this.repository.destroy(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsController();
export default service;
