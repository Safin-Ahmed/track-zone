import React from "react";
import useClock from "../../hooks/useClock";
import formatTime from "../../utils/formatTime";
import { getDifferenceInHours } from "../../utils/timeDiff";
import Button from "../UI/buttons/Button";
import Card from "../UI/cards/Card";
import classes from "./Event.module.css";

const Event = ({ event, deleteEventHandler }) => {
  const { eventTitle, eventStartTime, eventEndTime, timeZone, isPassed, id } =
    event;

  const eventStartTimeTZ = new Date(eventStartTime).toLocaleString("en-US", {
    timeZone: timeZone,
  });

  const eventEndTimeTZ = new Date(eventEndTime).toLocaleString("en-US", {
    timeZone: timeZone,
  });
  const formattedStartDate = new Date(eventStartTimeTZ).toLocaleDateString(
    "en-US",
    { dateStyle: "full" }
  );
  const formattedStartTime = formatTime(eventStartTimeTZ);
  const formattedEndTime = formatTime(eventEndTimeTZ);

  const diffHour = getDifferenceInHours(
    new Date(eventEndTimeTZ),
    new Date(eventStartTimeTZ)
  );

  return (
    <Card>
      <div className={classes.cardLeft}>
        <h2>{eventTitle}</h2>
        <div className={classes.date}>
          <p>{formattedStartDate}</p>
          <p>{formattedStartTime}</p>
        </div>
      </div>

      <div className={classes.rightPart}>
        {!isPassed && <span className={classes.success}>Pending</span>}
        {isPassed && <span className={classes.danger}>Finished</span>}
        <div className={classes.duration}>
          <i className="fa-solid fa-clock"></i>
          <p>{Math.floor(diffHour)} Hrs</p>
        </div>
        <button onClick={() => deleteEventHandler(id)}>Delete</button>
      </div>
    </Card>
  );
};

export default Event;
