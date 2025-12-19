// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// //import contactRoutes from './routes/contactRoutes.js';

// dotenv.config();

// const app = express();

// // middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('MongoDB connected ✅'))
//   .catch(err => console.error('MongoDB error ❌', err));

// // test route
// app.get('/', (req, res) => {
//   res.send('Emergency Contact Backend is running 🚑');
// });

// // routes
// app.use('/contacts', contactRoutes);

// // port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} 🚀`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import emergencyContactsRoutes from "./routes/emergencyContacts.js";
import emergencyCallsRoutes from "./routes/emergencyCalls.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import personalContactsRoutes from "./routes/personalContacts.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.use("/api/contacts", emergencyContactsRoutes);
app.use("/api/emergency-calls", emergencyCallsRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/personal-contacts", personalContactsRoutes); // ✅ use kebab-case

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("🚨 Emergency Contact Backend is Running");
});

/* =======================
   DATABASE CONNECTION
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((error) =>
    console.error("❌ MongoDB Connection Error:", error.message)
  );

/* =======================
   ERROR HANDLING MIDDLEWARE
======================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
