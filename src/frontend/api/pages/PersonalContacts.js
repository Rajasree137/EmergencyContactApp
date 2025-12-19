import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const PersonalContacts = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    relation: "",
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5001/api/personal-contacts/${user._id}`)
        .then((res) => setContacts(res.data));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = {
      ...form,
      userId: user._id,
    };

    const res = await axios.post(
      "http://localhost:5001/api/personal-contacts",
      newContact
    );

    setContacts([...contacts, res.data]);
    setForm({ name: "", phoneNumber: "", relation: "" });
  };

  const deleteContact = async (id) => {
    await axios.delete(
      `http://localhost:5001/api/personal-contacts/${id}`
    );
    setContacts(contacts.filter((c) => c._id !== id));
  };

  return (
    <div className="home-container">
      <h2>👨‍👩‍👧 My Emergency Contacts</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm({ ...form, phoneNumber: e.target.value })
          }
          required
        />
        <input
          placeholder="Relation (Mom, Friend)"
          value={form.relation}
          onChange={(e) =>
            setForm({ ...form, relation: e.target.value })
          }
        />
        <button>Add Contact</button>
      </form>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            <b>{c.name}</b> ({c.relation}) – {c.phoneNumber}
            <button onClick={() => deleteContact(c._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalContacts;
