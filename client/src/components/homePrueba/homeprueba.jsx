import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homeprueba.css";
import {
  getAll,
  allDiets,
  filterDiet,
  filterAsc,
  filterScore,
  filterDb,
} from "../../action";
import Card from "../card/card";
import Paginado from "../paginate/paginate";
import { Link } from "react-router-dom";
export default function HomePrueba() {
  const recetas = useSelector((state) => state.recipesPrueba);
  const dietas = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);
  const indexInicial = currentPage * recipesPage - recipesPage;
  const indexFinal = currentPage * recipesPage;
  const current = recetas.slice(indexInicial, indexFinal);
  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };
  useEffect(() => {
    dispatch(getAll());
    dispatch(allDiets());
  }, [dispatch]);
  function handleDb(e) {
    e.preventDefault();
    dispatch(filterDb(e.target.value));
    setCurrentPage(1);
    setOrder(`order${e.target.value}`);
  }
  function handleOrder(e) {
    e.preventDefault();
    dispatch(filterAsc(e.target.value));
    setCurrentPage(1);
    setOrder(`order${e.target.value},${order}`);
  }
  function handleScore(e) {
    e.preventDefault();
    dispatch(filterScore(e.target.value));
    setCurrentPage(1);
    setOrder(`order${e.target.value}`);
  }
  function handleFilterDiet(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDiet(e.target.value));
  }
  function handleRecipesPage(e) {
    e.preventDefault();
    setRecipesPage(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div
      className={current.length > 4 ? "container-home" : "container-home-dos"}
    >
      <div className="container-select">
        <select
          className="select-home"
          onChange={(e) => {
            handleRecipesPage(e);
          }}
        >
          <option value="recipes" disabled selected>
            Recipes per page
          </option>
          <option value="4">4</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>

        <div>
          <select
            className="select-home"
            onChange={(e) => {
              handleOrder(e);
            }}
          >
            {" "}
            <option value="recipes" disabled selected>
              Order
            </option>
            <option value="ASC">Asc</option>
            <option value="DES">Des</option>
          </select>
        </div>
        <div>
          <select
            className="select-home"
            onChange={(e) => {
              handleScore(e);
            }}
          >
            <option value="max">Max Healtscore</option>
            <option value="min">Min Healtscore</option>
          </select>
        </div>
        <div>
          <select
            className="select-home"
            onChange={(e) => {
              handleFilterDiet(e);
            }}
          >
            <option value="recipes" disabled selected>
              Type of diet
            </option>
            {dietas &&
              dietas.map((d) => {
                return (
                  <option key={d.id} value={d.name}>
                    {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <select
            name="select-home"
            className="select-home"
            onChange={(e) => {
              handleDb(e);
            }}
          >
            <option value="ALL">All</option>
            <option value="DATABASE">Created</option>
            <option value="API">Page</option>
          </select>
        </div>
        <div className="button-body-favs">
          <Link to="/home/favs">
            <button className="button-favs">
              <b>Favorites</b>
            </button>
          </Link>
        </div>
      </div>
      {current.length >= 1 ? (
        current.map((c) => {
          return (
            <Card
              healthScore={c.healthScore}
              key={c.id}
              title={c.title}
              image={c.image}
              diets={c.diets}
              summary={c.summary}
              id={c.id}
            />
          );
        })
      ) : (
        <h1>No recipes will be found</h1>
      )}
      <Paginado
        recipesPage={recipesPage}
        allRecipes={recetas}
        paginado={paginado}
        currentPage={currentPage}
      />
    </div>
  );
}
