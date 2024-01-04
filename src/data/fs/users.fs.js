import fs from "fs";
import crypto from "crypto";

class UserManager {
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
  async createUsers(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("El nombre,la foto y el mail del usuario es necesario");
      }
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
      console.log(error.message);
      return error.message;
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
      console.log(error.message);
      return error.message;
    }
  }
  readUserById(id) {
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
      console.log(error.message);
      return error.message;
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
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UserManager("./data/fs/files/users.json");
// users.createUsers({
//   name: "Usuario 1",
//   photo: "Foto usuario 1",
//   email: "Email usuario 1",
// });
// users.createUsers({
//   name: "Usuario 2",
//   photo: "Foto usuario 2",
//   email: "Email usuario 2",
// });
// users.createUsers({
//   name: "Usuario 3",
//   photo: "Foto usuario 3",
//   email: "Email usuario 3",
// });
// users.createUsers({
//   name: "Usuario 4",
//   photo: "Foto usuario 4",
//   email: "Email usuario 4",
// });
// users.createUsers({
//   name: "Usuario 5",
//   photo: "Foto usuario 5",
//   email: "Email usuario 5",
// });
users.readUsers();
users.readUserById("0efb3a7b7e19fc96d7c1f4ca");
users.destroyUserById("");

// node ./src/data/fs/users.fs.js
export default users;