class UserManager {
  static usuarios = [];
  constructor(data) {
    this.id =
      UserManager.usuarios.length === 0
        ? 1
        : UserManager.usuarios[UserManager.usuarios.length - 1].id + 1;
    this.name = data.name;
    this.photo = data.photo;
    this.email = data.email;
    UserManager.usuarios.push(this);
  }
  create(data) {
    try {
      const event = {
        id:
          UserManager.usuarios.length === 0
            ? 1
            : UserManager.usuarios[UserManager.usuarios.length - 1].id + 1,
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      UserManager.usuarios.push(event);
    } catch (error) {
      return next(error);
    }
  }

  read() {
    try {
      return UserManager.usuarios;
    } catch (error) {
      return next(error);
    }
  }
  readOne(id) {
    try {
      return UserManager.usuarios.find((each) => each.id === Number(id));
    } catch (error) {
      return next(error);
    }
  }

  update(id, data) {
    try {
      const userToUpdate = UserManager.usuarios.find(
        (user) => user.id === Number(id)
      );
      if (!userToUpdate) {
        throw new Error("Usuario no encontrado");
      }
      userToUpdate.name = data.name || userToUpdate.name;
      userToUpdate.photo = data.photo || userToUpdate.photo;
      userToUpdate.email = data.email || userToUpdate.email;
      return userToUpdate;
    } catch (error) {
      return next(error);
    }
  }

  delete(id) {
    try {
      const userIndex = UserManager.usuarios.findIndex(
        (user) => user.id === Number(id)
      );
      if (userIndex === -1) {
        throw new Error("Usuario no encontrado");
      }
      const deletedUser = UserManager.usuarios.splice(userIndex, 1)[0];
      return deletedUser;
    } catch (error) {
      return next(error);
    }
  }
}

const usuarios = new UserManager({
  name: "Persona1",
  photo: "Persona1 Foto",
  email: "Persona1@hotmail.com",
});
usuarios.create({
  name: "Persona2",
  photo: "Persona2 Foto",
  email: "Persona2@hotmail.com",
});
usuarios.create({
  name: "Persona3",
  photo: "Persona3 Foto",
  email: "Persona3@hotmail.com",
});

console.log(usuarios.read());
console.log(usuarios.readOne(3));
