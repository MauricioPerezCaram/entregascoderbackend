import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const sessionRouter = Router();

// Register
sessionRouter.post(
  "/register",
  has8char,
  // passport.authenticate("register", {
  //   session: false,
  //   failureRedirect: "/api/sessions/badauth",
  // }),
  passCallBackMid("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Registrado!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

// Login
sessionRouter.post(
  "/login",
  // passport.authenticate("login", {
  //   session: false,
  //   failureRedirect: "/api/sessions/badauth",
  // }),
  passCallBackMid("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Iniciaste sesión correctamente",
        });
    } catch (error) {
      return next(error);
    }
  }
);

// Google
// CAMBIAR A POST
sessionRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Google-Callback
sessionRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with Google",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// me
sessionRouter.post("/", async (req, res, next) => {
  try {
    return res.json({
      statusCode: 200,
      message: "Session with email: " + req.session.email,
    });
  } catch (error) {
    return next(error);
  }
});

// signout
sessionRouter.post(
  "/signout",
  // passport.authenticate("jwt", {
  //   session: false,
  //   failureRedirect: "/api/sessions/signout/cb",
  // }),
  passCallBackMid("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Cerraste sesion",
      });
    } catch (error) {
      return next(error);
    }
  }
);

// Bad auth
sessionRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

// Sign out/cb
sessionRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Ya saliste de la sesión",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionRouter;
