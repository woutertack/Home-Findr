import React, { useState, useEffect } from "react";
import style from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useMutation from "../../../hooks/useMutation";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IMG } from "../../../consts/Img";

const Profile = () => {
  const { user } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();
  const [data, setData] = useState({
    profileImg:  user.profileImg,
    name: user.name,
    phone: user.phone,
    oldPassword: "",
    newPassword: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      profileImg:  user.profileImg,
    }));
  }, [user?.profileImg]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if new password is the same as the old password
    if (
      data.oldPassword &&
      data.newPassword &&
      data.oldPassword === data.newPassword
    ) {
      setMessage("New password cannot be the same as the old password");
      return;
    }

    if (file) {
      const dataImg = new FormData();
      const fileName = Date.now() + file.name;
      dataImg.append("name", fileName);
      dataImg.append("file", file);
      data.profileImg = fileName;

      try {
        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: "POST",
          body: dataImg,
        });

        // Update the profile picture value in data state
        setData((prevState) => ({
          ...prevState,
          profileImg: fileName,
        }));
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await mutate(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
        method: "PUT",
        data,
        onSuccess: (data) => {
          console.log(data);
          // Update the user in the context
          localStorage.setItem("USER", JSON.stringify(data));
          setMessage("Profile updated"); // Set success message
          // refresh the page
          window.location.reload();
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
              src={file ? URL.createObjectURL(file) :  IMG + data.profileImg}
              alt="profileImg"
              className={style.profileImg}
            />
            <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faPlus} className={style.fileInput} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
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
