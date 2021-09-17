import EmptyState from "../empty-state/empty-state.js";
import Frame from "../frame/frame.js";
import ItemPage from "../item-page/item-page.js";
import { Route } from "react-router-dom";
import "./main.css";

function Main(props) {
  const { todos, isLogged, setLogged, editTask } = props;

  return (
    <main className="main container">
      <Route exact path="/">
        {isLogged ? (
          <>
            <Frame
              todosTitle="Backlog"
              {...props}
              todosList={todos.filter((card) => card.status === "Backlog")}
            />
            <Frame
              todosTitle="Ready"
              {...props}
              todosList={todos.filter((card) => card.status === "Ready")}
            />
            <Frame
              todosTitle="In Progress"
              {...props}
              todosList={todos.filter((card) => card.status === "In Progress")}
            />
            <Frame
              todosTitle="Finished"
              {...props}
              todosList={todos.filter((card) => card.status === "Finished")}
            />
          </>
        ) : (
          <EmptyState setLogged={setLogged} />
        )}
      </Route>
      <Route
        path="/:id"
        children={({ match }) => {
          if (match !== null) {
            let itemId = +match.params.id;
            let foundItem = todos.find((item) => item.id === itemId);
            if (foundItem) {
              return <ItemPage item={foundItem} editTask={editTask} />;
            }
          } else return null;
        }}
      ></Route>
    </main>
  );
}

export default Main;
