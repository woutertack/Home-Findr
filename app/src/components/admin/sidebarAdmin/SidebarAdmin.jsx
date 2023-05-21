import React from "react";
import style from "./SidebarAdmin.module.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignHanging,
  faHome,
  faHotel,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const SidebarAdmin = () => {
  const location = useLocation();

  return (
    <div className={style.sidebar}>
      <div className={style.container}>
        <h1 className={style.title}>
          Home Findr
          <FontAwesomeIcon icon={faSignHanging} className={style.iconLogo} />
        </h1>
        <div className={style.links}>
          <Link
            to="/admin"
            className={`${style.link} ${
              location.pathname === "/admin" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faHome} className={style.icon} />
            <span className={style.span}>Properties</span>
          </Link>
          <Link
            to="/admin/add"
            className={`${style.link} ${
              location.pathname === "/admin/add" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faSignHanging} className={style.icon} />
            <span className={style.span}>Put on sale/rent</span>
          </Link>
          <Link
            to="/admin/agencies"
            className={`${style.link} ${
              location.pathname === "/admin/agencies" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faHotel} className={style.icon} />
            <span className={style.span}>Agencies</span>
          </Link>
          <Link
            to="/admin/users"
            className={`${style.link} ${
              location.pathname === "/admin/users" ? style.selected : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className={style.icon} />
            <span className={style.span}>Users</span>
          </Link>
        </div>
        <Link to="/admin/profile" className={style.profileLink}>
          <img
            src={require("../../../images/pf.jpg")}
            alt="profileImg"
            className={style.profileImg}
          />
          <span className={style.name}>Wouter Tack</span>
          <span className={style.email}>tackwouter@hotmail.com</span>
          <div className={style.profileButtons}>
            <button className={style.profileButton}>
              <FontAwesomeIcon icon={faUser} className={style.iconProfile} />
            </button>
            <button className={style.profileButton}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={style.iconProfile}
              />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarAdmin;
