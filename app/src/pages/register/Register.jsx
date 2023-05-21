import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Register.module.css";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContainer";

const Register = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, error, mutate } = useMutation();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // mutate(`${process.env.REACT_APP_API_URL}/register`, {
    //   method: "POST",
    //   data,
    //   onSuccess: (data) => {

    //     onLogin(data);

    //     window.location.replace = "/";
    //   }
    // });
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

        <button className={style.submit}>Submit</button>
      </form>
      <Link to="/login" className={style.link}>
        Already have an account? Login here
      </Link>
    </div>
  );
};

export default Register;
