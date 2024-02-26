import { verifyToken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userData = verifyToken(token);
    if (userData) {
      req.session.isLoggedIn = true;
      req.session.isAdmin = userData.role === 1;
      return next();
    } else {
      const error = new Error("Bad auth from middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
