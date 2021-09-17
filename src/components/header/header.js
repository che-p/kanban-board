import "./header.css";
import UserMenu from "./UserMenu/UserMenu.js";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header container">
      <Link className="header__link" to="/">
        <h1 className="header__logo">Awesome Kanban Board</h1>
      </Link>
      <UserMenu {...props} />
    </header>
  );
};

export default Header;
