import React, { useState, useEffect } from "react";
import style from "./ProfileUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useMutation from "../../hooks/useMutation";
import { useAuthContext } from "../../contexts/AuthContext";
import { IMG } from "../../consts/Img";
import Profile from "../../components/global/profile/Profile";

const ProfileUser = () => {
  return <Profile />;
};

export default ProfileUser;
