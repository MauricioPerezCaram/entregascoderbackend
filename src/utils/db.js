import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    console.log("URI de la base de datos:", process.env.DB_LINK);
    await connect(process.env.DB_LINK);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
