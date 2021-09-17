import "./empty-state.css";

function EmptyState(props) {
  const { setLogged } = props;

  return (
    <div className="empty-state container">
      <h2>Welcome to Kanban-board!</h2>
      <p>This app is used for creating awesome Kanban to-do lists.</p>
      <p>
        You need{" "}
        <a
          href="/"
          onClick={(e) => {
            setLogged();
            e.preventDefault();
          }}
        >
          login to account
        </a>{" "}
        to use this app.
      </p>
    </div>
  );
}

export default EmptyState;
