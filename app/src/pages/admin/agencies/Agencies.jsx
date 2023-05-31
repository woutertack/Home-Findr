import { useState } from "react";
import style from "./Agencies.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ModalAddAgencies from "../../../components/admin/modal/ModalAddAgencies";
import useFetch from "../../../hooks/useFetch";

import { Link } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import Loading from "../../../components/global/loading/Loading";

const Agencies = () => {
  const { data: agencies, error, isLoading } = useFetch("/agencies");
  const [errorMessage, setErrorMessage] = useState(null);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(data.email)) {
      setErrorMessage("Invalid email");
    } else if (data.phone.length < 9) {
      setErrorMessage("Invalid phone number");
    } else if (data.name.length < 2) {
      setErrorMessage("Invalid name");
    } else {
      await mutate(`${process.env.REACT_APP_API_URL}/agencies`, {
        method: "POST",
        data,
        onSuccess: (data) => {
          window.location.reload();
          closeModal();
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (error || isLoading) return <div>{error || <Loading />}</div>;

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
            <Link
              to={agency._id}
              key={agency._id}
              value={agency._id}
              className={style.link}
            >
              {agency.name}{" "}
              <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
            </Link>
          ))}
      </div>

      {showModal && (
        <ModalAddAgencies
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default Agencies;
