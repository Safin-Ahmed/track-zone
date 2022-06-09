import React, { useState } from "react";
import useClock from "../../hooks/useClock";
import Calendar from "./Calendar";
import classes from "./Clock.module.css";
import Time from "./Time";
import Title from "./Title";
const Clock = ({
  isDefault = false,
  title,
  id,
  time,
  timeZone,
  setTitleHandler,
  setTimeZoneHandler,
}) => {
  const { date, hours, minutes, seconds, period, month, numDay, day, year } =
    useClock(timeZone);
  return (
    <div
      className={`${classes.clockContainer} ${
        isDefault ? classes.bigContainer : ""
      }`}
    >
      {isDefault && (
        <Title
          setTitleHandler={setTitleHandler}
          setTimeZoneHandler={setTimeZoneHandler}
          defaultTitle={title}
          timeZone="BD"
        />
      )}
      {!isDefault && (
        <Title
          setTitleHandler={setTitleHandler}
          setTimeZoneHandler={setTimeZoneHandler}
          defaultTitle={title}
          id={id}
          isDefault={isDefault}
        />
      )}
      <div
        className={`${classes.digitalClock} ${
          isDefault ? classes.bigClock : ""
        }`}
      >
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
