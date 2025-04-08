import { error } from "console";
import mongoose from "mongoose";
export async function connect() {
  try {
    //Connect to mongoose
    mongoose.connect(process.env.DATABASE_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected Successfully!");
    });

    connection.on("error", (error) => {
      console.log("Something went wrong while connected to MongoDB!", error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
