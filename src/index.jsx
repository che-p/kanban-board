import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/header.js";
import Main from "./components/main/main.js";
import Footer from "./components/footer/footer.js";
import dataMock from "./data-mock";
import ToDoWithStorage from "./index-storage.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

/*
Подготовить шрифт из ТЗ
Схема базовой структуры
  Header
    Title
    User
  Main
    Backlog
      Title
      Items
      +Add card/Submit
    Ready
      ...
    In progress
      ...
    Finished
      ...
  Footer
    Active
    Finished
    Footer title <name> <year>

  State
    isLogged
    Дело
      Состояние
      ID
      Title
      Text
      Date
  
Схема файловой структуры
*/

export const SelectContext = React.createContext();

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataMock,
      isLogged: false,
      footerData: {
        aTasks: 0,
        fTasks: 0,
        nameFoo: "Pavel",
        yearFoo: 2021,
      },
      selectTitle: "",
    };
  }

  setLogged = () => {
    const isLogged = !this.state.isLogged;
    this.props.save("isLogged", JSON.stringify(isLogged));
    this.setState({ isLogged });
  };

  countAmount = (prevState) => {
    let aTasks = 0,
      fTasks = 0;
    if (this.state.isLogged) {
      this.state.data.forEach((item) => {
        if (item.status === "Backlog") {
          aTasks++;
        }
        if (item.status === "Finished") {
          fTasks++;
        }
      });
    }

    if (
      prevState.footerData.aTasks !== aTasks ||
      prevState.footerData.fTasks !== fTasks
    ) {
      this.setState({
        footerData: { aTasks, fTasks, nameFoo: "Pavel", yearFoo: 2021 },
      });
    }
  };

  newTitle = (todosTitle, dir = "right") => {
    switch (todosTitle) {
      case "Backlog":
        return dir === "left" ? "Backlog" : "Ready";
      case "Ready":
        return dir === "left" ? "Backlog" : "In Progress";
      case "In Progress":
        return dir === "left" ? "Ready" : "Finished";
      case "Finished":
        return dir === "left" ? "In Progress" : "Finished";
      default:
        break;
    }
  };

  editTask = (itemValue, itemName, itemId) => {
    let selectedTask = this.state.data.map((item) => {
      if (item.id === +itemId) {
        if (itemName === "name" || "text") {
          item[itemName] = itemValue;
        }
      }
      return item;
    });
    this.setState({ data: selectedTask });
    this.props.save("data", JSON.stringify(selectedTask));
  };

  addTask = (task, title) => {
    if (title === "Backlog") {
      const prevTasks = this.state.data;
      const newTask = {
        id: prevTasks.length + 1,
        name: task,
        text: "",
        status: title,
        date: String(new Date()),
        dateMod: new Date().getTime(),
      };
      prevTasks.push(newTask);
      this.setState({ data: prevTasks });
      this.props.save("data", JSON.stringify(prevTasks));
    } else {
      /*поиск по id, замена title у найденного*/
      let selectedTasks = this.state.data.map((item) => {
        if (item.id === +task) {
          item.status = title;
          item.dateMod = new Date().getTime();
        }
        return item;
      });

      this.setState({ data: selectedTasks });
      this.props.save("data", JSON.stringify(selectedTasks));
    }
  };

  selectTitleFunc = (selTel) => {
    this.setState({ selectTitle: selTel });
  };

  componentDidMount() {
    const isLogged = JSON.parse(this.props.load("isLogged"));
    this.setState({ isLogged });

    const data = JSON.parse(this.props.load("data"));
    if (data !== null) {
      this.setState({ data });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.countAmount(prevState);
  }

  leftList = (card, ti = this.state.selectTitle) => {
    return card.status === this.newTitle(ti, "left");
  };

  leftListLength = (ti) => {
    return this.state.data.filter((card) => this.leftList(card, ti)).length;
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Header isLogged={this.state.isLogged} setLogged={this.setLogged} />
          <SelectContext.Provider
            value={this.state.data.filter((card) => this.leftList(card))}
          >
            <Main
              todos={this.state.data}
              isLogged={this.state.isLogged}
              setLogged={this.setLogged}
              addTask={this.addTask}
              editTask={this.editTask}
              selectTitle={this.selectTitleFunc}
              leftListLength={this.leftListLength}
            />
          </SelectContext.Provider>
          <Footer footerData={this.state.footerData} />
        </div>
      </Router>
    );
  }
}

const StoragedToDo = ToDoWithStorage(ToDo);

ReactDOM.render(
  <React.StrictMode>
    <StoragedToDo />
  </React.StrictMode>,
  document.getElementById("root")
);
