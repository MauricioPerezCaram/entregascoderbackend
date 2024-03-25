import { users } from "../data/mongo/manager.mongo.js";
import sendEmail from "../utils/sendEmail.utils.js";

class UsersController {
  constructor() {
    this.model = users;
  }

  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderAndPaginate }) => {
    try {
      const response = await this.model.read({ filter, orderAndPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (uid) => {
    try {
      const response = await this.model.readOne(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (uid, data) => {
    try {
      const response = await this.model.update(uid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (pid) => {
    try {
      const response = await this.model.destroy(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersController();
export default service;
