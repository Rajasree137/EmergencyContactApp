import React from "react";
import { FaPhoneAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        <h2>🚨 About Emergency Contact App</h2>

        {/* Section 1 */}
        <div className="about-section">
          <FaPhoneAlt className="about-icon" />
          <div className="about-text">
            <h3>Quick Emergency Access</h3>
            <p>
              Instantly access police, ambulance, fire, and disaster
              management contacts during critical situations.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="about-section">
          <FaUsers className="about-icon" />
          <div className="about-text">
            <h3>User Friendly</h3>
            <p>
              Designed with a simple and intuitive interface so anyone
              can use it easily in emergencies.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="about-section">
          <FaShieldAlt className="about-icon" />
          <div className="about-text">
            <h3>Safety & Reliability</h3>
            <p>
              Built using modern React and secure backend technologies
              to ensure reliable performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
