import React from "react";
import MenuGroup from "../Shared/contextMenus/MenuGroup";

const ContextMenuContainer = ({
  contextMenu,
  contextId,
  state,
  deleteClock,
  resetClockHandler,
  displayForm,
}) => {
  return (
    <>
      {contextMenu.isContextShown && (
        <MenuGroup
          id={contextId}
          state={state}
          top={contextMenu.points.y}
          left={contextMenu.points.x}
          deleteClock={deleteClock}
          setEditFormShown={displayForm}
          resetClockHandler={resetClockHandler}
          setEventsPageShown={displayForm}
        />
      )}
      {contextMenu.isAdminContextShown && (
        <MenuGroup
          admin
          id={contextId}
          state={state}
          top={contextMenu.points.y}
          left={contextMenu.points.x}
          deleteClock={deleteClock}
          setEditFormShown={displayForm}
          resetClockHandler={resetClockHandler}
          setEventsPageShown={displayForm}
        />
      )}
    </>
  );
};

export default ContextMenuContainer;
