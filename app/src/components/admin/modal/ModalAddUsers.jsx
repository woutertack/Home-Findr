import React, { useState } from "react";
import style from "./ModalAddUsers.module.css";

const ModalAddUsers = ({ data, handleChange, handleSubmit, closeModal, errorMessage }) => {
  const { name, email, phone, password } = data;
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    // Implement your password generation logic here
    // This is just a simple example
    const newPassword = Math.random().toString(36).slice(-8); // Generate an 8-character alphanumeric password
    setGeneratedPassword(newPassword);
    handleChange({ target: { name: "password", value: newPassword } });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <span className={style.close} onClick={closeModal}>
          &times;
        </span>
        <h2 className={style.titleModal}>Add New User</h2>
        <form onSubmit={handleSubmit} className={style.formModal}>
          {/* Add the input fields for name, email, phone number, password, and agency */}
          <input
            type="text"
            placeholder="Name"
            className={style.formControlModal}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            className={style.formControlModal}
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phone Number"
            className={style.formControlModal}
            name="phone"
            value={phone}
            onChange={handleChange}
          />
          <div className={style.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={style.formControlModal}
              name="password"
              value={password}
              onChange={handleChange}
            />
            <button
              type="button"
              className={style.showPasswordBtn}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
       
          {/* Add the button to generate a random password */}
          <button type="button" className={style.generatePasswordBtn} onClick={generatePassword}>
            Generate Password
          </button>
          {/* Add the button to submit the form */}
          <button type="submit" className={style.saveBtn}>
            Add
          </button>
          {errorMessage}
        </form>
      </div>
    </div>
  );
};

export default ModalAddUsers;
