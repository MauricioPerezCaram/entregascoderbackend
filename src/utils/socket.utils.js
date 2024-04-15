import { socketServer } from "../../server.js";
import products from "../data/fs/products.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";
import winston from "../utils/logger/winston.utils.js";

export default (socket) => {
  winston.INFO("client " + socket.id + " connected");
  socket.emit("products", products.readProducts());
  socket.on("newProduct", async (data) => {
    try {
      propsProductsUtils(data);
      await products.createProduct(data);
      socketServer.emit("products", products.readProducts());
    } catch (error) {
      winston.INFO(error);
    }
  });
};
