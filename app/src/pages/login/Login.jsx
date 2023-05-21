import React, { useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className={style.email}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className={style.password}
        />
        <button className={style.submit}>Submit</button>
      </form>
      <Link to="/register" className={style.link}>
        No account yet? Register here
      </Link>
    </div>
  );
};
export default Login;
