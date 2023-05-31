import { useState } from "react";
import style from "./Users.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ModalAddUsers from "../../../components/admin/modal/ModalAddUsers";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";

const Users = () => {
  const { data: users } = useFetch("/users");

  const { mutate } = useMutation();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // add new user
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        data,
        onSuccess: (data) => {
          window.location.reload();
        },
        onError: (error) => {
          console.log(error);
        },
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
            + Add New User
          </button>
        </div>
        <h1 className={style.info}>Click on a User to edit it</h1>
        <div className={style.userContainer}>
          {users &&
            users.map((user) => (
              <Link
                to={user._id}
                key={user._id}
                value={user._id}
                className={style.link}
              >
                {user.name}{" "}
                <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
              </Link>
            ))}
        </div>
      </div>

      {showModal && (
        <ModalAddUsers
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
