import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class UserManager {
  static #users = [];

  constructor() {}
  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      UserManager.#users.push(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, options }) {
    try {
      if (UserManager.#users.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
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
      UserManager.#users = UserManager.#users.filter((each) => each.id !== id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const users = new UserManager();
export default users;
