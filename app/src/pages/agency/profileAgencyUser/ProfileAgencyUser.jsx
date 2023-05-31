import style from "./ProfileAgencyUser.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Profile from "../../../components/global/profile/Profile";

const ProfileAgencyUser = () => {
  return (
    <div className={style.main}>
      <Link to="/agency" className={style.linkBack}>
        <div className={style.back}>
          <FontAwesomeIcon icon={faAnglesLeft} />
          Go back
        </div>
      </Link>
      <Profile />
    </div>
  );
};

export default ProfileAgencyUser;
