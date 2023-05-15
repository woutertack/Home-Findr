import React from "react";
import style from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignHanging,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";
import Cards from "../../components/global/cards/homepage/Cards";

const Home = () => {
  return (
    <div className={style.home}>
      <div className={style.container}>
        <h1 className={style.title}>Home Findr
        <FontAwesomeIcon icon={faSignHanging} className={style.iconLogo} /></h1>
        
        
        <p className={style.tagline}>The best place to find a home</p>

        <FontAwesomeIcon icon={faAnglesDown} className={style.scrolldown}/>

      </div>
      
      <div className={style.main}>
        <h1 className={style.subtitle}>Our Services</h1>
        <Cards />
              
            
          
        
      </div>
    </div>
  )
};

export default Home;
