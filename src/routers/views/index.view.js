import CustomRouter from "../CustomRouter.js";

import products from "../../data/mongo/manager.mongo.js";

import usersRouter from "./users.view.js";
import sessionsRouter from "./sessions.view.js";
import ordersRouter from "./orders.view.js";
import productsRouter from "./products.view.js";

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", productsRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/orders", ordersRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({ filter, options });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
          isLoggedIn: req.session.isLoggedIn || false,
          isAdmin: req.session.isAdmin || false,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
