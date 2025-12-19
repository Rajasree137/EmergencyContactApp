// backend/routes/personalContacts.js
import express from "express";
import mongoose from "mongoose";
import PersonalContact from "../models/PersonalContact.js";

const router = express.Router();

/**
 * GET all personal contacts for a specific user
 * Route: GET /api/personal-contacts/:userId
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const contacts = await PersonalContact.find({ userId });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * ADD a new personal contact
 * Route: POST /api/personal-contacts
 */
router.post("/", async (req, res) => {
  try {
    const { userId, name, phoneNumber, relation } = req.body;

    // Validate required fields
    if (!userId || !name || !phoneNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const contact = new PersonalContact({
      userId,
      name,
      phoneNumber,
      relation,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error("Error adding contact:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * UPDATE an existing contact by ID
 * Route: PUT /api/personal-contacts/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }

    const updatedContact = await PersonalContact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE a contact by ID
 * Route: DELETE /api/personal-contacts/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }

    const deletedContact = await PersonalContact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
