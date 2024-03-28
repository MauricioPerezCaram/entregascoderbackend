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
    this.create("/", ["PUBLIC", "PREM"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:oid", ["PUBLIC"], readOne);
    this.update("/:oid", ["PUBLIC", "PREM"], update);
    this.destroy("/:oid", ["PUBLIC", "PREM"], destroy);
  }
}
