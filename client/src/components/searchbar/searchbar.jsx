import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getQuery } from "../../action";
import "./searchbar.css";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getQuery(name));
  }
  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="inputsearch"
          type="text"
          placeholder="title"
          onChange={(e) => handleChange(e)}
        />
        <button className="search-button" type="Submit">
          <FontAwesomeIcon className="faSearch-icon" icon={faSearch} />
        </button>
      </form>
    </div>
  );
}
