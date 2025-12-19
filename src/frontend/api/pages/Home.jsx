// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import "./Home.css";

// const Home = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [complaint, setComplaint] = useState("");
//   const [complaintsList, setComplaintsList] = useState([]);

//   // 📥 Fetch complaints from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/complaints")
//       .then((res) => setComplaintsList(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ➕ Add complaint to backend
//   const handleAddComplaint = async () => {
//     if (!complaint.trim()) return;

//     try {
//       const res = await axios.post(
//         "http://localhost:5001/api/complaints",
//         {
//           username: user ? user.username : "Guest",
//           message: complaint
//         }
//       );

//       setComplaintsList([res.data, ...complaintsList]);
//       setComplaint("");
//     } catch (err) {
//       console.error("Error saving complaint");
//     }
//   };

//   return (
//     <div className="home-container">
//       <h1 className="home-title">
//         Welcome, {user ? user.username : "Guest"}!
//       </h1>

//       <div className="home-section">
//         <h2>Complaints</h2>

//         <input
//           type="text"
//           placeholder="Enter your complaint"
//           value={complaint}
//           onChange={(e) => setComplaint(e.target.value)}
//           className="input-field"
//         />

//         <button onClick={handleAddComplaint} className="btn">
//           Add Complaint
//         </button>

//         <ul className="complaints-list">
//           {complaintsList.map((item) => (
//             <li key={item._id}>
//               <strong>{item.username}:</strong> {item.message}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="home-section">
//         <h2>Emergency Contacts</h2>
//         <p>Click below to view emergency contacts</p>
//         <button onClick={() => navigate("/emergency")} className="btn">
//           Go to Emergency Contacts
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState("");
  const [complaintsList, setComplaintsList] = useState([]);

  // 📥 Fetch complaints from backend
//  useEffect(() => {
//   axios
//     .get("http://localhost:5001/api/complaints")
//     .then((res) => setComplaintsList(res.data.complaints || [])) // ✅ fix here
//     .catch((err) => console.error(err));
// }, []);


  // ➕ Add complaint to backend
  const handleAddComplaint = async () => {
    if (!complaint.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5001/api/complaints",
        {
          user: user ? user.username : "Guest", // match backend field
          message: complaint
        }
      );

      // ✅ Add new complaint at the top
      if (res.data.success) {
        setComplaintsList([res.data.complaint, ...complaintsList]);
        setComplaint("");
      }
    } catch (err) {
      console.error("Error saving complaint:", err);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">
        Welcome, {user ? user.username : "Guest"}!
      </h1>

      <div className="home-section">
        <h2>Complaints</h2>

        <input
          type="text"
          placeholder="Enter your complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          className="input-field"
        />

        <button onClick={handleAddComplaint} className="btn">
          Add Complaint
        </button>

        <ul className="complaints-list">
          {complaintsList.length === 0 && <li>No complaints yet.</li>}
          {complaintsList.map((item) => (
            <li key={item._id}>
              <strong>{item.user}:</strong> {item.message}
            </li>
          ))}
        </ul>
      </div>

      <div className="home-section">
        <h2>Emergency Contacts</h2>
        <p>Click below to view emergency contacts</p>
        <button onClick={() => navigate("/emergency")} className="btn">
          Go to Emergency Contacts
        </button>
      </div>
    </div>
  );
};

export default Home;
