import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Messages.module.css";

import dewaelePic from "../../images/rent.jpg";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import useMutation from "../../hooks/useMutation";
import {IMG} from "../../consts/Img"

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  

  const { user } = useAuthContext();
  const {
    isLoading,
    data: messagesData,
    error,
  } = useFetch(`/messages/user/${user._id}`);

  const { mutate } = useMutation();

  const date = new Date(selectedMessage?.createdAt);
  const dateFormatted = date.toLocaleTimeString("en-GB", {
    weekday: "short",

    month: "short",
    day: "numeric",
  });

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);

    mutate(`${process.env.REACT_APP_API_URL}/messages/${message._id}`, {
      method: "PUT",
      data: { read: true },
      onSuccess: (res) => {},
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const handleReply = (messageId, reply) => {
    // Handle the reply logic (e.g., sending the reply to a server)
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        {messagesData &&
          messagesData.map((message) => (
            <div
              key={message.id}
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
                {/* if user._id = sender , put by you otherwise its agency*/}

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
            <div className={style.reply}>
              <textarea
                className={style.textarea}
                placeholder="Write your reply here..."
                onChange={(e) =>
                  handleReply(selectedMessage.id, e.target.value)
                }
              />
              <button className={style.btnSend}>Send</button>
            </div>
          </div>
        ) : (
          <p>Select a message to view</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
