import React, { useState, useRef } from "react";
import "./SOSButton.css";

const SOSButton = () => {
  const [sosActive, setSosActive] = useState(false);
  const audioRef = useRef(null); // store the audio object

  const playSiren = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/siren.mp3");
      audioRef.current.loop = true; // keep looping
    }
    audioRef.current.play().catch(err => console.error(err));
    setSosActive(true);
  };

  const stopSiren = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // reset to start
    }
    setSosActive(false);
  };

  return (
    <div>
      <button className="sos-btn" onClick={playSiren} disabled={sosActive}>
        SOS
      </button>
      {sosActive && (
        <div className="sos-alert">
          🚨 SOS Activated! Emergency services alerted.
          <button onClick={stopSiren}>Stop</button>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
