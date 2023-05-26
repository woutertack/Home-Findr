import React, { useState } from "react";
import style from "./Agencies.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ModalAddAgencies from "../../../components/admin/modal/ModalAddAgencies";
import useFetch from "../../../hooks/useFetch";

import { Link } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";

const Agencies = () => {
  const { data: agencies } = useFetch("/agencies");
  
  const { mutate } = useMutation();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your submit logic here
  
    // add new agency
    try{
      await mutate(`${process.env.REACT_APP_API_URL}/agencies`, {
        method: "POST",
        data,
        onSuccess: (data) => {
       
          window.location.reload();
        },
        onError: (error) => {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }

    closeModal();
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
        <h1 className={style.info}>Click on an Agency to edit it</h1>

        {agencies &&
          agencies.map((agency) => (
            <Link to={agency._id} key={agency._id} value={agency._id} className={style.link}>
              {agency.name} <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
            </Link>
          ))}
      </div>

      {showModal && (
        <ModalAddAgencies
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Agencies;
