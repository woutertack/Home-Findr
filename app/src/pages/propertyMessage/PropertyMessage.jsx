import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import style from "./PropertyMessage.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import useMutation from "../../hooks/useMutation";
import Loading from "../../components/global/loading/Loading";

const PropertyMessage = () => {
  const { id } = useParams();
  const {
    isLoading,
    data: propertyData,
    error,
  } = useFetch(`/properties/${id}`);

  const { data: agencyData } = useFetch(`/agencies/${propertyData?.agency}`);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { mutate, isLoading: isMessageLoading } = useMutation();

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    const postData = {
      sender: user._id,
      senderName: user.name,
      senderImg: user.profileImg,
      agencyName: agencyData?.name,
      agencyImg: agencyData?.profileImg,
      receiver: agencyData?._id,
      property: propertyData?._id,
      propertyTitle: propertyData?.title,
      message: message,
    };

    mutate(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "POST",
      data: postData,
      onSuccess: (data) => {
        setIsMessageSent(true);
      },
      onError: () => {
        setErrorMessage("Message could not be sent");
      },
    });
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (error || isLoading) return <div>{error || <Loading />}</div>;

  return (
    <div className={style.container}>
      <p className={style.title}>Message</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.property}>
          <p value={propertyData.title}>Property: {propertyData.title} </p>
        </div>
        <div className={style.agency}>
          <p>Agency: {agencyData.name}</p>
        </div>
        <div className={style.message}>
          <textarea
            className={style.textarea}
            placeholder="Type your message here..."
            name="message"
          ></textarea>
        </div>
        <p>{errorMessage}</p>
        <button
          className={style.send}
          disabled={isMessageLoading || isMessageSent}
        >
          {isMessageLoading
            ? "Message send"
            : isMessageSent
            ? "Message Send"
            : "Send"}
        </button>
      </form>
    </div>
  );
};

export default PropertyMessage;
