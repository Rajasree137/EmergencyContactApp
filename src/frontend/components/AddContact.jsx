import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AddContact = ({ fetchContacts }) => {
  const { user } = useContext(AuthContext); // get logged-in user
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relation, setRelation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!user?._id) {
      setError("Please login first.");
      return;
    }
    if (!name || !phoneNumber) {
      setError("Name and Phone Number are required.");
      return;
    }

    const newContact = {
      userId: user._id,
      name,
      phoneNumber,
      relation,
    };

    console.log("Sending contact:", newContact); // debug log

    try {
      const res = await axios.post(
        "http://localhost:5001/api/personal-contacts",
        newContact
      );
      console.log("Added contact:", res.data);

      // Clear form
      setName("");
      setPhoneNumber("");
      setRelation("");

      // Refresh contacts list
      fetchContacts();
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to add contact.");
    }
  };

  return (
    <div className="add-contact-container">
      <h2>Add Personal Contact</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contact Name"
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>

        <div>
          <label>Relation:</label>
          <input
            type="text"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="Relation (optional)"
          />
        </div>

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
