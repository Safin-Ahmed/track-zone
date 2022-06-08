import { useEffect, useState } from "react";

const useClock = (timeZone) => {
  let [time, setTime] = useState(
    new Date().toLocaleString("en-US", {
      timeZone: timeZone ? timeZone : "Asia/Dhaka",
    })
  );
  const updateTime = () => {
    setTime(
      new Date().toLocaleString("en-US", {
        timeZone: timeZone ? timeZone : "Asia/Dhaka",
      })
    );
  };
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  const date = new Date(time);
  const hours = date.getHours().toLocaleString().padStart(2, 0);
  const minutes = date.getMinutes().toLocaleString().padStart(2, 0);
  const seconds = date.getSeconds().toLocaleString().padStart(2, 0);
  const period = hours >= 12 ? "PM" : "AM";

  const month = date.toLocaleString("default", { month: "long" });
  const numDay = date.getDate().toLocaleString().padStart(2, 0);
  const day = date.toLocaleString("default", { weekday: "long" });
  const year = date.getFullYear();

  return {
    date,
    hours,
    minutes,
    seconds,
    period,
    month,
    numDay,
    day,
    year,
  };
};

export default useClock;
