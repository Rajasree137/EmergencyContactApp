
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Emergency.css";
import LiveLocationMap from "../../components/LiveLocationMap";


const Emergency = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationText, setLocationText] = useState("Detecting location...");

  // Fetch contacts
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/contacts")
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationText("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const country = res.data.address.country;
          const state = res.data.address.state || "";
          const city =
            res.data.address.city ||
            res.data.address.town ||
            res.data.address.village ||
            "";

          setLocationText(`📍 ${city}, ${state}, ${country}`);
        } catch (error) {
          setLocationText("📍 Location detected (India)");
        }
      },
      () => {
        setLocationText("📍 Location permission denied");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Handle call
  const handleCall = async (contact) => {
    if (!navigator.geolocation) {
      await saveCall(contact, null, null);
      window.location.href = `tel:${contact.phone}`;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await saveCall(
          contact,
          position.coords.latitude,
          position.coords.longitude
        );
        window.location.href = `tel:${contact.phone}`;
      },
      async () => {
        await saveCall(contact, null, null);
        window.location.href = `tel:${contact.phone}`;
      }
    );
  };

  // Save call
  const saveCall = async (contact, latitude, longitude) => {
    try {
      await axios.post("http://localhost:5001/api/emergency-calls", {
        contactName: contact.name,
        phoneNumber: contact.phone,
        latitude,
        longitude,
      });
    } catch (error) {
      console.error("Error saving call");
    }
  };

  return (
    
    <div className="emergency-container">
      <h1>🚨 Emergency Contacts</h1>

      <div className="location-box">
        <strong>Your Location:</strong> {locationText}
      </div>

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="contact-grid">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
              <button
                className="call-btn"
                onClick={() => handleCall(contact)}
              >
                📞 Call Now
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
};
<LiveLocationMap />


export default Emergency;
