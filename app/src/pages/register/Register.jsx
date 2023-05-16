import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Register.module.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
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
          value={name}
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
          className={style.name}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className={style.email}
        />
        <input
          type="number"
          name="phone_number"
          value={phone}
          placeholder="phone number"
          onChange={(e) => setPhone(e.target.value)}
          className={style.phone}
        />
        <div className={style.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
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