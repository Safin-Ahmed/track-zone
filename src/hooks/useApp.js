import { isPast } from "date-fns";
import { useEffect, useState } from "react";
import iterator from "../utils/idGen";
import { deepClone } from "../utils/objUtils";

const defaultState = {
  user: {
    id: "uz",
    title: "Your Clock",
    time: new Date().toISOString(),
    timeZone: "Asia/Dhaka",
    events: [],
  },
  clocks: [],
};

const useApp = () => {
  const [state, setState] = useState(defaultState);
  const [contextMenu, setContextMenu] = useState({
    isContextShown: false,
    isAdminContextShown: false,
    points: {
      x: null,
      y: null,
    },
  });
  const [contextId, setContextId] = useState(null);
  const [displayForms, setDisplayForms] = useState({
    addFormShown: false,
    editFormShown: false,
    eventsPageShown: false,
    showEventForm: false,
  });
  useEffect(() => {
    const removeContextMenu = () => {
      const newState = deepClone(contextMenu);
      newState.isContextShown = false;
      newState.isAdminContextShown = false;
      setContextMenu(newState);
    };

    window.addEventListener("click", removeContextMenu);

    return () => {
      window.removeEventListener("click", removeContextMenu);
    };
  }, []);
  const setTitleHandler = (isUser, id, newTitle) => {
    const newState = deepClone(state);
    if (isUser) {
      newState.user.title = newTitle;
      setState(newState);
      return;
    } else {
      const clock = newState.clocks.find((clock) => clock.id === id);
      clock.title = newTitle;
      setState(newState);
    }
  };
  const setTimeZoneHandler = (isUser, newTimeZone) => {
    if (isUser) {
      const newState = deepClone(state);
      newState.user.timeZone = newTimeZone;
      setState(newState);
      return;
    }
  };

  const addNewClock = (values) => {
    const newState = deepClone(state);
    const newClock = {
      id: iterator.next().value,
      title: values.title,
      time:
        values.date && values.time
          ? new Date(`${values.date} ${values.time}`).toISOString()
          : new Date().toISOString(),
      timeZone: values.timeZone,
      events: [],
    };
    newState.clocks.push(newClock);
    setState(newState);
  };

  const displayForm = (form, show = true) => {
    if (form === "add") {
      return setDisplayForms((prevState) => {
        return { ...prevState, addFormShown: show };
      });
    }

    if (form === "edit") {
      return setDisplayForms((prevState) => {
        return { ...prevState, editFormShown: show };
      });
    }

    if (form === "events") {
      return setDisplayForms((prevState) => {
        return { ...prevState, eventsPageShown: show };
      });
    }

    if (form === "eventForm") {
      return setDisplayForms((prevState) => {
        return { ...prevState, showEventForm: show };
      });
    }
  };

  const contextHandler = (e, isDefault = false, id) => {
    e.preventDefault();
    console.log(id);
    const newState = deepClone(contextMenu);
    newState.points.x = e.pageX;
    newState.points.y = e.pageY;
    setContextId(id);
    if (!isDefault) {
      newState.isContextShown = true;
      setContextMenu(newState);

      return;
    }
    newState.isAdminContextShown = true;
    setContextMenu(newState);
  };

  // Context Menu Action Handlers

  const deleteClock = (id) => {
    const newState = deepClone(state);
    const filtered = newState.clocks.filter((clock) => clock.id !== id);
    newState.clocks = filtered;
    setState(newState);
  };

  const editClock = (id, values) => {
    const newState = deepClone(state);
    if (id === "uz") {
      const eventsClone = deepClone(state.user.events);
      const updatedAdminClock = {
        id: id,
        title: values.title,
        time:
          values.date && values.time
            ? new Date(`${values.date} ${values.time}`).toISOString()
            : new Date().toISOString(),
        timeZone: values.timeZone,
        events: [...eventsClone],
      };

      newState.user = updatedAdminClock;

      return setState(newState);
    }
    const updateClockIndex = newState.clocks.findIndex(
      (clock) => clock.id === id
    );

    const updateClockEvents = deepClone(
      newState.clocks[updateClockIndex].events
    );

    const updatedClock = {
      id: id,
      title: values.title,
      time:
        values.date && values.time
          ? new Date(`${values.date} ${values.time}`).toISOString()
          : new Date().toISOString(),
      timeZone: values.timeZone,
      events: [...updateClockEvents],
    };

    newState.clocks[updateClockIndex] = updatedClock;
    setState(newState);
  };

  const resetClockHandler = (id) => {
    const newState = deepClone(state);
    if (id === "uz") {
      newState.user.time = new Date().toISOString();
      setState(newState);
      return;
    } else {
      const userClockIndex = newState.clocks.findIndex(
        (clock) => clock.id === id
      );
      newState.clocks[userClockIndex].time = new Date().toISOString();

      setState(newState);
      return;
    }
  };

  const addEventHandler = (values, clockId) => {
    const newState = deepClone(state);
    let clock;
    if (clockId === "uz") {
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

  const deleteEventHandler = (clockId, eventId) => {
    const newState = deepClone(state);
    let clock;
    if (clockId === "uz") {
      clock = newState.user;
    } else {
      clock = newState.clocks.find((clock) => clock.id === clockId);
    }
    const newEvents = clock.events.filter((event) => event.id !== eventId);
    clock.events = newEvents;
    setState(newState);
  };

  return {
    state,
    contextMenu,
    contextId,
    displayForms,
    displayForm,
    setTitleHandler,
    setTimeZoneHandler,
    addNewClock,
    contextHandler,
    deleteClock,
    editClock,
    resetClockHandler,
    addEventHandler,
    deleteEventHandler,
  };
};

export default useApp;
