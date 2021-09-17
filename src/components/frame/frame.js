import { useState } from "react";
import AddItem from "../add-item/add-item.js";
import NewInput from "../new-input/new-input.js";
import NewSelect from "../new-select/new-select.js";
import { Link } from "react-router-dom";
import "./frame.css";

/* 
Сценарий
  Backlog 
  Add - 
    поле для ввода
    Add -> Submit
  Submit
    введенное сохранить в todo
    убрать поле ввода
    Submit -> Add

  Остальные 
    Add - поле со списком из задач слева над кнопкой
    До клика на список, Add disable
    Клик на список - перенос в этот frame/list, из предыдущего удалить, Add enable

Логика
  Backlog
    State Default 
      class или параметр Поля ввода - hidden
      class кнопки - add
      onclick кнопки - ..... -> state Add
    State Add
      class или параметр Поля ввода - visible
      button - class - Submit
      onblur Поля ввода - Запись value Поля ввода, state Default
      onclick кнопки - ..... -> Запись value Поля ввода, state Default

  Остальные
    State Default 
      class или параметр Поля ввода - hidden
      class кнопки - add
      onclick кнопки - ..... -> state Add
    State Add
      class или параметр Поля ввода - visible
      Поле ввода - Список
      button - class - disable
      onblur Поля ввода - cancel, State Default
      onclick Поля ввода - ..... -> Запись value Поля ввода, убрать из левого списка, state Default
    
*/

export default function Frame(props) {
  const { todosList, todosTitle, addTask, selectTitle, leftListLength } = props;

  const [state, setState] = useState("default");
  const [newValue, setNewValue] = useState("");

  const onClickAdd = (e) => {
    if (state === "default") {
      /* titleTodos в index, в основном, для демонстрации useContext,
      проще и надежнее список выбора передавать из Main
      */
      setNewValue("");
      selectTitle(todosTitle);
      setState("add");
    } else {
      /* в базу, объект,
      если не Backlog, стереть из левого списка
      */
      if (e.target.value !== "") {
        addTask(newValue, todosTitle);
      }

      setState("default");
    }
  };

  const onBlurAdd = (e) => {
    if (state === "add") {
      setState("default");
      if (todosTitle === "Backlog") {
        /*в базу*/
        if (e.target.value !== "") {
          addTask(newValue, todosTitle);
        } else return;
      }
    }
  };

  const onChangeAdd = (e) => {
    if (e.target.value !== "") {
      setNewValue(e.target.value);
      if (todosTitle !== "Backlog") {
        /*в базу*/
        if (e.target.value !== "") {
          addTask(e.target.value, todosTitle);
        } else return;
      }
    }
  };

  return (
    <div className="task-container">
      <h2 className="task-container__title">{todosTitle}</h2>
      <ul className="tasks">
        {todosList
          .sort((a, b) => a.dateMod - b.dateMod)
          .map((item) => (
            <Link className="task" to={`/${item.id}`}>
              <li key={item.id}>{item.name}</li>
            </Link>
          ))}
      </ul>

      {todosTitle === "Backlog" ? (
        <NewInput
          onChangeAdd={onChangeAdd}
          onBlurAdd={onBlurAdd}
          btnState={state}
        />
      ) : (
        <NewSelect
          onChangeAdd={onChangeAdd}
          onBlurAdd={onBlurAdd}
          btnState={state}
        />
      )}

      <AddItem
        state={state}
        todosTitle={todosTitle}
        onClickAdd={onClickAdd}
        leftListLength={leftListLength}
      />
    </div>
  );
}
