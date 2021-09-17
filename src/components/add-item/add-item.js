import React, { useState, useEffect } from "react";
import "./add-item.css";

function AddItem(props) {
  const { onClickAdd, state, todosTitle, leftListLength } = props;
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (todosTitle !== "Backlog") {
      leftListLength(todosTitle) !== 0
        ? setBtnDisabled(false)
        : setBtnDisabled(true);
    }
  });

  const buttonType =
    state === "default" ? (
      btnDisabled === false ? (
        <button className="btn btn-add-card" onClick={onClickAdd}>
          + Add card
        </button>
      ) : (
        <button className="btn btn-disabled">+ Add card</button>
      )
    ) : todosTitle === "Backlog" ? (
      <button className="btn btn-submit" onClick={onClickAdd}>
        Submit
      </button>
    ) : null;

  return buttonType;
}

export default AddItem;
