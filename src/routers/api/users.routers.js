import CustomRouter from "../CustomRouter.js";
// import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      propsUsers,
      create
    );

    this.read("/", ["PUBLIC"], read);

    this.read("/:uid", ["ADMIN", "PREM"], readOne);

    this.update(
      "/:uid",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      update
    );

    this.destroy(
      "/:uid",
      [("ADMIN", "PREM")],
      passCallBackMid("jwt"),
      isAdmin,
      destroy
    );
  }
}
