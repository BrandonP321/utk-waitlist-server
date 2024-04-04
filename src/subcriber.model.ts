import mongoose, { Schema } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Email required"],
      unique: true,
    },
  },
  { timestamps: true, minimize: false }
);

export const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
