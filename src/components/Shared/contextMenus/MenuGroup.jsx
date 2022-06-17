import React from "react";
import { deepClone } from "../../../utils/objUtils";
import ContextMenu from "../../UI/contextMenu/contextMenu";
import classes from "./MenuGroup.module.css";

const MenuGroup = ({
  top,
  left,
  admin,
  id,
  resetClockHandler,
  deleteClock,
  setEditFormShown,
  setEventsPageShown,
}) => {
  console.log("Menu Group is working");
  return (
    <ContextMenu top={top} left={left}>
      <ul className={classes.nav}>
        <li onClick={() => setEditFormShown("edit", true)}>Edit</li>
        {!admin && <li onClick={() => deleteClock(id)}>Delete</li>}
        <li onClick={() => setEventsPageShown("events", true)}>Events</li>
        <li
          onClick={() => {
            console.log(`${id} from resetHandler`);
            resetClockHandler(id);
          }}
        >
          Reset
        </li>
      </ul>
    </ContextMenu>
  );
};

export default MenuGroup;
