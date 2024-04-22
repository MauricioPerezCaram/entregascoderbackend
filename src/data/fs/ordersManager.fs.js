import fs from "fs";
import crypto from "crypto";
import winston from "../../utils/logger/winston.utils.js";

class OrdersManager {
  static #perGain = 0.3;
  static #totalGain = 0;
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.orders = [];
    this.init();
  }

  async createOrder(data) {
    try {
      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        pid: crypto.randomBytes(12).toString("hex"),
        uid: crypto.randomBytes(12).toString("hex"),
        quantity: data.quantity || 1,
        state: data.state,
      };
      this.orders.push(order);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return order.id;
    } catch (error) {
      return error.message;
    }
  }

  readOrders() {
    try {
      if (this.orders.length === 0) {
        throw new Error("No hay ordenenes cargadas");
      } else {
        return this.orders;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOrderById(id) {
    try {
      const one = this.orders.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay orden con el id " + id);
      } else {
        winston.INFO(
          "Leer el orden con id " + id + " " + JSON.stringify(one, null, 2)
        );
        return one;
      }
    } catch (error) {
      return error.message;
    }
  }

  async update(id, data) {
    try {
      let orderToUpdate = this.orders.find((each) => each.id === id);
      if (!orderToUpdate) {
        throw new Error("No hay orden con ese ID para cambiar " + id);
      } else {
        orderToUpdate.quantity = data.quantity || orderToUpdate.quantity;
        orderToUpdate.state = data.state || orderToUpdate.state;
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);

        winston.INFO("Orden actualizada con id " + id);
        return id;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroyOrderById(id) {
    try {
      let one = this.orders.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay orden para borrar con el id " + id);
      } else {
        this.orders = this.orders.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        winston.INFO("Eliminado el orden con id " + id);
        return id;
      }
    } catch (error) {
      winston.INFO(error.message);
      return error.message;
    }
  }
}

const orders = new OrdersManager("./src/data/fs/files/orders.json");
export default orders;
