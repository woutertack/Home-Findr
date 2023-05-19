import React, { useState } from 'react';
import style from './Agencies.module.css';
import SidebarAdmin from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Agencies = () => {
  const [agency, setAgency] = useState('');
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setName(event.target.value);
  };


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
  };

  const handleDelete = () => {
    // Add your delete logic here
  };

  return (
    <div className={style.main}>
      <SidebarAdmin />

      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Dashboard Admin</h1>
          <button className={style.btnAddAgency}>Add New Agency</button>
        </div>

        <div className={style.wrapper}>
          <div className={style.formRow}>
            <select
              value={agency}
              className={style.input}
              onChange={(e) => setAgency(e.target.value)}
            >
              <option value="">Select Agency</option>
              <option value="agency1">Agency 1</option>
              <option value="agency2">Agency 2</option>
              <option value="agency3">Agency 3</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.profileImgContainer}>
              <div className={style.profileImgWrapper}>
                <img
                  src={require('../../../images/pf.jpg')}
                  alt="profileImg"
                  className={style.profileImg}
                />
                <button className={style.btnAdd} onChange={handleProfilePicChange}>
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
              <button type="submit" className={style.saveBtn}>
                Update
              </button>
              <button type="button" className={style.deleteBtn} onClick={handleDelete}>
                Delete Agency
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Agencies;
