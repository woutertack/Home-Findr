import React, { useState, useEffect } from "react";
import style from "./AgencyProfile.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalAgencies from "../../../components/admin/modal/ModalAgencies";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import { Link, useParams } from "react-router-dom";

const AgencyProfile = () => {
  const { id } = useParams();
  console.log(id)
  const { data: agencyData, isLoading, error } = useFetch(`/agencies/${id}`);
  console.log(agencyData);
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
    // Handle form submission and update the agency data
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    // Handle agency deletion
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
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
        <button
          type="button"
          className={style.deleteBtn}
          onClick={handleDelete}
        >
          Delete Agency
        </button>
      </div>
    </form>
  );
};

export default AgencyProfile;
