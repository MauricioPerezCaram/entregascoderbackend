import { Router } from "express";

const usersRouter = Router();

// definir los endpoints (CRUD)
usersRouter.post("/", (req, res) => {});
usersRouter.get("/", (req, res) => {});
usersRouter.get("/:uid", (req, res) => {});
usersRouter.put("/:uid", (req, res) => {});
usersRouter.delete("/:uid", (req, res) => {});

export default usersRouter;
