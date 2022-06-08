import React from "react";
import classes from "./Calendar.module.css";

const Calendar = ({ month, day, numDay, year }) => {
  return (
    <div className={classes.calendar}>
      <span className={classes.month}>{month}</span>
      <span className={classes.day}>{day}</span>
      <span className={classes.date}>{numDay}</span>
      <span className={classes.year}>{year}</span>
    </div>
  );
};

export default Calendar;
