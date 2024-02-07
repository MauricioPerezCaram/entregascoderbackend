import { Router } from "express";
import usersRouter from "./users.routers.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import cookiesRouter from "./cookies.router.api.js";

const apiRouter = Router();

// definir los enrutadores de los recursos
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/cookies", cookiesRouter);

export default apiRouter;
// exporto el enrutador de la api para poder implementarlo en el enrutador del servidor
