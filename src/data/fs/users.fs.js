import fs from "fs";
import crypto from "crypto";

class UsersManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  async createUser(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      this.users.push(user);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + user.id);
      return user.id;
    } catch (error) {
      throw error;
    }
  }
  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      throw error;
    }
  }
  readUsersById(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay usuario con el id " + id);
      } else {
        console.log(
          "Leer el usuario con id " + id + " " + JSON.stringify(one, null, 2)
        );
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async destroyUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay usuario para borrar con el id " + id);
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Eliminado el usuario con id " + id);
        return id;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let userToUpdate = this.users.find((each) => each.id === id);
      if (!userToUpdate) {
        throw new Error("No hay usuario con ese ID para cambiar " + id);
      } else {
        // Actualizar el campo 'name' con el nuevo valor proporcionado en 'data.newName'
        userToUpdate.name = data.newName || userToUpdate.name;

        // Guardar la lista actualizada en el archivo
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);

        console.log("Usuario actualizado con id " + id);
        return id;
      }
    } catch (error) {
      throw error;
    }
  }
}

const users = new UsersManager("./src/data/fs/files/users.json");
export default users;
