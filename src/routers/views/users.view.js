import { Router } from "express";

import users from "../../data/mongo/manager.mongo.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 12,
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
    const all = await users.read({ filter, options });
    return res.render("users", {
      users: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "USERS",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/new", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("new", { title: "Crea un producto" });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await users.readOne(pid);
    return res.render("detail", {
      product: one,
      title: one.title.toUpperCase(),
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
