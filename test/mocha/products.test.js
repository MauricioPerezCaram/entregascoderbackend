import assert from "assert";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";
import MongoManager from "../../src/data/mongo/manager.mongo.js";

describe("Testeando Modelo Productos", () => {
  const productsDao = dao.products;
  let model;

  before(() => {
    if (typeof productsDao === "function") {
      model = new MongoManager(productsDao);
      model = productsDao;
    }
  });

  const data = { name: "banana", specie: "fruit" };
  let id;

  it("La creación de un producto requiere un objeto con la propiedad 'name'", () => {
    assert.ok(data.name);
  });

  it("La creación de un producto no necesita un objeto con la propiedad 'image'", () => {
    assert.strictEqual(data.image, undefined);
  });

  it("La función creadora de un producto, devuelve un objeto", async () => {
    const one = await model.create(data);
    assert.strictEqual(typeof one, "object");
  });

  it("La función creadora de un producto, devuelve un objeto con la propiedad '_id'", async () => {
    const one = await model.create(data);
    id = one._id;
    assert.ok(one._id);
  });

  it("La función para leer productos debe devolver un objeto con las propiedades 'prev', 'next' y 'products'", async () => {
    const all = await model.read({
      filter: {},
      options: {},
    });
    assert.ok(all.prev);
    assert.ok(all.next);
    assert.ok(all.products);
  });

  it("La función para leer productos debe devolver un array de productos en la propiedad 'products'", async () => {
    const all = await model.read({
      filter: {}, // Define el filtro como un objeto vacío
      options: {}, // Define las opciones como un objeto vacío
    });
    assert.strictEqual(Array.isArray(all.products), true);
  });

  it("La función para actualizar un producto debe devolver un producto actualizado", async () => {
    const one = await model.update(id, { name: "nuevo_nombre" });
    assert.strictEqual(one.name, "nuevo_nombre");
  });

  it("La función para eliminar un producto debe efectivamente eliminar un producto", async () => {
    await model.destroy(id); // Utiliza el método destroy en lugar de delete
    const after = await model.readOne(id); // Utiliza readOne para verificar si el producto aún existe
    assert.strictEqual(after, null);
  });
});
