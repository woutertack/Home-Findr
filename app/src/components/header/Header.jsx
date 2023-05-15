import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignHanging,
  faEnvelope,
  faHeart,
  faRightFromBracket,
  
} from "@fortawesome/free-solid-svg-icons";
import HeaderMobile from "./HeaderMobile"; // Import the HeaderMobile component

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  

 
  useEffect(() => {
 
    const user = true;
    setLoggedIn(user);
  }, []);

  
  return (
    <header className={style.header}>
      <div className={style.container}>
        {/* Logo website */}
        <Link to="/" className={style.logo}>
          Home Findr
          <FontAwesomeIcon icon={faSignHanging} className={style.iconLogo} />
        </Link>

       

        {/* Menu mobile*/}
        <HeaderMobile
          
        />

        {/* Navbar */}
        <ul className={style.nav}>
          {/* Home */}
          <li className={style.navItem}>
            <Link to="/" className={style.navLink}>
              Home
            </Link>
          </li>
          {/* Rent */}
          <li className={style.navItem}>
            <Link to="/rent" className={style.navLink}>
              Rent
            </Link>
          </li>
          {/* Buy */}
          <li className={style.navItem}>
            <Link to="/buy" className={style.navLink}>
              Buy
            </Link>
          </li>
          {/* Contact */}
          <li className={style.navItem}>
            <Link to="/contact" className={style.navLink}>
              Contact
            </Link>
          </li>
          {/* Login/Sign Up */}
          {!loggedIn && (
            <>
              <li className={style.navItem}>
                <Link to="/login" className={style.navLink}>
                  Login
                </Link>
              </li>
              <li className={style.navItem}>
                <Link to="/signup" className={style.navLink}>
                  <button className={style.btnSignup}>Sign Up</button>
                </Link>
              </li>
            </>
          )}

          {/* if Logged in */}
          {loggedIn && (
            <>
              {/* Messages */}
              <li className={style.navItem}>
                <Link to="/messages" className={style.navLink}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={style.iconEnvelope}
                  />
                </Link>
              </li>
              {/* Favorites */}
              <li className={style.navItem}>
                <Link to="/favorites" className={style.navLink}>
                  <FontAwesomeIcon icon={faHeart} className={style.iconHeart} />
                </Link>
              </li>
              {/* Profile */}
              <li className={style.navItem}>
                <Link to="/profile" className={style.navLink}>
                  <img
                    src={require('../../images/pf.jpg')}
                    alt="profileImg"
                    className={style.profileImg}
                  />
                </Link>
              </li>
              {/* Logout */}
              <li className={style.navItem}>
                <Link to="/logout" className={style.navLink}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className={style.iconLogout}
                  />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
