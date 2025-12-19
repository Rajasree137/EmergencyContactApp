import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    region: { type: String, default: "India" },
  },
  { timestamps: true }
);

export default mongoose.model("EmergencyContact", emergencyContactSchema);

