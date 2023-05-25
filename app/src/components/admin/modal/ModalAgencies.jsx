import React from "react";
import style from "./ModalAgencies.module.css";

const ModalAgencies = ({
  name,
  email,
  phone,
  handleChangeName,
  handleChangeEmail,
  handleChangePhone,
  handleSubmit,
  closeModal,
}) => {
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
            value={name}
            onChange={handleChangeName}
          />
          <input
            type="text"
            placeholder="Email"
            className={style.formControlModal}
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className={style.formControlModal}
            value={phone}
            onChange={handleChangePhone}
          />

          <button type="submit" className={style.saveBtn}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAgencies;
