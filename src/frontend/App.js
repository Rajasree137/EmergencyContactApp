import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SOSButton from "./components/SOSButton";

import Home from "./api/pages/Home";
import About from "./api/pages/About";
import Register from "./api/pages/Register";
import Login from "./api/pages/Login";
import Emergency from "./api/pages/Emergency";
import PersonalContacts from "./api/pages/PersonalContacts";


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>

        <Navbar />
        <SOSButton />

        <main style={{ minHeight: "80vh", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/my-contacts" element={<PersonalContacts />} />

            
          </Routes>
        </main>

        <Footer />

      </AuthProvider>
    </Provider>
  );
}

export default App;
