import React from "react";
import style from "./ModalAddAgencies.module.css";

const ModalAddAgencies = ({ data, handleChange, handleSubmit, closeModal, errorMessage }) => {
  const { name, email, phone } = data;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <span className={style.close} onClick={closeModal}>
          &times;
        </span>
        <h2 className={style.titleModal}>Add New Agency</h2>
        <form onSubmit={handleSubmit} className={style.formModal}>
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

          <button type="submit" className={style.saveBtn}>
            Add
          </button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default ModalAddAgencies;
