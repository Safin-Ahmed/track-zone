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
  return (
    <ContextMenu top={top} left={left}>
      <ul className={classes.nav}>
        <li onClick={() => setEditFormShown(true)}>Edit</li>
        {!admin && <li onClick={() => deleteClock(id)}>Delete</li>}
        <li onClick={() => setEventsPageShown(true)}>Events</li>
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
