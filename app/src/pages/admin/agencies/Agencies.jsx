import React, { useState, useEffect } from "react";
import style from "./Agencies.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ModalAgencies from "../../../components/admin/modal/ModalAgencies";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import { Link } from "react-router-dom";

const Agencies = () => {
  const { data: agencies } = useFetch("/agencies");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    agency: "",
    profileImg: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          <button className={style.btnAddAgency} onClick={openModal}>
            + Add New Agency
          </button>
        </div>
        <h1 className={style.info}> Click on an Agency to edit it</h1>
            
              {agencies &&
                agencies.map((agency) => (

                  <Link to={agency._id} key={agency._id} value={agency._id} className={style.link}>
                    {agency.name}  <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
                  </Link>
                ))}
           
          
      </div>


      {showModal && (
        <ModalAgencies
          name={data.name}
          email={data.email}
          phoneNumber={data.phone}
          handleNameChange={handleChange}
          handleEmailChange={handleChange}
          handlePhoneNumberChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Agencies;
