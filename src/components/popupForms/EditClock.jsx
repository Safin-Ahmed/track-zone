import React from "react";
import Form from "../Form/Form";

const EditClock = ({ editClock, setEditFormShown, id, state }) => {
  console.log(`${id} from Edit Clock`);
  return (
    <>
      <div className="backdrop" onClick={() => setEditFormShown(false)}></div>
      <Form
        clockFn={editClock}
        setPopupFormShown={setEditFormShown}
        type="edit"
        id={id}
        editState={state}
      />
    </>
  );
};

export default EditClock;
