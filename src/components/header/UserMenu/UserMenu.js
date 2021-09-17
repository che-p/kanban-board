import { useState } from "react";
import userAvatar from "./user-avatar.png";
import arrowDown from "./arrow-down.png";
import "./UserMenu.css";

const UserMenu = (props) => {
  const { isLogged, setLogged } = props;
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);
  };

  return (
    <div className="user-menu" onClick={handleClick}>
      <div className="user-menu__pic-and-arrow">
        <img className="user-menu__useravatar" src={userAvatar} alt="" />
        <img
          className={
            isClicked
              ? "user-menu__arrow user-menu__arrow_rotated"
              : "user-menu__arrow"
          }
          src={arrowDown}
          alt="Dropdown arrow"
        />
      </div>
      {isClicked && (
        <>
          <div className="user-menu__dropdown-little-arrow" />

          <ul className="user-menu__dropdown">
            <li className="user-menu__dropdown-item">My Profile</li>
            <li className="user-menu__dropdown-item">My Tasks</li>
            <li className="user-menu__dropdown-item" onClick={setLogged}>
              {isLogged ? "Log out" : "Log in"}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default UserMenu;
