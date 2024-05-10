import { expect } from "chai";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";
import MongoManager from "../../src/data/mongo/manager.mongo.js";

describe("Testeando Modelo Productos", () => {
  const productsDao = dao.products;
  let model;

  before(() => {
    if (typeof productsDao === "function") {
      model = new MongoManager(productsDao);
    } else {
      model = productsDao;
    }
  });

  const data = { title: "banana", specie: "fruit" };
  let id;

  it("La creación de un producto requiere un objeto con la propiedad 'title'", () => {
    expect(data).to.have.property("title");
  });

  it("La creación de una producto no necesita un objeto con la propiedad 'image'", () => {
    expect(data).not.to.have.property("image");
  });

  it("La función creadora de una producto, devuelve un objeto con la propiedad '_id'", async () => {
    const one = await model.create(data);
    expect(one).not.to.be.an("object");
  });

  it("La función creadora de una producto, devuelve un objeto con la propiedad '_id'", async () => {
    const one = await model.create(data);
    id = one._id;
    expect(one).to.have.property("_id");
  });
  it("La función para leer productos debe devolver un objeto con las propiedades 'prev', 'next' y 'products'", async () => {
    const all = await model.getAll({
      page: 2,
      skip: 2,
      limit: 2,
      adopted: true,
    });
    expect(all).to.have.property("prev");
    expect(all).to.have.property("next");
    expect(all).to.have.property("products");
  });
  it("La función para leer productos debe devolver un array de productos en la propiedad 'products'", async () => {
    const all = await model.read({
      page: 2,
      skip: 2,
      limit: 2,
      adopted: true,
    });
    expect(Array.isArray(all.products)).to.be.equals(true);
  });
  it("La función para actualizar una producto debe devolver una producto actualizada", async () => {
    const before = await model.readOne(id);
    const one = await model.update(id, { name: "ignacio" });
    expect(one.name).not.to.be.equals(before.name);
  });
  it("La función para eliminar una producto debe efectivamente eliminar una producto", async () => {
    await model.delete(id);
    const after = await model.delete(id);
    expect(after).to.be.equals(null);
  });
});
