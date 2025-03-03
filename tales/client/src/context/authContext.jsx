import axios from "axios";
import { createContext, useEffect, useState } from "react";
axios.defaults.baseURL = 'http://localhost:8800/api/';  // Change to your backend URL

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Get user data from localStorage or set to null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Login function
  const login = async (inputs) => {
    try {
      const res = await axios.post("/auth/login", inputs,
        { withCredentials: true }
      );
      setCurrentUser(res.data); // Assuming the response contains user data
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Login failed: ", err);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  // Store current user in localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
