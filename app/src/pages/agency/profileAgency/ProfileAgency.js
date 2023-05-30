import React, { useState, useEffect } from "react";
import style from "./ProfileAgency.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import ModalAddUsers from "../../../components/admin/modal/ModalAddUsers";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import { Link, useParams } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import { useAuthContext } from "../../../contexts/AuthContext";
import Loading from "../../../components/global/loading/Loading";

const ProfileAgency = () => {
  const { user } = useAuthContext();
  const agencyId = user?.agency;

  const {
    data: agencyData,
    isLoading,
    error,
  } = useFetch(`/agencies/${agencyId}`);
  const { mutate } = useMutation();
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    profileImg: agencyData?.profileImg || "defaultUser.png",
    name: agencyData?.name || "",
    email: agencyData?.email || "",
    phone: agencyData?.phone || "",
  });

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    agency: agencyId,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUser = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      profileImg: agencyData?.profileImg || "defaultUser.png",
      name: agencyData?.name || "",
      email: agencyData?.email || "",
      phone: agencyData?.phone || "",
    }));
  }, [
  agencyData
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

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
  if(data.name === "" || !validateEmail(data.email) || data.phone.length > 9){
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/agencies/${agencyId}`, {
        method: "PUT",
        data,
        onSuccess: (data) => {
          setMessage("Profile updated"); // Set success message

        },
        onError: (error) => {
          setMessage("Please fill in all the fields correctly")
        },
      });
    } catch (err) {
      console.log(err);
      setMessage("An error occurred. Please try again."); // Set error message
    }
    }else{
      setMessage("Please fill in all the fields correctly")
    }
  
  };


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // this is for the modal add new user function
  const handleSubmitAddUser = async (event) => {
    event.preventDefault();

    if(!validateEmail(dataUser.email)){
      setErrorMessage("Invalid email");
    } else if (dataUser.phone.length < 9) {
      setErrorMessage("Invalid phone number");
    } else if (dataUser.name.length < 2) {
      setErrorMessage("Invalid name");
    } else {
      await mutate(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        data: dataUser,
        onSuccess: async (data) => {
          setMessage("User added"); // Set success message
          closeModal();
        },
        onError: (error) => {
          console.log(error);
          // Set error message
        },
      });
    }

    // reset the form
    setDataUser({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (error || isLoading) return <div>{error || <Loading />}</div>;


  return (
    <>
      <div className={style.header}>
        <Link to="/agency" className={style.linkBack}>
          <div className={style.back}>
            <FontAwesomeIcon icon={faAnglesLeft} />
            Go back
          </div>
        </Link>
        <button className={style.btnAddAgency} onClick={openModal}>
          + Add new user to agency
        </button>
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.profileImgContainer}>
          <div className={style.profileImgWrapper}>
            <img
              src={file ? URL.createObjectURL(file) : IMG + data.profileImg}
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
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={style.formControl}
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className={style.formControl}
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <input
            type="number"
            placeholder="Phone Number"
            name="phone"
            className={style.formControl}
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <button type="submit" className={style.saveBtn}>
            Update
          </button>
          {message}
        </div>
      </form>
      {showModal && (
        <ModalAddUsers
          data={dataUser}
          handleChange={handleChangeUser}
          handleSubmit={handleSubmitAddUser}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default ProfileAgency;
