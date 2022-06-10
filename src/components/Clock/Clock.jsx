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
  onContextHandler,
}) => {
  const { date, hours, minutes, seconds, period, month, numDay, day, year } =
    useClock(timeZone, time);
  return (
    <div
      className={`${classes.clockContainer} ${
        isDefault ? classes.bigContainer : ""
      }`}
      onContextMenu={onContextHandler}
    >
      {isDefault && (
        <Title
          setTitleHandler={setTitleHandler}
          setTimeZoneHandler={setTimeZoneHandler}
          defaultTitle={title}
          timeZone={timeZone}
          isDefault={isDefault}
          id={id}
        />
      )}
      {!isDefault && (
        <Title
          setTitleHandler={setTitleHandler}
          setTimeZoneHandler={setTimeZoneHandler}
          defaultTitle={title}
          id={id}
          isDefault={isDefault}
          timeZone={timeZone}
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
