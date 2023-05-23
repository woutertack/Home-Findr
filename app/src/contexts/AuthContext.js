import { createContext, useContext, useState, useEffect } from "react";

const KEY = "USER";

const AuthContext = createContext();

// Function to retrieve user object from local storage if it exists
const getUserFromStorage = () => {
  const user = localStorage.getItem(KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const AuthContainer = ({ children }) => {
  const [user, setUser] = useState(() => getUserFromStorage());

  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem(KEY, JSON.stringify(user));
  };

  const handleSignup = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        onLogin: handleLogin, // Pass the onLogin prop here
        logout: handleLogout,
        signup: handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext in child components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Export AuthContainer component as default
export default AuthContainer;
