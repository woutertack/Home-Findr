import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import style from './Messages.module.css';

import dewaelePic from '../../images/rent.jpg';

const messages = [
  {
    id: 1,
    from: 'Dewaele Vastgoedgroep',
    pic: dewaelePic,
    property: 'House in Roeselare',
    date: '2023-01-01',
    content: 'This is the first message.',
  },
  {
    id: 2,
    from: 'Era Vastgoed',
    pic: dewaelePic,
    property: 'Garage in Gent',
    date: '2023-01-01',
    content: 'This is the second message.',
  },
  // Add more messages as needed
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleReply = (messageId, reply) => {
    // Handle the reply logic (e.g., sending the reply to a server)
    console.log(`Reply to message ${messageId}: ${reply}`);
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${style.message}${selectedMessage === message ? ` ${style.selected}` : ''}`}
            onClick={() => handleSelectMessage(message)}
          >
            <div className={style.infoSender}>
              <img src={message.pic} alt="Profile Pic" className={style.profilePic} />
              <div className={style.from}>{message.from}</div>
            </div>
            <div className={style.messageInfo}>
              <div className={style.property}>{message.property}</div>
              <div className={style.date}>{message.date}</div>
            </div>
            <div class={style.line}></div>
          </div>
        ))}
      </div>
      <div className={style.messageViewer}>
        {selectedMessage ? (
          <div className={style.containerMessage}>
            <div className={style.propertyWrapper}>
              <h2>{selectedMessage.property}</h2>
              <Link to='/detail'>
                <button className={style.btn}>View Property</button>
              </Link>
            </div>
            <p>{selectedMessage.content}</p>
            <div className={style.reply}>
              <textarea
                className={style.textarea}
                placeholder="Write your reply here..."
                onChange={(e) => handleReply(selectedMessage.id, e.target.value)}
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
