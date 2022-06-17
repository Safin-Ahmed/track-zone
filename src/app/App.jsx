import "./App.css";

import useApp from "../hooks/useApp";
import Popup from "../components/Popup/Popup";

import ClocksContainer from "../components/ClocksContainer/ClocksContainer";
import ContextMenuContainer from "../components/ContextMenuContainer/ContextMenuContainer";

function App() {
  const {
    state,
    contextMenu,
    contextId,
    setTitleHandler,
    setTimeZoneHandler,
    addNewClock,
    contextHandler,
    deleteClock,
    editClock,
    resetClockHandler,
    displayForm,
    displayForms,
    addEventHandler,
    deleteEventHandler,
  } = useApp();

  const {
    addFormShown: popupFormShown,
    editFormShown,
    eventsPageShown,
    showEventForm,
  } = displayForms;
  return (
    <>
      <Popup
        popupFormShown={popupFormShown}
        editFormShown={editFormShown}
        eventsPageShown={eventsPageShown}
        addNewClock={addNewClock}
        displayForm={displayForm}
        contextId={contextId}
        editClock={editClock}
        state={state}
        addEventHandler={addEventHandler}
        deleteEventHandler={deleteEventHandler}
        showEventForm={showEventForm}
      />

      <ClocksContainer
        state={state}
        setTitleHandler={setTitleHandler}
        setTimeZoneHandler={setTimeZoneHandler}
        contextHandler={contextHandler}
      />

      <ContextMenuContainer
        contextMenu={contextMenu}
        contextId={contextId}
        state={state}
        deleteClock={deleteClock}
        resetClockHandler={resetClockHandler}
        displayForm={displayForm}
      />

      <button onClick={() => displayForm("add")} className="add_clock">
        +Add Clock
      </button>
    </>
  );
}

export default App;
