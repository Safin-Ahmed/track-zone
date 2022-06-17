import React from "react";
import AdminClock from "./AdminClock/AdminClock";
import CustomClock from "./CustomClock/CustomClock";

const ClocksContainer = ({
  state,
  setTitleHandler,
  setTimeZoneHandler,
  contextHandler,
  children,
}) => {
  return (
    <div className="clocks">
      <AdminClock
        state={state}
        setTitleHandler={setTitleHandler}
        setTimeZoneHandler={setTimeZoneHandler}
        contextHandler={contextHandler}
      />
      <CustomClock
        state={state}
        setTitleHandler={setTitleHandler}
        setTimeZoneHandler={setTimeZoneHandler}
        contextHandler={contextHandler}
      />

      {children}
    </div>
  );
};

export default ClocksContainer;
