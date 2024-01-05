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
  }

  read() {
    return UserManager.usuarios;
  }
  readOne(id) {
    return UserManager.usuarios.find((each) => each.id === Number(id));
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
usuarios.create({
  name: "Persona4",
  photo: "Persona4 Foto",
  email: "Persona4@hotmail.com",
});
usuarios.create({
  name: "Persona5",
  photo: "Persona5 Foto",
  email: "Persona5@hotmail.com",
});

console.log(usuarios.read());
console.log(usuarios.readOne(4));
