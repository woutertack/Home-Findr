import React from "react";
import style from "./CardFavorites.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardFavorites = (props) => {
  return (
    <li className={style.cardItem}>
      <Link className={style.cardItemLink} to={props.path}>
        <div className={style.cardItemImgWrap}>
          <img className={style.cardItemImg} alt={props.alt} src={props.src} />
          <div className={style.iconsWrapper}>
            <FontAwesomeIcon icon={faHeart} className={style.heart} />
          </div>
        </div>
        <div className={style.cardItemInfo}>
        <div className={style.cardItemTitle}>
            <h3>{props.title}</h3>
            <h5 className={style.cardType}>({props.type})</h5>
          </div>

          <h4 className={style.cardItemPlace}>
            {props.city} ({props.zipcode}), {props.province}
          </h4>
          <div className={style.cardInfo}>
            <h4 className={style.cardItemPrice}>€ {props.price} per month</h4>
            <button className={style.cardItemButton}>
              More info
              <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CardFavorites;
