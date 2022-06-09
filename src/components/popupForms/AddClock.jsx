import React from "react";
import Form from "../Form/Form";

const AddClock = ({ addNewClock, setPopupFormShown }) => {
  return (
    <>
      <div className="backdrop" onClick={() => setPopupFormShown(false)}></div>
      <Form addNewClock={addNewClock} setPopupFormShown={setPopupFormShown} />
    </>
  );
};

export default AddClock;
