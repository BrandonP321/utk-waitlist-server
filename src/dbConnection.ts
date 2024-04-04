import mongoose from "mongoose";
import { Subscriber } from "./subcriber.model";

export const connectToMongoDb = () => {
  mongoose.connect(
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1/utk-waitlist",
    {}
  );

  // mongoose.set("debug", true);
};

export default {
  Subscriber,
};
