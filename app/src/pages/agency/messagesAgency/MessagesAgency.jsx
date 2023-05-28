import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './MessagesAgency.module.css';
import { useAuthContext } from '../../../contexts/AuthContext';
import useFetch from '../../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useMutation from '../../../hooks/useMutation';
import { IMG } from "../../../consts/Img";

const MessagesAgency = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyValue, setReplyValue] = useState('');

  const { user } = useAuthContext();
  const agencyId = user?.agency;
  const {
    isLoading,
    data: messagesData,
    error,
  } = useFetch(`/messages/agency/${agencyId}`);

  const { mutate } = useMutation();

  const date = new Date(selectedMessage?.createdAt);
  const dateFormatted = date.toLocaleTimeString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const replyDates = new Date(selectedMessage?.replyDate);
  const replyDateFormatted = replyDates.toLocaleTimeString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);

    const replyData = await fetch(`${process.env.REACT_APP_API_URL}/agencyMessages/agency/${agencyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const replyDataJson = await replyData.json();
    const replyAgency = replyDataJson.find(
      (reply) => reply?.receiver === message?.sender && reply?.property === message?.property
    );
    if (replyAgency) {
      setSelectedMessage((prevMessage) => ({
        ...prevMessage,
        reply: replyAgency.message,
      }));
    }

    // Mark the message as read
    mutate(`${process.env.REACT_APP_API_URL}/messages/${message._id}`, {
      method: "PUT",
      data: { read: true },
      onSuccess: (res) => {},
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleReplyChange = (e) => {
    setReplyValue(e.target.value);
  };

  const handleReply = async (e) => {
    e.preventDefault();

    const replyData = {
      sender: agencyId,
      receiver: selectedMessage.sender,
      property: selectedMessage.property,
      message: replyValue,
    };

    try {
      await mutate(
        `${process.env.REACT_APP_API_URL}/agencyMessages`,
        {
          method: "POST",
          data: replyData,
          onSuccess: (res) => {
            setSelectedMessage((prevMessage) => ({
              ...prevMessage,
              reply: replyData.message,
              
            }));
            setReplyValue('');
            console.log(res);
            console.log("Message sent");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        {messagesData &&
          messagesData.map((message) => (
            <div
              key={message.id}
              className={`${style.message}${selectedMessage === message ? ` ${style.selected}` : ""}`}
              onClick={() => handleSelectMessage(message)}
            >
              <div className={style.infoSender}>
                <img
                  src={IMG + message.senderImg}
                  alt="Profile Pic"
                  className={style.profilePic}
                />
                <div className={style.from}>{message.senderName}</div>
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
                  <div className={style.byAgency}>
                    From: {selectedMessage.senderName}
                  </div>
                <p className={style.date}>{dateFormatted}</p>
              </div>
            </div>
            
              {selectedMessage.reply && (
                <div className={style.replyContent}>
                
                <p className={style.message}>{selectedMessage.reply}</p>
                  <div className={style.infoMessage}> 
                    <div className={style.byAgency}>
                      From: you
                    </div>
              
                </div>
               </div>
              
              )}
            
            
            <div className={style.reply}>
              <textarea
                className={style.textarea}
                placeholder="Write your reply here..."
                value={replyValue}
                onChange={handleReplyChange}
              />
              <button className={style.btnSend} onClick={handleReply}>Send</button>
            </div>
          </div>
        ) : (
          <p>Select a message to view</p>
        )}
      </div>
    </div>
  );
};

export default MessagesAgency;
