import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Favorites.module.css";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import CardListing from "../../components/global/cards/listings/CardListing";
import { IMG } from "../../consts/Img";
import Loading from "../../components/global/loading/Loading";

const Favorites = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    isLoading,
    data: favorites,
    error,
  } = useFetch(`/favorites/user/${user?._id}`);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (favorites) {
      setFilteredData(favorites.map((favorite) => favorite.property));
    }
  }, [favorites]);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (error || isLoading) return <div>{error || <Loading />}</div>;

  return (
    <div className={style.main}>
      <div className={style.container}>
        {filteredData?.map((property) => (
          <CardListing
            key={property._id}
            src={IMG + property.img}
            alt="buy"
            title={property.title}
            type={property.type}
            price={property.price}
            saleType={property.saleType}
            city={property.city}
            zipcode={property.zipcode}
            province={property.province}
            buildyear={property.buildyear}
            path={`/detail/${property._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
