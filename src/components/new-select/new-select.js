import React from "react";
import { SelectContext } from "../../index.jsx";
import "./new-select.css";

/*
- нужны списки задач из левых списков, есть в index и main
  туда нужно передать todosTitle - по клику кнопки в состоянии default,
  оттуда левый список через Context
- клик по списку дойдет до addTask в index, там нужен новый Title 
*/

function NewSelect(props) {
  const { onChangeAdd, onBlurAdd, btnState } = props;
  const selectList = React.useContext(SelectContext);

  let outBtnState = btnState !== "default";

  return outBtnState ? (
    <div className="new-item__select">
      <select
        className={
          btnState === "default"
            ? "new-item__select_hidden"
            : "new-item__select_visible"
        }
        onChange={onChangeAdd}
        onBlur={onBlurAdd}
      >
        <option className="new-item__option" value="" key="">
          Перенести задачу
        </option>
        {selectList.map((item) => {
          return (
            <option className="new-item__option" value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  ) : null;
}

export default NewSelect;
