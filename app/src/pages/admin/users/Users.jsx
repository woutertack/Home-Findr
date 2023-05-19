import React, { useState } from 'react';
import style from './Users.module.css';
import SidebarAdmin from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalUsers from '../../../components/admin/modal/ModalUsers';

const Users = () => {
  
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [agency, setAgency] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleAgencyChange = (event) => {
    setAgency(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
  };

  const handleDelete = () => {
    // Add your delete logic here
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={style.main}>
      <SidebarAdmin />

      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Dashboard Admin</h1>
          <button className={style.btnAddUser} onClick={openModal}>
            + Add New User
          </button>
        </div>

        <div className={style.wrapper}>
          <div className={style.formRow}>
            <input type="text" className={style.search} placeholder="Search by name or email" />
          </div>

          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.profileImgContainer}>
              <div className={style.profileImgWrapper}>
                <img
                  src={require('../../../images/pf.jpg')}
                  alt="profileImg"
                  className={style.profileImg}
                />
                <button className={style.btnAdd} value={profilePic} onChange={handleProfilePicChange}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className={style.formGroup}>
              <input
                type="text"
                placeholder="Name"
                className={style.formControl}
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className={style.formGroup}>
              <input
                type="text"
                placeholder="Email"
                className={style.formControl}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className={style.formGroup}>
              <input
                type="text"
                placeholder="Phone Number"
                className={style.formControl}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className={style.formGroup}>
              <select value={agency} className={style.formControl} onChange={handleAgencyChange}>
                <option value="">Select Agency</option>
                <option value="">None</option>
                <option value="agency1">Agency 1</option>
                <option value="agency2">Agency 2</option>
                <option value="agency3">Agency 3</option>
              </select>
            </div>
            <div className={style.formGroup}>
              <button type="submit" className={style.saveBtn}>
                Update
              </button>
              <button type="button" className={style.deleteBtn} onClick={handleDelete}>
                Delete User
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <ModalUsers
          name={name}
          email={email}
          phoneNumber={phoneNumber}
          password={password}
          agency={agency}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handlePhoneNumberChange={handlePhoneNumberChange}
          handlePasswordChange={handlePasswordChange}
          handleAgencyChange={handleAgencyChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
