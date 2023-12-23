// Programar una clase “UserManager” que gestione un conjunto de usuarios.

// Debe crearse con una variable privada y de la clase que guarde todos los productos/usuarios en un arreglo

// Cada usuario tiene las propiedades:
// id (código identificador)
// name (titulo)
// photo (ruta de imagen)
// email (precio)

// Cada clase de contar con los métodos:
// create(data) el cual agregará un producto/usuario al arreglo de productos/usuarios inicial.
// Todos los campos son obligatorios menos id que debe agregarse automáticamente  y auto- incrementable.
// read() el cual debe devolver el arreglo con todos los productos/usuarios
// readOne(id) el cual debe devolver el objeto producto/usuario buscado

// Formato del entregable
// Pull Request (PR) de rama sprint1 hacia main/master según corresponda
// Probar los métodos y realizar algunas capturas de pantalla para incluir en la PR.
// Incluir readme.md explicando lo que se entregó
// La entrega es individual, en caso de trabajar en parejas, informar al tutor con quién trabajaron (ambos deben avisar).

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

// node data/memory/users.memory.js
