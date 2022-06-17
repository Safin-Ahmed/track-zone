import React from "react";
import Events from "../Events/Events";
import AddClock from "../popupForms/AddClock";
import EditClock from "../popupForms/EditClock";

const Popup = ({
  popupFormShown,
  editFormShown,
  eventsPageShown,
  addNewClock,
  displayForm,
  contextId,
  editClock,
  state,
  addEventHandler,
  deleteEventHandler,
  showEventForm,
}) => {
  return (
    <>
      {popupFormShown && (
        <AddClock addNewClock={addNewClock} setPopupFormShown={displayForm} />
      )}

      {editFormShown && (
        <EditClock
          id={contextId}
          editClock={editClock}
          setEditFormShown={displayForm}
          state={state}
        />
      )}

      {eventsPageShown && (
        <Events
          state={state}
          addEventHandler={addEventHandler}
          deleteEventHandler={deleteEventHandler}
          id={contextId}
          displayForm={displayForm}
          showEventForm={showEventForm}
        />
      )}
    </>
  );
};

export default Popup;
