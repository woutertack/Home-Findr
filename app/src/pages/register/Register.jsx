import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import useMutation from "../../hooks/useMutation";
import Loading from "../../components/global/loading/Loading";
import { useAuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation();
  const [errorMessage, setErrorMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if everything is filled in correctly, if all correct, then send the request
    if (!validateEmail(data.email)) {
      setErrorMessage("Invalid email");
    } else if (data.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
    } else if (data.name.length < 3) {
      setErrorMessage("Name must be at least 3 characters long");
    } else if (data.phone.length < 9) {
      setErrorMessage("Phone number must be at least 9 characters long");
    } else {
          mutate(`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            data,
            onSuccess: (data) => {
              onLogin(data);
              navigate("/");
            },
            onError: () => {
              setErrorMessage("This combination of email and password is invalid");
            }
          });
        };
     };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <div className={style.container}>
      <h1 className={style.title}>Register</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="username"
          onChange={handleChange}
          className={style.name}
        />
        <input
          type="text"
          name="email"
          value={data.email}
          placeholder="email"
          onChange={handleChange}
          className={style.email}
        />
        <input
          type="number"
          name="phone"
          value={data.phone}
          placeholder="phone number"
          onChange={handleChange}
          className={style.phone}
        />
        <div className={style.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            placeholder="password"
            onChange={handleChange}
            className={style.password}
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className={style.showPasswordButton}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className={style.submit} disabled={isLoading}>
          Submit
        </button>
       
        <p>{errorMessage}</p>
      </form>
      <Link to="/login" className={style.link}>
        Already have an account? Login here
      </Link>
    </div>
  );
};

export default Register;
