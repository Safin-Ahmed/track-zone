import { isPast } from "date-fns";
import React, { useState } from "react";
import iterator from "../../utils/idGen";
import { deepClone } from "../../utils/objUtils";
import EventForm from "../Form/EventForm";
import classes from "./Events.module.css";

const Events = ({ setEventsPageShown, id, state, setState }) => {
  const [showEventForm, setShowEventForm] = useState(false);

  const addEventHandler = (values, clockId) => {
    const newState = deepClone(state);
    let clock;
    if (id === "uz") {
      clock = newState.user;
    } else {
      clock = newState.clocks.find((clock) => clock.id === clockId);
    }
    const events = deepClone(clock.events);
    const newEvent = {
      id: iterator.next().value,
      timeZone: clock.timeZone,
      isPassed: isPast(new Date(values.eventStartTime)),
      remainingTime: new Date(),
      ...values,
    };
    events.push(newEvent);

    clock.events = events;

    setState(newState);
  };

  const eventFns = {
    addEventHandler,
  };
  return (
    <>
      <div className="backdrop" onClick={() => setEventsPageShown(false)}></div>

      <div className={classes.eventsPage}>
        <div className={classes.events}>
          <p>Events for {id}</p>
        </div>

        {showEventForm && <EventForm eventFns={eventFns} id={id} />}

        <button onClick={() => setShowEventForm(true)}>+ Add Event</button>
      </div>
    </>
  );
};

export default Events;
