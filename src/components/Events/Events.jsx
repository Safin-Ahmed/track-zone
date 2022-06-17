import { isPast } from "date-fns";
import React, { useEffect, useState } from "react";
import iterator from "../../utils/idGen";
import { deepClone } from "../../utils/objUtils";
import EventForm from "../Form/EventForm";
import Event from "./Event";
import classes from "./Events.module.css";

const Events = ({
  setEventsPageShown,
  id,
  state,
  showEventForm,
  addEventHandler,
  deleteEventHandler,
  displayForm,
}) => {
  // const [showEventForm, setShowEventForm] = useState(false);
  const clock =
    id === "uz" ? state.user : state.clocks.find((clock) => clock.id === id);
  const { time } = clock;

  useEffect(() => {
    const newEvent = deepClone(clock.events);
    newEvent.forEach((event) => {
      if (!event.isPassed && isPast(new Date(event.eventStartTime))) {
        event.isPassed = true;
      } else {
        return;
      }
    });

    clock.events = newEvent;
  }, [time]);

  return (
    <>
      <div
        className="backdrop"
        onClick={() => displayForm("events", false)}
      ></div>

      <div className={classes.eventsPage}>
        <div className={classes.events}>
          {clock.events.length
            ? clock.events.map((event) => (
                <Event
                  deleteEventHandler={deleteEventHandler}
                  key={event.id}
                  event={event}
                  userId={id}
                />
              ))
            : "No Events Found"}
        </div>

        {showEventForm && (
          <EventForm
            setShowEventForm={displayForm}
            addEventHandler={addEventHandler}
            id={id}
          />
        )}

        <button onClick={() => displayForm("eventForm", true)}>
          + Add Event
        </button>
      </div>
    </>
  );
};

export default Events;
