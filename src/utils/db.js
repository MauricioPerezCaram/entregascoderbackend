import { connect } from "mongoose";
import winston from "../utils/logger/winston.utils.js";

const dbConnection = async (link) => {
  try {
    await connect(link);
  } catch (error) {
    winston.INFO(error);
  }
};

export default dbConnection;
