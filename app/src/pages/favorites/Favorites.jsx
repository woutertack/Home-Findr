import React from "react";

import style from "./Favorites.module.css";
import CardFavorites from "../../components/global/cards/favorites/CardFavorites";

const Favorites = () => {
  return (
    <div className={style.main}>
      <div className={style.container}>
        <CardFavorites
          src={require("../../images/rent.jpg")}
          alt="rent"
          title="Explore the best quality "
          price="1000"
          place="Roeselare (8800), West Flanders"
          path="/detail"
        />

        <CardFavorites
          src={require("../../images/rent.jpg")}
          alt="rent"
          title="Explore the best quality "
          price="1000"
          place="Roeselare (8800), West Flanders"
          path="/detail"
        />

        <CardFavorites
          src={require("../../images/rent.jpg")}
          alt="rent"
          title="Explore the best quality "
          price="1000"
          place="Roeselare (8800), West Flanders"
          path="/detail"
        />
      </div>
    </div>
  );
};

export default Favorites;
