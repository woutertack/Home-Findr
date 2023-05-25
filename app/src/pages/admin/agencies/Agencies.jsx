import React, { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
    console.log({ name, email, phone });
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
        <ModalAgencies
          name={name}
          email={email}
          phone={phone}
          handleChangeName={handleChangeName}
          handleChangeEmail={handleChangeEmail}
          handleChangePhone={handleChangePhone}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Agencies;
