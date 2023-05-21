import React from "react";
import style from "./ModalUsers.module.css";

const ModalUsers = ({
  name,
  email,
  phoneNumber,

  handleNameChange,
  handleEmailChange,
  handlePhoneNumberChange,

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
          {/* Add the input fields for name, email, phone number, password, and agency */}
          <input
            type="text"
            placeholder="Name"
            className={style.formControlModal}
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Email"
            className={style.formControlModal}
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className={style.formControlModal}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
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

export default ModalUsers;
