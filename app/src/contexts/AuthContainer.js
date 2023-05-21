import { createContext, useContext, useEffect, useState } from "react";
import Home from "../pages/home/Home";

// Define the key used to store the user in local storage
const KEY = "USER";

// Create a new context object for authentication
const AuthContext = createContext();

// Function to retrieve user object from local storage if it exists
const getUserFromStorage = () => {
  const user = localStorage.getItem(KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

// AuthContainer component that wraps child components with authentication functionality
const AuthContainer = ({ children }) => {
  // Initialize user state using the getUserFromStorage function
  const [user, setUser] = useState(getUserFromStorage());

  // useEffect hook to store user object in local storage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
    }
  }, [user]);

  // Function to set user state to null when user logs out
  const handleLogout = () => {
    setUser(null);
  };

  // Function to set user state to a user object when user logs in
  const handleLogin = (user) => {
    setUser(user);
  };

  // Function to set user state to a user object when user signs up
  const handleSignup = (user) => {
    setUser(user);
  };

  // If user exists, wrap child components with the AuthContext Provider and pass user and logout function as props
  if (user) {
    return (
      <AuthContext.Provider value={{ user: user, logout: handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  // If user does not exist, return normal website
  if (!user) {
    return (
      <AuthContext.Provider value={{ signup: handleSignup }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

// Custom hook to access AuthContext in child components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Export AuthContainer component as default
export default AuthContainer;
