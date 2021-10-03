import React from "react";
import "./carta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  faStar,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { addFav, removeFav } from "../../action";
export default function Card({ title, image, diets, id, healthScore }) {
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favs);
  return (
    <div className="card">
      <div className="card-body">
        <div className="container-card-img">
          <img src={image} alt={title} className="card-img"></img>
        </div>
        <div className="container-title">
          <h1 className="card-title">{title}</h1>
        </div>
        <div className="container-diets">
          {diets &&
            diets.map((c, i) => {
              if (typeof c === "object") {
                if (i === 0)
                  return (
                    <span key={c.name}>
                      {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                    </span>
                  );
                return (
                  <span key={c.name}>
                    {"  -  " + c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                  </span>
                );
              }
              if (i === 0) {
                return (
                  <span key={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                );
              }
              return (
                <span key={c}>
                  {"  -  " + c.charAt(0).toUpperCase() + c.slice(1)}
                </span>
              );
            })}
          <FontAwesomeIcon
            className={favs.find((c) => c.id === id) ? "faFav" : "faStar"}
            icon={faStar}
            onClick={() => {
              favs.find((c) => c.id === id)
                ? dispatch(removeFav(id))
                : dispatch(addFav(id));
            }}
          />
        </div>
        <div className="container-health">
          {healthScore > 70 ? (
            <div>
              <FontAwesomeIcon icon={faHeart} />
              <span>{healthScore}</span>
            </div>
          ) : (
            <div>
              <FontAwesomeIcon icon={faHeartBroken} />
              <span>{healthScore}</span>
            </div>
          )}
        </div>
        <div className="container-card-botton">
          <Link to={`/home/info/${id}`}>
            <button className="card-button">View Recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
