import React from "react";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p>📞 {contact.phone}</p>
      <p>Relation: {contact.relation}</p>

      <div className="actions">
        <a href={`tel:${contact.phone}`} className="call-btn">Call</a>
        <button onClick={() => onDelete(contact.id)} className="del-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
