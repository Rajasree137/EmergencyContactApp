import axios from "axios";

const ContactList = ({ contacts, refresh }) => {

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    refresh();
  };

  return (
    <div>
      {contacts.map(c => (
        <div className="card" key={c._id}>
          <h3>{c.name}</h3>
          <p>{c.relation}</p>
          <p>{c.phone}</p>
          <button onClick={() => remove(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
