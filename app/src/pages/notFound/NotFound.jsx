import React from "react";
import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>404</h1>
      <p className={style.description}>This page could not be found</p>
      <Link to="/" className={style.link}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
