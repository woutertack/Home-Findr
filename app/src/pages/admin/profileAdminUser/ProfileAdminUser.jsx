import style from "./ProfileAdminUser.module.css";

import Profile from "../../../components/global/profile/Profile";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const ProfileAdmin = () => {
  return (
    <div className={style.main}>
      <Link to="/admin" className={style.linkBack}>
        <div className={style.back}>
          <FontAwesomeIcon icon={faAnglesLeft} />
          Go back
        </div>
      </Link>
      <Profile />
    </div>
  );
};

export default ProfileAdmin;
