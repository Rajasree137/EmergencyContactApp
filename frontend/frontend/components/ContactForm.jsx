import { useState } from "react";
import axios from "axios";

const ContactForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    relation: "",
    phone: ""
  });

  const submitHandler = async () => {
    await axios.post("http://localhost:5000/api/contacts", form);
    setForm({ name: "", relation: "", phone: "" });
    refresh();
  };

  return (
    <div className="card">
      <h2>Add Emergency Contact</h2>
      <input placeholder="Name" value={form.name}
        onChange={e => setForm({...form, name:e.target.value})}/>
      <input placeholder="Relation" value={form.relation}
        onChange={e => setForm({...form, relation:e.target.value})}/>
      <input placeholder="Phone Number" value={form.phone}
        onChange={e => setForm({...form, phone:e.target.value})}/>
      <button onClick={submitHandler}>Save Contact</button>
    </div>
  );
};

export default ContactForm;
