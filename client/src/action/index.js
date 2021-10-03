import axios from "axios";

export function getAll() {
  return function (dispatch) {
    return axios.get("/api/recetas").then((res) => {
      const recipes = res.data;
      dispatch({ type: "GET_ALL", payload: recipes });
    });
  };
}
export function getQuery(name) {
  return function (dispatch) {
    return axios.get("/api/recetas?name=" + name).then((res) => {
      const recipes = res.data;
      dispatch({ type: "GET_QUERY", payload: recipes });
    });
  };
}
export function findById(id) {
  return function (dispatch) {
    return axios.get(`/api/recetas/${id}`).then((res) => {
      const recipes = res.data;
      dispatch({ type: "GET_ID", payload: recipes });
    });
  };
}
export function orderBy(order) {
  return {
    type: "ORDER_BY",
    payload: order,
  };
}
export function typeDiet(diet) {
  return {
    type: "TYPE_DIETS",
    payload: diet,
  };
}
export function restartInfo() {
  return {
    type: "RESTART_INFO",
  };
}
export function restartDiets() {
  return {
    type: "RESTART_RECIPES",
  };
}
export function allDiets() {
  return async function (dispatch) {
    const info = await axios.get(`/api/dietas`);
    dispatch({ type: "ALL_DIETS", payload: info.data });
  };
}
export function filterDiet(payload) {
  return {
    type: "TYPE_DIET",
    payload,
  };
}
export function filterAsc(payload) {
  return {
    type: "FILTER_ASC",
    payload,
  };
}
export function filterScore(payload) {
  return {
    type: "FILTER_SCORE",
    payload,
  };
}
export function filterDb(payload) {
  console.log(payload);
  return {
    type: "FILTER_DB",
    payload,
  };
}
export function addFav(payload) {
  return {
    type: "ADD_FAV",
    payload,
  };
}
export function removeFav(payload) {
  return {
    type: "REMOVE_FAV",
    payload,
  };
}
