import React from "react";

const ToDoWithStorage = (ToDo) => {
  class HOC extends React.Component {
    load = (key) => {
      return localStorage.getItem(key);
    };

    save = (key, data) => {
      localStorage.setItem(key, data);
    };

    render() {
      return <ToDo load={this.load} save={this.save} />;
    }
  }

  return HOC;
};

export default ToDoWithStorage;
