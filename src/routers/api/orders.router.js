import CustomRouter from "../CustomRouter.js";
//import orders from "../../data/fs/orders.fs.js";
// import { orders } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/orders.controller.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      create
    );

    this.read("/", ["PUBLIC"], read);

    this.read("/:pid", ["PUBLIC"], readOne);

    this.update("/:pid", ["ADMIN", "PREM"], update);

    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}
