import React from "react";
import style from "./Cards.module.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className={style.cardsContainer}>
      <div className={style.cardsWrapper}>
        <ul className={style.cardsItemsBig}>
          <CardItem
            src={require("../../../../images/rent.jpg")}
            alt="rent"
            text="Explore the best quality renting houses on the market"
            label="For Rent"
            path="/rent"
          />
          <CardItem
            src={require("../../../../images/buy.jpg")}
            alt="buy"
            text="Have a look at our amazing houses for sale"
            label="buy"
            path="/buy"
          />
        </ul>
        <ul className={style.cardsItemsSmall}>
          <CardItem
            src={require("../../../../images/contactUs.png")}
            alt="contact"
            text="Looking for more info? Contact us"
            label="Contact Us"
            path="/contactUs"
          />
          <CardItem
            src={require("../../../../images/login.jpg")}
            alt="login"
            text="Login now!"
            label="Login"
            path="/login"
          />
          <CardItem
            src={require("../../../../images/newsletter.jpg")}
            alt="register"
            text="Create an account now!"
            label="Register"
            path="/register"
          />
        </ul>
      </div>
    </div>
  );
}

export default Cards;
