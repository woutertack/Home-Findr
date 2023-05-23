import React, { useEffect, useState } from "react";
import style from "./Favorites.module.css";
import CardFavorites from "../../components/global/cards/favorites/CardFavorites";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import CardListing from "../../components/global/cards/listings/CardListing";

const Favorites = () => {
  const { user } = useAuthContext();
  const { isLoading, data: favorites, error, invalidate } = useFetch(`/favorites/user/${user?._id}`);
  const [filteredData, setFilteredData] = useState(null);
  
  useEffect(() => {
    if (favorites) {
      setFilteredData(favorites.map(favorite => favorite.property));
    }
  }, [favorites]);
  
  return (
    <div className={style.main}>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className={style.container}>
          {filteredData?.map((property) => (
            <CardListing
              key={property._id}
              src={require("../../images/rent.jpg")}
              alt="buy"
              title={property.title}
              type={property.type}
              price={property.price}
              city={property.city}
              zipcode={property.zipcode}
              province={property.province}
              buildyear={property.buildyear}
              path={`/detail/${property._id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Favorites;
