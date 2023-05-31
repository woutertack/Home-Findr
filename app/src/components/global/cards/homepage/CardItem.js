import { Link } from "react-router-dom";
import style from "./CardItem.module.css";

function CardItem(props) {
  return (
    <>
      <li className={style.cardItem}>
        <Link className={style.cardItemLink} to={props.path}>
          <figure className={style.cardItemImgWrap} data-category={props.label}>
            <img
              className={style.cardItemImg}
              alt={props.alt}
              src={props.src}
            />
          </figure>
          <div className={style.cardItemInfo}>
            <h5 className={style.cardItemText}>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
