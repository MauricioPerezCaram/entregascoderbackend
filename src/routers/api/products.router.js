import CustomRouter from "../CustomRouter.js";
//import products from "../../data/fs/products.fs.js";
// import { products } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controllers.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["PUBLIC", "PREM"],
      // passCallBackMid("jwt"),
      // isAdmin,
      create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN", "PREM"], update);
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}
