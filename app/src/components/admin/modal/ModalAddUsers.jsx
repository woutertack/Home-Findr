import React from "react";
import style from "./ModalAddUsers.module.css";

const ModalAddUsers = ({ data, handleChange, handleSubmit, closeModal}) => {
  const { name, email, phone, password } = data;

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
            type="text"
            placeholder="Phone Number"
            className={style.formControlModal}
            name="phone"
            value={phone}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className={style.formControlModal}
            name="password"
            value={password}
            onChange={handleChange}
          />
       
          {/* Add the button to submit the form */}
          <button type="submit" className={style.saveBtn}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddUsers;
