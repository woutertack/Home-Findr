import style from "./CardListing.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CardListing = (props) => {
  let priceText = "";
  if (props.saleType === "rent") {
    priceText = "per month";
  }

  return (
    <li className={style.cardItem}>
      <Link className={style.cardItemLink} to={props.path}>
        <div className={style.cardItemImgWrap}>
          <img className={style.cardItemImg} alt={props.alt} src={props.src} />
          {props.sold && <h2 className={style.soldText}>SOLD</h2>}
        </div>
        <div className={style.cardItemInfo}>
          <div className={style.cardItemTitle}>
            <h3>{props.title}</h3>
            <h5 className={style.cardType}>({props.type})</h5>
          </div>

          <h4 className={style.cardItemPlace}>
            {props.city} ({props.zipcode}), {props.province}
          </h4>
          <p className={style.buildYear}>Buildyear: {props.buildyear}</p>
          <div className={style.cardInfo}>
            <h4 className={style.cardItemPrice}>
              € {props.price} {priceText}{" "}
            </h4>

            <button className={style.cardItemButton}>
              Update info
              <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CardListing;
