import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class Usersmanager {
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
      Usersmanager.#users.push(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
  read({ filter, options }) {
    try {
      if (Usersmanager.#users.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return Usersmanager.#users;
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    try {
      const one = Usersmanager.#users.find((each) => each.id === id);
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
  async update(eid, data) {
    try {
      const one = this.readOne(eid);
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
      Usersmanager.#users = Usersmanager.#users.filter(
        (each) => each.id !== id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const users = new Usersmanager();
export default users;
