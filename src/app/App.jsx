import { useEffect, useState } from "react";
import Clock from "../components/Clock/Clock";
import { deepClone } from "../utils/objUtils";
import iterator from "../utils/idGen";
import "./App.css";
import MenuGroup from "../components/Shared/contextMenus/MenuGroup";
import AddClock from "../components/popupForms/AddClock";
import EditClock from "../components/popupForms/EditClock";
import Events from "../components/Events/Events";

const defaultState = {
  user: {
    id: "uz",
    title: "Your Clock",
    time: new Date().toLocaleString(),
    timeZone: "Asia/Dhaka",
    events: [],
  },
  clocks: [],
};

function App() {
  const [state, setState] = useState(defaultState);
  const [popupFormShown, setPopupFormShown] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    isContextShown: false,
    isAdminContextShown: false,
    points: {
      x: null,
      y: null,
    },
  });
  const [contextId, setContextId] = useState(null);
  const [editFormShown, setEditFormShown] = useState(false);
  const [eventsPageShown, setEventsPageShown] = useState(false);
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
          ? new Date(`${values.date} ${values.time}`).toLocaleString()
          : new Date().toLocaleString(),
      timeZone: values.timeZone,
      events: [],
    };
    newState.clocks.push(newClock);
    setState(newState);
  };
  const addClockFormHandler = () => {
    setPopupFormShown(true);
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
            ? new Date(`${values.date} ${values.time}`).toLocaleString()
            : new Date().toLocaleString(),
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
          ? new Date(`${values.date} ${values.time}`).toLocaleString()
          : new Date().toLocaleString(),
      timeZone: values.timeZone,
      events: [...updateClockEvents],
    };

    newState.clocks[updateClockIndex] = updatedClock;
    setState(newState);
  };

  const resetClockHandler = (id) => {
    const newState = deepClone(state);
    if (id === "uz") {
      newState.user.time = new Date().toLocaleString();
      setState(newState);
      return;
    } else {
      const userClockIndex = newState.clocks.findIndex(
        (clock) => clock.id === id
      );
      newState.clocks[userClockIndex].time = new Date().toLocaleString();

      setState(newState);
      return;
    }
  };

  return (
    <>
      {popupFormShown && (
        <>
          <AddClock
            addNewClock={addNewClock}
            setPopupFormShown={setPopupFormShown}
          />
        </>
      )}

      {editFormShown && (
        <>
          <EditClock
            id={contextId}
            editClock={editClock}
            setEditFormShown={setEditFormShown}
            state={state}
          />
        </>
      )}

      {eventsPageShown && (
        <Events
          state={state}
          setState={setState}
          id={contextId}
          setEventsPageShown={setEventsPageShown}
        />
      )}
      <div className="clocks">
        <div className="default-clock">
          <Clock
            isDefault="true"
            title={state.user.title}
            id={state.user.id}
            time={state.user.time}
            timeZone={state.user.timeZone}
            setTitleHandler={setTitleHandler}
            setTimeZoneHandler={setTimeZoneHandler}
            onContextHandler={(e) => contextHandler(e, true, state.user.id)}
          />
        </div>
        <div className="custom-clocks">
          {state.clocks.map((clock) => (
            <Clock
              title={clock.title}
              id={clock.id}
              time={clock.time}
              timeZone={clock.timeZone}
              defaultTimeZone={state.user.timeZone}
              setTitleHandler={setTitleHandler}
              setTimeZoneHandler={setTimeZoneHandler}
              key={clock.id}
              onContextHandler={(e) => contextHandler(e, false, clock.id)}
            />
          ))}
        </div>
        {contextMenu.isContextShown && (
          <MenuGroup
            id={contextId}
            state={state}
            setState={setState}
            top={contextMenu.points.y}
            left={contextMenu.points.x}
            deleteClock={deleteClock}
            setEditFormShown={setEditFormShown}
            resetClockHandler={resetClockHandler}
            setEventsPageShown={setEventsPageShown}
          />
        )}
        {contextMenu.isAdminContextShown && (
          <MenuGroup
            admin
            id={contextId}
            state={state}
            setState={setState}
            top={contextMenu.points.y}
            left={contextMenu.points.x}
            deleteClock={deleteClock}
            setEditFormShown={setEditFormShown}
            resetClockHandler={resetClockHandler}
            setEventsPageShown={setEventsPageShown}
          />
        )}
      </div>

      <button onClick={addClockFormHandler} className="add_clock">
        +Add Clock
      </button>
    </>
  );
}

export default App;
