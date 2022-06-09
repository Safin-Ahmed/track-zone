import React from "react";
import { deepClone } from "../../../utils/objUtils";
import ContextMenu from "../../UI/contextMenu/contextMenu";
import classes from "./MenuGroup.module.css";

const MenuGroup = ({ top, left, admin, id, state, setState }) => {
  const deleteClock = (id) => {
    const newState = deepClone(state);
    const filtered = newState.clocks.filter((clock) => clock.id !== id);
    newState.clocks = filtered;
    setState(newState);
  };

  return (
    <ContextMenu top={top} left={left}>
      <ul className={classes.nav}>
        <li>Edit</li>
        {!admin && <li onClick={() => deleteClock(id)}>Delete</li>}
        <li>Events</li>
      </ul>
    </ContextMenu>
  );
};

export default MenuGroup;
