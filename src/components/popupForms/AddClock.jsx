import React from "react";
import Form from "../Form/Form";

const AddClock = ({ addNewClock, setPopupFormShown }) => {
  return (
    <>
      <div
        className="backdrop"
        onClick={() => setPopupFormShown("add", false)}
      ></div>
      <Form clockFn={addNewClock} setPopupFormShown={setPopupFormShown} />
    </>
  );
};

export default AddClock;
