import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Messages.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import useMutation from "../../hooks/useMutation";
import { IMG } from "../../consts/Img";
import Loading from "../../components/global/loading/Loading";

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const {
    isLoading,
    data: messagesData,
    error,
  } = useFetch(`/messages/user/${user?._id}`);

  const { mutate } = useMutation();

  const date = new Date(selectedMessage?.createdAt);
  const dateFormatted = date.toLocaleTimeString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);

  

    const replyData = await fetch(
      `${process.env.REACT_APP_API_URL}/agencyMessages/agency/${message?.receiver}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const replyDataJson = await replyData.json();
    const replyAgency = replyDataJson?.find(
      (reply) =>
        reply?.sender === message?.receiver &&
        reply?.property === message?.property
    );

    if (replyAgency) {
      console.log(replyAgency);
      setSelectedMessage((prevMessage) => ({
        ...prevMessage,
        reply: replyAgency.message,
      }));
    }

    mutate(`${process.env.REACT_APP_API_URL}/messages/${message._id}`, {
      method: "PUT",
      data: { read: true },
      onSuccess: (res) => {},
      onError: (error) => {
        console.log(error);
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
      <div className={style.sidebar}>
        {messagesData &&
          messagesData.map((message, index) => (
            <div
              key={index}
              className={`${style.message}${
                selectedMessage === message ? ` ${style.selected}` : ""
              }`}
              onClick={() => handleSelectMessage(message)}
            >
              <div className={style.infoSender}>
                <img
                  src={IMG + message.agencyImg}
                  alt="Profile Pic"
                  className={style.profilePic}
                />
                <div className={style.from}>{message.agencyName}</div>
              </div>
              <div className={style.messageInfo}>
                <div className={style.property}>{message.propertyTitle}</div>

                {!message.read && (
                  <div className={style.unread}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                )}
              </div>
              <div className={style.line}></div>
            </div>
          ))}
      </div>
      <div className={style.messageViewer}>
        {selectedMessage ? (
          <div className={style.containerMessage}>
            <div className={style.propertyWrapper}>
              <h2>{selectedMessage.propertyTitle}</h2>
              <Link to={`/detail/${selectedMessage.property}`}>
                <button className={style.btn}>View Property</button>
              </Link>
            </div>
            <div className={style.content}>
              <p className={style.message}>{selectedMessage.message}</p>
              <div className={style.infoMessage}>
                {user._id === selectedMessage.sender ? (
                  <div className={style.byYou}>From: you</div>
                ) : (
                  <div className={style.byAgency}>
                    From: {selectedMessage.agencyName}
                  </div>
                )}
                <p className={style.date}>{dateFormatted}</p>
              </div>
            </div>
            {selectedMessage.reply && (
              <div className={style.replyContent}>
                <p className={style.message}>{selectedMessage.reply}</p>
                <div className={style.infoMessage}>
                  <div className={style.byAgency}>
                    From: {selectedMessage.agencyName}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Select a message to view</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
