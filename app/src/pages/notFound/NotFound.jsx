import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={style.container}>
      <Link to="/" className={style.link}>
        <h1 className={style.title}>404</h1>
        <p className={style.description}>
          This page could not be found
          <br /> Go back to the homepage
        </p>
      </Link>
    </div>
  );
};

export default NotFound;
