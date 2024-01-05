import { Router } from "express";
import apiRouter from "./api/index.router.js";

const router = Router();

// falta implementar el router de vistas
router.use("/api", apiRouter);

export default router;
