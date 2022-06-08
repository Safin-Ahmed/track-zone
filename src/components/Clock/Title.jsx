import React from "react";
import classes from "./Title.module.css";

const Title = ({ title, timeZone }) => {
  return (
    <>
      <div className={classes.clockInfo}>
        <span className={classes.title}>{title} - </span>
        <span className={classes.timeZone}>{timeZone}</span>
      </div>
    </>
  );
};

export default Title;
