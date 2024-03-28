import { fork } from "child_process";

import CustomRouter from "../CustomRouter.js";

import UsersRouter from "./users.routers.js";
import ProductsRouter from "./products.router.js";
// import OrdersRouter from "./orders.router.js";
// import cookiesRouter from "./cookies.router.api.js";
import sessionRouter from "./sessions.api.router.js";
// import passport from "../../middlewares/passport.mid.js";

// import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter();
const user = new UsersRouter();
// const order = new OrdersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    {
      this.use("/users", user.getRouter());
      this.use("/products", product.getRouter());
      // this.use("/orders", passCallBackMid("jwt"), order.getRouter());
      this.use("/sessions", sessionRouter);
      this.read("/sum", ["PUBLIC"], async (req, res) => {
        try {
          console.log("Global process id: " + process.pid);
          const child = fork("./src/utils/sum.util.js");
          child.send("start");
          child.on("message", (result) => res.success200(result));
        } catch (error) {
          return next(error);
        }
      });
    }
  }
}
