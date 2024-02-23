import { verifyToken } from "../utils/token.utils.js";
export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userData = verifyToken(token);
    const { role } = userData;
    console.log(role);
    if (role === 1) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
