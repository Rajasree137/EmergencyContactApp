import Contact from '../models/Contact.js';

// Get all contacts
export const getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
}

// Get one contact
export const getContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).send("Contact not found");
    res.json(contact);
}

// Add new contact
export const addContact = async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
}

// Update contact
export const updateContact = async (req, res) => {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) return res.status(404).send("Contact not found");
    res.json(updatedContact);
}

// Delete contact
export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send("Contact not found");
    res.send("Contact deleted successfully");
}
