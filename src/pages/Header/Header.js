import React from "react";
import "./Header.css";

function Header({ setAll, setActive, setCompleted }) {
  const handleTabAll = () => {
    setAll(true);
    setActive(false);
    setCompleted(false);
  };
  const handleTabActive = () => {
    setAll(false);
    setActive(true);
    setCompleted(false);
  };
  const handleTabCompleted = () => {
    setAll(false);
    setActive(false);
    setCompleted(true);
  };
  return (
    <div className="header">
      <h2 className="header-title">#todo</h2>
      <div className="navigation">
        <ul className="list-menu">
          <li className="item-menu active" onClick={handleTabAll}>
            All
          </li>
          <li className="item-menu" onClick={handleTabActive}>
            Active
          </li>
          <li className="item-menu" onClick={handleTabCompleted}>
            Completed
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
