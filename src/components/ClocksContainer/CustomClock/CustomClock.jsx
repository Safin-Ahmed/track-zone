import React from "react";
import Clock from "../../Clock/Clock";

const CustomClock = ({
  state,
  setTitleHandler,
  setTimeZoneHandler,
  contextHandler,
}) => {
  return (
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
  );
};

export default CustomClock;
