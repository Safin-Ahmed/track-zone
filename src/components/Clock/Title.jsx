import React, { useState } from "react";
import classes from "./Title.module.css";

const Title = ({
  defaultTitle,
  timeZone,
  setTitleHandler,
  setTimeZoneHandler,
  id,
  isDefault,
}) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const clickHandler = () => {
    setClicked(true);
  };

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const blurHandler = (e) => {
    setClicked(false);
    if (!isDefault) {
      setTitleHandler(
        false,
        id,
        e.target.value ? e.target.value : "Your Clock"
      );
    } else {
      setTitleHandler(true, id, e.target.value ? e.target.value : "Your Clock");
    }
  };
  return (
    <>
      <div className={classes.clockInfo}>
        {clicked && (
          <input
            type="text"
            name="title"
            onChange={onChangeHandler}
            onBlur={blurHandler}
            value={title}
            className={classes.inputTitle}
            required
          />
        )}
        {!clicked && (
          <span onDoubleClick={clickHandler} className={classes.title}>
            {title ? title : "Your Clock"}
          </span>
        )}
        {timeZone && <span className={classes.timeZone}> {timeZone}</span>}
      </div>
    </>
  );
};

export default Title;
