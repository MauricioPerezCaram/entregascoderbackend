import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const sessionRouter = Router();

//register
sessionRouter.post(
  "/register",
  has8char,
  passCallBack("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registrado!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionRouter.post("/login", passCallBack("login"), async (req, res, next) => {
  try {
    return res
      .cookie("token", req.token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        statusCode: 200,
        message: "Loggeado con exito",
      });
  } catch (error) {
    return next(error);
  }
});

//google
sessionRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google-callback
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
        message: "Loggeado con google",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//google
sessionRouter.post(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

//github-callback
sessionRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Loggeado con github!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//me
sessionRouter.post("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const user = {
      email: req.user.email,
      role: req.user.role,
      photo: req.user.photo,
    };
    return res.json({
      statusCode: 200,
      response: user,
    });
  } catch (error) {
    return next(error);
  }
});

//signout
sessionRouter.post("/signout", passCallBack("jwt"), async (req, res, next) => {
  try {
    return res.clearCookie("token").json({
      statusCode: 200,
      message: "Cerraste sesion correctamente!",
    });
  } catch (error) {
    return next(error);
  }
});

//badauth
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

//signout/cb
sessionRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "No estas en una sesion activa",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionRouter;
