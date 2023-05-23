import React, { useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { isLoading, error, mutate } = useMutation();
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
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

    mutate(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        
        onLogin(data);
        navigate("/");
      },
    });
  };

 

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={data.email}
          id="email"
          placeholder="email"
          onChange={handleChange}
          className={style.email}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          id="password"
          placeholder="password"
          onChange={handleChange}
          className={style.password}
        />
        <button className={style.submit} disabled={isLoading}>
          Submit
        </button>
        {error && <p>{error}</p>}
      </form>
      <Link to="/register" className={style.link}>
        No account yet? Register here
      </Link>
    </div>
  );
};
export default Login;
