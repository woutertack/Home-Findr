import React, { useState } from "react";
import style from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      profilePic,
      name,
      phoneNumber,
      oldPassword,
      newPassword,
    });
  };

  return (
    <div className={style.container}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.profileImgContainer}>
          <div className={style.profileImgWrapper}>
            <img
              src={require('../../images/pf.jpg')}
              alt="profileImg"
              className={style.profileImg}
            />
            <button className={style.btnAdd}  onChange={handleProfilePicChange}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Name</label>
          <input
            type="text"
            className={style.formControl}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Phone Number</label>
          <input
            type="text"
            className={style.formControl}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Change Password</label>
          
            <input
              type="password"
              className={style.formControl + " " + style.oldPassword}
              placeholder="Old Password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
            <input
              type="password"
              className={style.formControl}
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
        
        </div>
        <button type="submit" className={style.saveBtn}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
