import React from "react";
import style from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignHanging } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img
            className={style.img}
            src={require("../../images/contactMap.png")}
            alt="rent"
          />
        </div>

        <div className={style.info}>
          <h1 className={style.title}>
            Home Findr
            <FontAwesomeIcon icon={faSignHanging} className={style.iconLogo} />
          </h1>
          <h2 className={style.email}>
            <span class={style.span}>Email: </span>
            homefindr@hotmail.com
          </h2>
          <h2 className={style.phone}>
            <span class={style.span}>Phone: </span>
            +32 123 45 67 89
          </h2>
          <h2 className={style.address}>
            <span class={style.span}>Address: </span>
            homefindr@hotmail.com
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Contact;
