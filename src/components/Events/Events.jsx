import { isPast } from "date-fns";
import React, { useEffect, useState } from "react";
import iterator from "../../utils/idGen";
import { deepClone } from "../../utils/objUtils";
import EventForm from "../Form/EventForm";
import Event from "./Event";
import classes from "./Events.module.css";

const Events = ({ setEventsPageShown, id, state, setState }) => {
  const [showEventForm, setShowEventForm] = useState(false);
  const clock =
    id === "uz" ? state.user : state.clocks.find((clock) => clock.id === id);
  const { time } = clock.time;

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
      ...values,
    };
    events.push(newEvent);

    clock.events = events;

    setState(newState);
  };

  const deleteEventHandler = (eventId) => {
    const newState = deepClone(state);
    let clock;
    if (id === "uz") {
      clock = newState.user;
    } else {
      clock = newState.clocks.find((clock) => clock.id === id);
    }
    const newEvents = clock.events.filter((event) => event.id !== eventId);
    clock.events = newEvents;
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
          {clock.events.length
            ? clock.events.map((event) => (
                <Event
                  deleteEventHandler={deleteEventHandler}
                  key={event.id}
                  event={event}
                />
              ))
            : "No Events Found"}
        </div>

        {showEventForm && (
          <EventForm
            setShowEventForm={setShowEventForm}
            eventFns={eventFns}
            id={id}
          />
        )}

        <button onClick={() => setShowEventForm(true)}>+ Add Event</button>
      </div>
    </>
  );
};

export default Events;
