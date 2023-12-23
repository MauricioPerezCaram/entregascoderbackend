import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  async createProduct(data) {
    try {
      if (!data.title || !data.photo) {
        throw new Error("El nombre y la foto del producto es necesario");
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price || 10,
        stock: data.stock || 50,
      };
      this.products.push(product);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + product.id);
      return product.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readProducts() {
    try {
      if (this.products.length === 0) {
        throw new Error("No hay productos");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay producto con el id " + id);
      } else {
        console.log(
          "Leer el producto con id " + id + " " + JSON.stringify(one, null, 2)
        );
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async destroyProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay producto para borrar con el id " + id);
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Eliminado el producto con id " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const products = new ProductsManager("./data/fs/files/products.json");
// products.createProduct({ title: "producto 1", photo: "foto producto 1" });
// products.createProduct({ title: "producto 2", photo: "foto producto 2" });
// products.createProduct({ title: "producto 3", photo: "foto producto 3" });
// products.createProduct({ title: "producto 4", photo: "foto producto 4" });
// products.createProduct({ title: "producto 5", photo: "foto producto 5" });
products.readProducts();
products.readProductById("943e5d396ec8245388be7057");
products.destroyProductById("");

// node data/fs/products.fs.js
export default products;
