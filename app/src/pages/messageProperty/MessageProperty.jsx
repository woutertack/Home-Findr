import React from "react";
import style from "./MessageProperty.module.css";

const MessageProperty = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className={style.container}>
      <p className={style.title}>Message</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.property}>
          <p>Property: House in Ghent</p>
        </div>
        <div className={style.agency}>
          <p>Agency: Immo Vastgoed</p>
        </div>
        <div className={style.message}>
          <textarea
            className={style.textarea}
            placeholder="Type your message here..."
          ></textarea>
        </div>
        <button className={style.send}>Send</button>
      </form>
    </div>
  );
};

export default MessageProperty;
