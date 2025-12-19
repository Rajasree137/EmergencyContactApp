import express from "express";
import Complaint from "../models/complaint.js";

const router = express.Router();

/* =======================
   POST: Create a new complaint
======================= */
router.post("/", async (req, res, next) => {
  try {
    const { user, message } = req.body;

    if (!user || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const complaint = new Complaint({ user, message });
    await complaint.save();

    res.status(201).json({ success: true, complaint });
  } catch (error) {
    next(error);
  }
});

/* =======================
   GET: Get all complaints
======================= */
router.get("/", async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }); // latest first
    res.json({ success: true, complaints });
  } catch (error) {
    next(error);
  }
});

export default router;
