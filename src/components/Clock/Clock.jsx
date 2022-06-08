import React, { useState } from "react";
import useClock from "../../hooks/useClock";
import Calendar from "./Calendar";
import classes from "./Clock.module.css";
import Time from "./Time";
import Title from "./Title";
const Clock = ({ isDefault = false }) => {
  const { date, hours, minutes, seconds, period, month, numDay, day, year } =
    useClock();
  return (
    <div className={classes.clockContainer}>
      {isDefault && <Title title="Safin's Clock" timeZone="BD" />}
      {!isDefault && <Title title="User's Clock" timeZone="BD" />}
      <div className={classes.digitalClock}>
        <Time
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          period={period}
        />
        <Calendar month={month} numDay={numDay} day={day} year={year} />
      </div>
    </div>
  );
};

export default Clock;
