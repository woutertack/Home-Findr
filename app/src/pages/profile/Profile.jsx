import React, { useState } from "react";
import style from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContext";


const Profile = () => {
  const { user } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();
  const [data, setData] = useState({
    profilePic: "",
    name: user.name,
    phone: user.phone,
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if new password is the same as the old password
    if (data.oldPassword === data.newPassword) {
      setMessage("New password cannot be the same as the old password");
      return;
    }
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
        method: "PUT",
        data,
        onSuccess: (data) => {
          console.log(data);
          // update the user in the context
          localStorage.setItem("USER", JSON.stringify(data));
          setMessage("Profile updated"); // Set success message
         
        },
        onError: (error) => {
          console.log(error);
          setMessage("Password is not correct"); // Set error message
        },
      });
    } catch (err) {
      console.log(err);
      setMessage("An error occurred. Please try again."); // Set error message
    }
  };
  return (
    <div className={style.container}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.profileImgContainer}>
          <div className={style.profileImgWrapper}>
            <img
              src={require("../../images/pf.jpg")}
              alt="profileImg"
              className={style.profileImg}
            />
            <button className={style.btnAdd} onChange={handleChange}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Name</label>
          <input
            type="text"
            className={style.formControl}
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Phone Number</label>
          <input
            type="text"
            className={style.formControl}
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Change Password</label>
          <input
            type="password"
            className={`${style.formControl} ${style.oldPassword}`}
            placeholder="Old Password"
            name="oldPassword"
            value={data.oldPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            className={style.formControl}
            placeholder="New Password"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
          />
        </div>
        {message && <p className={style.message}>{message}</p>}
        <button type="submit" className={style.saveBtn}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
