import React from "react";
import { deepClone } from "../../../utils/objUtils";
import ContextMenu from "../../UI/contextMenu/contextMenu";
import classes from "./MenuGroup.module.css";

const MenuGroup = ({
  top,
  left,
  admin,
  id,
  state,
  setState,
  deleteClock,
  setEditFormShown,
}) => {
  return (
    <ContextMenu top={top} left={left}>
      <ul className={classes.nav}>
        <li onClick={() => setEditFormShown(true)}>Edit</li>
        {!admin && <li onClick={() => deleteClock(id)}>Delete</li>}
        <li>Events</li>
      </ul>
    </ContextMenu>
  );
};

export default MenuGroup;
