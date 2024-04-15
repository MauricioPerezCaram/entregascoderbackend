import { connect } from "mongoose";
import winston from "../utils/logger/winston.utils.js";

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK);
  } catch (error) {
    winston.INFO(error);
  }
};

export default dbConnection;
