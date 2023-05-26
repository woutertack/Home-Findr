import React from "react";
import style from "./SidebarAgency.module.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignHanging,
  faHome,
  faHotel,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IMG } from "../../../consts/Img";

const SidebarAgency = () => {
  const location = useLocation();
  const { user, logout } = useAuthContext();

  return (
    <div className={style.sidebar}>
      <div className={style.container}>
        <h1 className={style.title}>
          Home Findr
          <FontAwesomeIcon icon={faSignHanging} className={style.iconLogo} />
        </h1>
        <div className={style.links}>
          <Link
            to="/agency"
            className={`${style.link} ${
              location.pathname === "/agency" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faHome} className={style.icon} />
            <span className={style.span}>Properties</span>
          </Link>
          <Link
            to="/agency/add"
            className={`${style.link} ${
              location.pathname === "/agency/add" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faSignHanging} className={style.icon} />
            <span className={style.span}>Put on sale/rent</span>
          </Link>
          <Link
            to="/agency/agencies"
            className={`${style.link} ${
              location.pathname === "/agency/agencies" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faHotel} className={style.icon} />
            <span className={style.span}>Agencies</span>
          </Link>
          <Link
            to="/agency/users"
            className={`${style.link} ${
              location.pathname === "/agency/users" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className={style.icon} />
            <span className={style.span}>Users</span>
          </Link>
        </div>
        <Link to="/agency/profile" className={style.profileLink}>
          <img
            src={IMG + user?.profileImg}
            alt="profileImg"
            className={style.profileImg}
          />
          <span className={style.name}>{user.name}</span>
          <span className={style.email}>{user.email}</span>
          <div className={style.profileButtons}>
            <button className={style.profileButton}>
              <FontAwesomeIcon icon={faUser} className={style.iconProfile} />
            </button>
            <Link  to="/" className={style.profileButton} onClick={logout}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={style.iconProfile}
              />
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarAgency;
