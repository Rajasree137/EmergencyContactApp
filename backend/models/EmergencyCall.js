import mongoose from "mongoose";

const emergencyCallSchema = new mongoose.Schema(
  {
    contactName: String,
    phoneNumber: String,
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

export default mongoose.model("EmergencyCall", emergencyCallSchema);
