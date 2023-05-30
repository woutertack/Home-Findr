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
  faEnvelope,
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
            to="/agency/profileAgency"
            className={`${style.link} ${
              location.pathname === "/agency/profileAgency"
                ? style.selected
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faHotel} className={style.icon} />
            <span className={style.span}>Agency</span>
          </Link>
          <Link
            to="/agency/messages"
            className={`${style.link} ${
              location.pathname === "/agency/messages" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faEnvelope} className={style.icon} />
            <span className={style.span}>Messages</span>
          </Link>
        </div>
        <div className={style.profile}>
          <img
            src={IMG + user?.profileImg}
            alt="profileImg"
            className={style.profileImg}
          />
          <span className={style.name}>{user.name}</span>
          <span className={style.email}>{user.email}</span>
          <div className={style.profileButtons}>
            <Link to="/agency/userProfile" className={style.profileButton}>
              <FontAwesomeIcon icon={faUser} className={style.iconProfile} />
            </Link>
            <Link to="/" className={style.profileButton} onClick={logout}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={style.iconProfile}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAgency;
