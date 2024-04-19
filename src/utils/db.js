import { connect } from "mongoose";
import winston from "../utils/logger/winston.utils.js";
import winstonLog from "../utils/logger/index.js";

const dbConnection = async () => {
  try {
    winstonLog.INFO(env.SECRET_KEY);
    await connect(process.env.DB_LINK);
  } catch (error) {
    winston.INFO(error);
  }
};

export default dbConnection;
