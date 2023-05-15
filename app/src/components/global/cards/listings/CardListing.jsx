import React from 'react'
import style from './CardListing.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const CardListing = (props) => {
  return (
    <li className={style.cardItem}>
    <Link className={style.cardItemLink} to={props.path}>
      <div className={style.cardItemImgWrap} >
        <img
          className={style.cardItemImg}
          alt={props.alt}
          src={props.src}
        />
      </div>
      <div className={style.cardItemInfo}>
        <h3 className={style.cardItemTitle}>{props.title}</h3>
        <h4 className={style.cardItemPrice}>€ {props.price} per month</h4>
        <div className={style.cardInfo}>
          <h4 className={style.cardItemPlace}>{props.place}</h4>
          <button className={style.cardItemButton}>More info 
          <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
          </button>
        </div>
      </div>
      
    </Link>
  </li>
  )
}

export default CardListing