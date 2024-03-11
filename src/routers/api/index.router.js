import CustomRouter from "../CustomRouter.js";

import UsersRouter from "./users.routers.js";
import ProductsRouter from "./products.router.js";
import OrdersRouter from "./orders.router.js";
// import cookiesRouter from "./cookies.router.api.js";
import sessionRouter from "./sessions.api.router.js";
import passport from "../../middlewares/passport.mid.js";
import sum from "../../utils/sum.util.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter();
const user = new UsersRouter();
const order = new OrdersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    {
      this.router.use("/users", user.getRouter());
      this.router.use("/products", product.getRouter());
      this.router.use("/orders", passCallBackMid("jwt"), order.getRouter());
      this.router.use("/sessions", sessionRouter);
      this.read("/sum", ["PUBLIC"], async (req, res) => {
        try {
          const response = sum();
          return res.success200(response);
        } catch (error) {
          return next(error);
        }
      });
    }
  }
}
