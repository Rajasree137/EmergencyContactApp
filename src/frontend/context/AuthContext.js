// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const login = (username) => {
//         setUser({ name: username });
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ REGISTER FUNCTION
//   const register = (username, password) => {
//     if (!username || !password) return false;

//     // save user (demo purpose)
//     localStorage.setItem(
//       "user",
//       JSON.stringify({ username, password })
//     );

//     return true;
//   };

//   // ✅ LOGIN FUNCTION
//   const login = (username, password) => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));

//     if (
//       savedUser &&
//       savedUser.username === username &&
//       savedUser.password === password
//     ) {
//       setUser({ username });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         register,   // 🔥 THIS WAS MISSING
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (credentials) => {
    try {
      setError(null);
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        credentials
      );

      if (!res.data.user || !res.data.user._id) {
        throw new Error("Invalid user data from server");
      }

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Login failed");
      throw err;
    }
  };

  // REGISTER
  const register = async (userData) => {
    try {
      setError(null);
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        userData
      );

      if (!res.data.user || !res.data.user._id) {
        throw new Error("Invalid user data from server");
      }

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Registration failed");
      throw err;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
