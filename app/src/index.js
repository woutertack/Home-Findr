import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthContainer from "./contexts/AuthContext";
// using authcontainer here so i can use the context for user in the app component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContainer>
        <App />
      </AuthContainer>
    </BrowserRouter>
  </React.StrictMode>
);
