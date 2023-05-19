import React from 'react';
import style from './ModalUsers.module.css';


const ModalUsers = ({
  name,
  email,
  phoneNumber,
  password,
  agency,
  handleNameChange,
  handleEmailChange,
  handlePhoneNumberChange,
  handlePasswordChange,
  handleAgencyChange,
  handleSubmit,
  closeModal
}) => {
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
          <input
            type="password"
            placeholder="Password"
            className={style.formControlModal}
            value={password}
            onChange={handlePasswordChange}
          />
          {/* Add the select field for the agency */}
          <select value={agency} className={style.formControlModal} onChange={handleAgencyChange}>
            <option value="">Select Agency</option>
            <option value="">None</option>
            <option value="agency1">Agency 1</option>
            <option value="agency2">Agency 2</option>
            <option value="agency3">Agency 3</option>
          </select>
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
