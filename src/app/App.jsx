import { useEffect, useState } from "react";
import Clock from "../components/Clock/Clock";
import { deepClone } from "../utils/objUtils";
import iterator from "../utils/idGen";
import "./App.css";
import Form from "../components/Form/Form";
import SelectInput from "../components/UI/inputs/SelectInput";
import ContextMenu from "../components/UI/contextMenu/contextMenu";
import MenuGroup from "../components/Shared/contextMenus/MenuGroup";
import AddClock from "../components/popupForms/AddClock";

const defaultState = {
  user: {
    id: "uz",
    title: "Your Clock",
    time: "",
    timeZone: "Asia/Dhaka",
  },
  clocks: [],
};

function App() {
  const [state, setState] = useState(defaultState);
  const [popupFormShown, setPopupFormShown] = useState(false);
  const [isAdminContextShown, setIsAdminContextShown] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    isContextShown: false,
    isAdminContextShown: false,
    points: {
      x: null,
      y: null,
    },
    id: undefined,
  });
  const [isContextShown, setIsContextShown] = useState(false);
  const [points, setPoints] = useState({ x: null, y: null });
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
      time: `${values.date ? values.date : ""}${
        values.time ? values.time : ""
      }`,
      timeZone: values.timeZone,
    };
    newState.clocks.push(newClock);
    setState(newState);
  };
  const addClockHandler = () => {
    setPopupFormShown(true);
    // const newState = deepClone(state);
    // const newClock = {
    //   id: iterator.next().value,
    //   title: "New Clock",
    //   time: new Date(),
    //   timeZone: "Asia/Kolkata",
    // };
    // newState.clocks.push(newClock);
    // setState(newState);
  };

  const contextHandler = (e, isDefault = false, id) => {
    e.preventDefault();
    console.log(id);
    const newState = deepClone(contextMenu);
    newState.points.x = e.pageX;
    newState.points.y = e.pageY;
    newState.id = id;
    if (!isDefault) {
      newState.isContextShown = true;
      setContextMenu(newState);
      return;
    }
    newState.isAdminContextShown = true;
    setContextMenu(newState);
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
              setTitleHandler={setTitleHandler}
              setTimeZoneHandler={setTimeZoneHandler}
              key={clock.id}
              onContextHandler={(e) => contextHandler(e, false, clock.id)}
            />
          ))}
        </div>
        {contextMenu.isContextShown && (
          <MenuGroup
            id={contextMenu.id}
            state={state}
            setState={setState}
            top={contextMenu.points.y}
            left={contextMenu.points.x}
          />
        )}
        {contextMenu.isAdminContextShown && (
          <MenuGroup
            admin
            id={contextMenu.id}
            state={state}
            setState={setState}
            top={contextMenu.points.y}
            left={contextMenu.points.x}
          />
        )}
      </div>

      <button onClick={addClockHandler} className="add_clock">
        +Add Clock
      </button>
    </>
  );
}

export default App;
