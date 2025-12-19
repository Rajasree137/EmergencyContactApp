import React, { useEffect, useState } from "react";

const LiveLocationMap = () => {
  const [location, setLocation] = useState({
    lat: 12.9716, // default (Bangalore)
    lng: 77.5946
  });

  /* ==========================
     GET LIVE LOCATION
  ========================== */
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📍 Live Location Tracking</h3>

      <iframe
        title="Live Location"
        width="100%"
        height="300"
        style={{ borderRadius: "12px", border: "none" }}
        src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
        allowFullScreen
      ></iframe>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        Latitude: {location.lat.toFixed(5)} | Longitude: {location.lng.toFixed(5)}
      </p>
    </div>
  );
};

export default LiveLocationMap;
