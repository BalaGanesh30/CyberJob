import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; // ✅ Import jwtDecode

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    location: "Preferred Location",
    jobType: "Job Type",
    salaryRange: [50000, 80000],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (userToken) => {
    try {
      const decodedUser = jwtDecode(userToken);
      if (decodedUser.exp * 1000 > Date.now()) {
        localStorage.setItem("token", userToken);
        setToken(userToken);
        setUser(decodedUser);
        setIsAuthenticated(true);
      } else {
        console.error("Token expired.");
        logout();
      }
    } catch (error) {
      console.error("Invalid token format:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // ✅ Login/Register function exposed to UI
  const loginOrRegisterUser = async ({ name, email, password, mode }) => {
    try {
      const response = await axios.post(`/api/user/${mode}`, {
        name,
        email,
        password,
      });
      const data = response.data;

      if (data.success && data.token) {
        login(data.token);
        toast.success(`${mode === "login" ? "Login" : "Register"} successful!`);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Request failed"
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        showUserLogin,
        setShowUserLogin,
        user,
        setUser,
        setIsOpen,
        navigate,
        setIsModalOpen,
        isModalOpen,
        token,
        isAuthenticated,
        login,
        logout,
        loginOrRegisterUser,
        filters,
        setFilters, // ✅ exposed to Login component
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
