import express from "express";
import EmergencyCall from "../models/EmergencyCall.js";

const router = express.Router();

/**
 * @route   POST /api/emergency-calls
 * @desc    Save emergency call (when user clicks Call Now)
 */
router.post("/", async (req, res) => {
  try {
    const { contactName, phoneNumber, latitude, longitude } = req.body;

    if (!contactName || !phoneNumber) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const call = new EmergencyCall({
      contactName,
      phoneNumber,
      latitude,
      longitude,
    });

    await call.save();
    res.status(201).json({
      message: "Emergency call saved successfully",
      data: call,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/emergency-calls
 * @desc    Get all emergency calls
 */
router.get("/", async (req, res) => {
  try {
    const calls = await EmergencyCall.find().sort({ createdAt: -1 });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/emergency-calls/:id
 * @desc    Get single emergency call
 */
router.get("/:id", async (req, res) => {
  try {
    const call = await EmergencyCall.findById(req.params.id);

    if (!call) {
      return res.status(404).json({ message: "Emergency call not found" });
    }

    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/emergency-calls/:id
 * @desc    Update emergency call
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedCall = await EmergencyCall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCall) {
      return res.status(404).json({ message: "Emergency call not found" });
    }

    res.status(200).json({
      message: "Emergency call updated",
      data: updatedCall,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/emergency-calls/:id
 * @desc    Delete emergency call
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedCall = await EmergencyCall.findByIdAndDelete(req.params.id);

    if (!deletedCall) {
      return res.status(404).json({ message: "Emergency call not found" });
    }

    res.status(200).json({ message: "Emergency call deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
