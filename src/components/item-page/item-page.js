import { Link } from "react-router-dom";
import xsign from "./xsign.png";
import "./item-page.css";

function ItemPage(props) {
  const { item, editTask } = props;

  const onChange = (e) => {
    editTask(e.target.value, e.target.name, item.id);
  };

  return (
    <div className="item-page container">
      <div className="item-page-wrap">
        <input
          className="item-page__name"
          name="name"
          defaultValue={item.name}
          onChange={onChange}
        />
        <textarea
          className="item-page__description"
          name="text"
          placeholder="Task's description"
          defaultValue={item.text}
          onChange={onChange}
        />

        <p className="item-page__date">Task was added {item.date}</p>
        <Link to="/">
          <img className="item-page__xsign" src={xsign} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default ItemPage;
