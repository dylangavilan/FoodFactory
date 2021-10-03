import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import "./nav.css";
import SearchBar from "../searchbar/searchbar";
function Nav() {
  return (
    <div className="container-nav">
      <ul className="ul-nav">
        <Link to="/home">
          <li className="hamburger">
            <FontAwesomeIcon className="faHamburger" icon={faHamburger} />
          </li>
        </Link>
        <SearchBar />
        <Link to="/form">
          <button href="/form" className="li-nav">
            Create recipe
          </button>
        </Link>
      </ul>
    </div>
  );
}
export default Nav;
