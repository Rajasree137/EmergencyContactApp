// import mongoose from "mongoose";

// const complaintSchema = new mongoose.Schema(
//   {
//     user: String,
//     message: String,
//   },
//   {
//     timestamps: true, // auto adds createdAt & updatedAt
//   }
// );

// const Complaint = mongoose.model("Complaint", complaintSchema);

// export default Complaint;
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  user: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Complaint", complaintSchema);

