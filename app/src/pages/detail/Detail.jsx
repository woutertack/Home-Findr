import React from 'react';
import { Link } from 'react-router-dom';
import style from './Detail.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img className={style.img} src={require("../../images/rent.jpg")} alt="rent" />
          <div className={style.iconsWrapper}>
            <FontAwesomeIcon icon={faHeart} className={style.heart} />
          </div>
          <div className={style.bottomIconsWrapper}>
            <FontAwesomeIcon icon={faAngleLeft} className={style.bottomLeftIcon} />
            <FontAwesomeIcon icon={faAngleRight} className={style.bottomRightIcon} />
          </div>
        </div>

        <div className={style.infoListing}>
          <h1 className={style.title}>Semi-detached house in Roeselare</h1>
          <p className={style.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quod voluptate voluptatem quas
            voluptatibus quos doloribus quae voluptates. Quisquam voluptatum,
            quibusdam, quia, quod voluptate voluptatem quas voluptatibus quos
          </p>
          <div className={style.infoWrapper}>
            <h2 className={style.buildYear}>Buildyear: 2008</h2>
            <h2 className={style.surface}>Surface: 100m²</h2>
            <h2 className={style.agency}>Agency: Dewaele</h2>
          </div>
          

          {/* if logged in show address */}
          <h2 className={style.address}>Address: Roeselaarsestaat 17, 
          Roeselare (8800), West Flanders</h2>
          {/* if not logged in only show city and province */}
          <h2 className={style.address}>Address: 
          <span className={style.span}> Login for full address</span>
           <br/>
          Roeselare (8800), West Flanders
          </h2>
          <h2 className={style.price}>Price: €850 per month</h2>
          <Link to="/message" className={style.link}>
          <button className={style.btn}>Send a message</button>
          </Link>
        </div>
       
      </div>
    </div>
  );
}

export default Detail;