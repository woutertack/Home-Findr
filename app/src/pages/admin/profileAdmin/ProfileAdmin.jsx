import React, { useState, useEffect } from "react";
import style from "./ProfileAdmin.module.css";

import Profile from "../../../components/global/profile/Profile";

const ProfileAdmin = () => {
  
  return (
    <div className={style.main}>
    <Profile />
    </div>
  );
};

export default ProfileAdmin;
