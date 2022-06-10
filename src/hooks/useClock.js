import { useEffect, useState } from "react";

let init;
const useClock = (timeZone, userTime = null) => {
  const [start, setStart] = useState(new Date());
  if (userTime) {
    init = new Date(userTime).toLocaleString("en-US", {
      timeZone: timeZone ? timeZone : "Asia/Dhaka",
    });
  } else {
    init = new Date().toLocaleString("en-US", {
      timeZone: timeZone ? timeZone : "Asia/Dhaka",
    });
  }

  let [time, setTime] = useState(init);

  const updateTime = () => {
    if (userTime) {
      const diff = new Date().getTime() - start.getTime();
      const myTime = new Date(userTime);
      myTime.setMilliseconds(myTime.getMilliseconds() + diff);
      return setTime(
        new Date(myTime).toLocaleString("en-US", {
          timeZone: timeZone ? timeZone : "default",
        })
      );
    }
    return setTime(
      new Date().toLocaleString("en-US", {
        timeZone: timeZone ? timeZone : "Asia/Dhaka",
      })
    );
  };
  useEffect(() => {
    setStart(new Date());
  }, [userTime]);
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
