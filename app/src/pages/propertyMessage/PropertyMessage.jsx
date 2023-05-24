import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import style from "./PropertyMessage.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import useMutation from "../../hooks/useMutation";

const PropertyMessage = () => {
  const { id } = useParams();
  const {
    isLoading: isPropertyLoading,
    data: propertyData,
    error,
    invalidate,
  } = useFetch(`/properties/${id}`);
  
  const { data: agencyData, isLoading: agencyLoading, error: agencyError } = useFetch(`/agencies/${propertyData?.agency}`);
  
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  
  const { mutate, isLoading: isMessageLoading, error: messageError } = useMutation();

  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    
    const postData = {
      sender: user._id,
      agencyName: agencyData?.name,
      agencyImg: agencyData?.profileImg,
      receiver: agencyData?._id,
      property: propertyData?._id,
      propertyTitle: propertyData?.title,
      message: message,
    };
  


    try {
      await  mutate(`${process.env.REACT_APP_API_URL}/messages`, {
        method: "POST",
        data: postData,
      });

      setIsMessageSent(true); // Update the state to indicate the message has been sent
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  
  return (
    <div className={style.container}>
      {isPropertyLoading ? (
        "Loading..."
      ) : (
        <>
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
            <button className={style.send} disabled={isMessageLoading || isMessageSent}>
              {isMessageLoading ? "Sending..." : isMessageSent ? "Message Sent" : "Send"}
            </button>
          </form>
          {messageError && <p>Error: {messageError}</p>}
        </>
      )}
    </div>
  );
};

export default PropertyMessage;
