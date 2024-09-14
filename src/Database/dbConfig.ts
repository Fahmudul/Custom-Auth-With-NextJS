import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    // console.log("from line 5", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection error: ", error);
      process.exit(1);
    });
  } catch (error: any) {
    console.log(error);
  }
};
