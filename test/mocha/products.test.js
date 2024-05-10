import assert from "assert";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";

describe("Testeando Modelo productos", () => {
  const productsDao = dao.products; // Obtenemos el objeto de productos desde dao
  let model;

  // Verificamos si productsDao es un constructor o un objeto
  if (typeof productsDao === "function") {
    model = new productsDao(); // Creamos una instancia del constructor
  } else {
    model = productsDao; // Utilizamos directamente el objeto
  }

  const data = { name: "banana", specie: "fruit" };
  let id;
  it("La creación de una producto requiere un objeto con la propiedad 'name'", () => {
    assert.ok(data.name);
  });
  //   it("La creación de una producto no necesita un objeto con la propiedad 'image'", () => {
  //     assert.strictEqual(data.image, undefined);
  //   });
  //   it("La función creadora de una producto, devuelve un objeto", async () => {
  //     const one = await model.create(data);
  //     assert.strictEqual(typeof one, "object");
  //   });
  //   it("La función creadora de una producto, devuelve un objeto con la propiedad '_id'", async () => {
  //     const one = await model.create(data);
  //     id = one._id;
  //     assert.ok(one._id);
  //   });
  //   it("La función para leer productos debe devolver un objeto con las propiedades 'prev', 'next' y 'products'", async () => {
  //     const all = await model.getAll({
  //       page: 2,
  //       skip: 2,
  //       limit: 2,
  //       adopted: true,
  //     });
  //     //console.log(all);
  //     assert.ok(all.prev);
  //     assert.ok(all.next);
  //     assert.ok(all.products);
  //     //NO SE RECOMIENDA TENER MAS DE UN ASSERT POR CADA UNIDAD DE TESTING "IT"
  //   });
  //   it("La función para leer productos debe devolver un array de productos en la propiedad 'products'", async () => {
  //     const all = await model.getAll({
  //       page: 2,
  //       skip: 2,
  //       limit: 2,
  //       adopted: true,
  //     });
  //     assert.strictEqual(Array.isArray(all.products), true);
  //   });
  //   it("La función para actualizar una producto debe devolver una producto actualizada", async () => {
  //     const before = await model.getBy(id);
  //     //before va a ser el objeto ANTES de la modificaicon
  //     const one = await model.update(id, { name: "ignacio" });
  //     //one va a ser el objeto LUEGO de la modificacion
  //     assert.strictEqual(before.name !== one.name, true);
  //   });
  //   it("La función para eliminar una producto debe efectivamente eliminar una producto", async () => {
  //     await model.delete(id);
  //     //one va a ser el objeto ANTES de la eliminación
  //     const after = await model.getBy(id);
  //     //console.log(after);
  //     //after va a ser el objeto LUEGO de la elimininación
  //     assert.strictEqual(after, null);
  //   });
});
