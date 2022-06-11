import React from "react";
import classes from "./TimeDifference.module.css";

const TimeDifference = ({ defaultTimeZone, timeZone }) => {
  const defaultTime = new Date().toLocaleString("en-US", {
    timeZone: defaultTimeZone,
  });

  const customTime = new Date().toLocaleString("en-US", {
    timeZone: timeZone,
  });

  const diff = new Date(customTime).getTime() - new Date(defaultTime).getTime();

  const diffTime = diff / 3600000;

  console.log(diffTime);
  return (
    <div className={classes.diff_amount}>
      {diffTime % 1 === 0 && (
        <h3>
          {diffTime > 0 ? `+ ${diffTime}` : `- ${Math.abs(diffTime)}`} Hr : 0
          Min
        </h3>
      )}
      {diffTime % 1 !== 0 && (
        <h3>
          {diffTime > 0
            ? `+ 0 Hr ${" "} : ${" "} ${diffTime * 60}`
            : `- 0 Hr ${" "} : ${" "} ${Math.abs(diffTime * 60)}`}{" "}
          Min
        </h3>
      )}
    </div>
  );
};

export default TimeDifference;
