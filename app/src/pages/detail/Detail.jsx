import React from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Detail = () => {

  const { id } = useParams();
  const { isLoading, data: propertyData, error, invalidate } = useFetch(`/properties/${id}`);
  const { data: agencyData } = useFetch(`/agencies/${propertyData?.agency}`);

  const user = true;
  
  console.log(agencyData)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if user is logged in show full address, else show city and province
  const address = user ? (
    <>
      {propertyData.address},
      <br />
      {propertyData.city} ({propertyData.zipcode}), {propertyData.province}
    </>
  ) : (
    <>
      Login for full address
      <br />
      {propertyData.city} ({propertyData.zipcode}), {propertyData.province}
    </>
  );
  
  return (
    <div className={style.container}>
      { isLoading ? (
        "Loading..."
      ) : (
      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img
            className={style.img}
            src={require("../../images/rent.jpg")}
            alt="rent"
          />
          <div className={style.iconsWrapper}>
            <FontAwesomeIcon icon={faHeart} className={style.heart} />
          </div>
          <div className={style.bottomIconsWrapper}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className={style.bottomLeftIcon}
            />
            <FontAwesomeIcon
              icon={faAngleRight}
              className={style.bottomRightIcon}
            />
          </div>
        </div>

        <div className={style.infoListing}>
          <h1 className={style.title}>{propertyData.title}</h1>
          <p className={style.description}>
          {propertyData.desc}
          </p>
          <div className={style.infoWrapper}>
            <h2 className={style.address}>Type: {propertyData.type}</h2>
            <h2 className={style.buildYear}>Buildyear: {propertyData.buildyear}</h2>
          
          </div>
          <div className={style.infoWrapper}>
            <h2 className={style.surface}>Surface: {propertyData.sqmeters} m²</h2>
            <h2 className={style.agency}>Agency: {agencyData.name} </h2>
          </div>
          <h2 className={style.address}>Address: {address}</h2>
          <h2 className={style.price}>Price: €{propertyData.price} per month</h2>
          <Link to="/message" className={style.link}>
            <button className={style.btn}>Send a message</button>
          </Link>
          
        </div>
      </div>)}
    </div>
  );
};

export default Detail;
