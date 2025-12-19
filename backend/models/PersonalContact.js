import mongoose from "mongoose";

const personalContactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PersonalContact", personalContactSchema);
