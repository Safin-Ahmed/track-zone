import { useState } from "react";
import Clock from "../components/Clock/Clock";
import { deepClone } from "../utils/objUtils";
import iterator from "../utils/idGen";
import "./App.css";

const defaultState = {
  user: {
    title: "Your Clock",
    timeZone: "",
  },
  clocks: [],
};

function App() {
  const [state, setState] = useState(defaultState);
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
  const addClockHandler = () => {
    const newState = deepClone(state);
    const newClock = {
      id: iterator.next().value,
      title: "New Clock",
      time: new Date(),
      timeZone: "Asia/Kolkata",
    };

    newState.clocks.push(newClock);
    setState(newState);
  };
  return (
    <>
      <div className="default-clock">
        <Clock
          isDefault="true"
          title={state.user.title}
          setTitleHandler={setTitleHandler}
          setTimeZoneHandler={setTimeZoneHandler}
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
          />
        ))}
      </div>

      <button onClick={addClockHandler} className="add_clock">
        +Add Clock
      </button>
    </>
  );
}

export default App;
