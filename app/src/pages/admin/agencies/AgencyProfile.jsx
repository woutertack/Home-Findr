import React, { useState, useEffect } from "react";
import style from "./AgencyProfile.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import ModalAgencies from "../../../components/admin/modal/ModalAgencies";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import { Link, useParams } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";

const AgencyProfile = () => {
  const { id } = useParams();

  const { data: agencyData, isLoading, error } = useFetch(`/agencies/${id}`);
  const { mutate } = useMutation();
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    profileImg: IMG + agencyData?.profileImg,
    name: agencyData?.name,
    email: agencyData?.email,
    phone: agencyData?.phone,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      profileImg: IMG + agencyData?.profileImg,
      name: agencyData?.name,
      email: agencyData?.email,
      phone: agencyData?.phone,
    }));
  }, [agencyData?.profileImg, agencyData?.name, agencyData?.email, agencyData?.phone]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      await mutate(`${process.env.REACT_APP_API_URL}/agencies/${id}`, {
        method: "PUT",
        data,
        onSuccess: (data) => {
          
          // Update the user in the context
         
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

  const handleDelete = async (event) => {
    event.preventDefault();
    // Handle agency deletion
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/agencies/${id}`, {
        method: "DELETE",
        onSuccess: async (data) => {
          console.log("Agency deleted"); // Set success message
          
          // also delete all properties of this agency
          try {
            await mutate(`${process.env.REACT_APP_API_URL}/properties/agency/${id}`, {
              method: "DELETE",
              onSuccess: async (data) => {
                console.log("Properties deleted"); // Set success message
             
                // also delete all the messages of this agency
                try {
                  await mutate(`${process.env.REACT_APP_API_URL}/messages/agency/${id}`, {
                    method: "DELETE",
                    onSuccess: (data) => {
                      console.log("Messages deleted"); // Set success message
                      // go to agencies page
                      window.location.href = "/admin/agencies";
                    }
                  });
                } catch (err) {
                  console.log(err);
                  
                }
              }
            });
          } catch (err) {
            console.log(err);
            setMessage("An error occurred. Please try again."); // Set error message
          }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
  <>
    <Link to="/admin/agencies" className={style.linkBack}>
      <div className={style.back}>
        <FontAwesomeIcon icon={faAnglesLeft} />
        Go back
      </div>
    </Link>
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.profileImgContainer}>
        <div className={style.profileImgWrapper}>
          <img
            src={file ? URL.createObjectURL(file) : data.profileImg}
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
          type="text"
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
        {message && <p className={style.message}>{message}</p>}
        <button
          type="button"
          className={style.deleteBtn}
          onClick={handleDelete}
        >
          Delete Agency
        </button>
      </div>
    </form>
  </>
  );
};

export default AgencyProfile;
