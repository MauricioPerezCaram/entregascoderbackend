import { Router } from "express";

import service from "../../services/products.service.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
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
    const all = await service.read({ filter, options });
    return res.render("products", {
      products: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "PRODUCTS",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/new", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("new", { title: "Crea un producto" });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await service.readOne(pid);
    return res.render("detail", {
      product: one,
      title: one.title.toUpperCase(),
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
