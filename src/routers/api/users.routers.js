import CustomRouter from "../CustomRouter.js";
// import users from "../../data/fs/users.fs.js";
import users from "../../data/mongo/manager.mongo.js";
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
    this.create("/", ["PUBLIC"], create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:uid", ["PUBLIC", "PREM"], readOne);

    this.update("/:uid", ["PUBLIC", "PREM"], passCallBackMid("jwt"), update);

    this.destroy("/:uid", ["PUBLIC", "PREM"], passCallBackMid("jwt"), destroy);
  }
}
