import React from "react";
import Clock from "../../Clock/Clock";

const AdminClock = ({
  state,
  setTitleHandler,
  setTimeZoneHandler,
  contextHandler,
}) => {
  return (
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
  );
};

export default AdminClock;
