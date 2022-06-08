import React from "react";
import classes from "./Time.module.css";

const Time = ({ hours, minutes, period, seconds }) => {
  return (
    <div className={classes.time}>
      <span className={classes.hour}>{hours}</span>
      <span className={classes.dots}>: </span>
      <span className={classes.minutes}>{minutes}</span>
      <div className={classes.rightSide}>
        <span className={classes.period}>{period}</span>
        <span className={classes.seconds}>{seconds}</span>
      </div>
    </div>
  );
};

export default Time;
