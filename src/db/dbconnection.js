import mongoose from "mongoose";
import DB_NAME from "../utils/constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DBURL}${DB_NAME}`);
    console.log(`Db connected || Host : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error("Db connection Error :", error)
    process.exit(1)

  }
}

export default connectDB;