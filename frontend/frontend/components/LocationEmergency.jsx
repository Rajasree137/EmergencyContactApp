import React, { useEffect, useState } from "react";
import "./LocationEmergency.css";

const emergencyNumbers = {
  India: {
    police: "100",
    ambulance: "102",
    fire: "101",
  },
  USA: {
    police: "911",
    ambulance: "911",
    fire: "911",
  },
  UK: {
    police: "999",
    ambulance: "999",
    fire: "999",
  },
  DEFAULT: {
    police: "112",
    ambulance: "112",
    fire: "112",
  },
};

const LocationEmergency = () => {
  const [country, setCountry] = useState("");
  const [numbers, setNumbers] = useState(emergencyNumbers.DEFAULT);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding (free API)
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();

          const detectedCountry = data.countryName || "DEFAULT";
          setCountry(detectedCountry);

          setNumbers(
            emergencyNumbers[detectedCountry] ||
              emergencyNumbers.DEFAULT
          );
        } catch {
          setNumbers(emergencyNumbers.DEFAULT);
        }
      },
      () => {
        setError("Location permission denied");
        setNumbers(emergencyNumbers.DEFAULT);
      }
    );
  }, []);

  return (
    <div className="location-emergency">
      <h2>📍 Location-Based Emergency</h2>

      {country && <p>Detected Country: <b>{country}</b></p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="emergency-buttons">
        <a href={`tel:${numbers.police}`} className="em-btn police">
          🚓 Call Police
        </a>

        <a href={`tel:${numbers.ambulance}`} className="em-btn ambulance">
          🚑 Call Ambulance
        </a>

        <a href={`tel:${numbers.fire}`} className="em-btn fire">
          🚒 Call Fire
        </a>
      </div>
    </div>
  );
};

export default LocationEmergency;
