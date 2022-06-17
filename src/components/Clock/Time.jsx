import React from "react";
import classes from "./Time.module.css";

const Time = ({ hours, minutes, period, seconds }) => {
  return (
    <div className={classes.time}>
      <span className={classes.hour}>
        {hours > 12
          ? (hours - 12).toString().padStart(2, 0)
          : hours.padStart(2, 0)}
      </span>
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
