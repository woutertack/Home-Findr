import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "./Detail.module.css";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";
import useMutation from "../../hooks/useMutation";
import { IMG } from "../../consts/Img";
import Loading from "../../components/global/loading/Loading";

const Detail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {
    isLoading,
    data: propertyData,
    error,
    invalidate,
  } = useFetch(`/properties/${id}`);
  const { data: agencyData } = useFetch(`/agencies/${propertyData?.agency}`);

  const { mutate } = useMutation();

  const [isFavorite, setIsFavorite] = useState(false); // State variable to track favorite status
  const [favoriteId, setFavoriteId] = useState(null); // State variable to store the favoriteId

  useEffect(() => {
    if (propertyData && user) {
      const checkFavorite = async () => {
        try {
          // using normal fetch here bcs useFetch did not working in this useEffect
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/favorites`,
            {
              method: "GET",
            }
          );
          const favorites = await response.json();
          const favorite = favorites.find(
            (f) => f.property === propertyData._id && f.user === user._id
          );
          if (favorite) {
            setIsFavorite(true);
            setFavoriteId(favorite._id);
          }
        } catch (error) {
          console.error("Error checking favorite:", error);
        }
      };

      checkFavorite();
    }
  }, [propertyData, user]);

  const handleFavorite = async (e) => {
    e.preventDefault();

    const postData = {
      user: user._id,
      property: propertyData._id,
    };

    try {
      if (isFavorite) {
        await mutate(
          `${process.env.REACT_APP_API_URL}/favorites/${favoriteId}`,
          {
            method: "DELETE",
          }
        );
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        const response = await mutate(
          `${process.env.REACT_APP_API_URL}/favorites`,
          {
            method: "POST",
            data: postData,
          }
        );
        const newFavorite = response ? response.data : null;
        if (newFavorite) {
          setIsFavorite(true);
          setFavoriteId(newFavorite._id);
        }
      }

      invalidate();
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // to return last page when clicked on go back
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  if (error || isLoading) return <div>{error || <Loading />}</div>;

  return (
    <div className={style.container}>
      <button onClick={goBack} className={style.linkBack}>
        <div className={style.back}>
          <FontAwesomeIcon icon={faAnglesLeft} />
          Go back
        </div>
      </button>
      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img className={style.img} src={IMG + propertyData.img} alt="rent" />
          {user && (
            <div className={style.iconsWrapper}>
              <FontAwesomeIcon
                icon={faHeart}
                className={`${style.heart} ${
                  isFavorite ? style.favorite : style.unfavorite
                }`} // Add the 'favorite' class when isFavorite is true
                onClick={handleFavorite}
              />
            </div>
          )}
        </div>

        <div className={style.infoListing}>
          <h1 className={style.title}>{propertyData.title}</h1>
          <p className={style.description}>{propertyData.desc}</p>
          <div className={style.infoWrapper}>
            <h2 className={style.address}>Type: {propertyData.type}</h2>
            <h2 className={style.buildYear}>
              Buildyear: {propertyData.buildyear}
            </h2>
          </div>
          <div className={style.infoWrapper}>
            <h2 className={style.surface}>
              Surface: {propertyData.sqmeters} m²
            </h2>
            <h2 className={style.agency}>Agency: {agencyData.name} </h2>
          </div>
          {user && (
            <h2 className={style.address}>
              Address: {propertyData.address},
              <br />
              {propertyData.city} ({propertyData.zipcode}),{" "}
              {propertyData.province}
            </h2>
          )}
          {!user && (
            <h2 className={style.address}>
              Address: Login for full address
              <br />
              {propertyData.city} ({propertyData.zipcode}),{" "}
              {propertyData.province}
            </h2>
          )}
          <h2 className={style.price}>Price: €{propertyData.price}</h2>
          {user && (
            <Link to={`/message/${propertyData._id}`} className={style.link}>
              <button className={style.btn}>Send a message</button>
            </Link>
          )}
          {!user && (
            <Link to="/login" className={style.link}>
              <button className={style.btn}>Login to send a message</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
