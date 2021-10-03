const initialState = {
  allRecipes: [],
  recipesPrueba: [],
  recipesById: [],
  diets: [],
  favs: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL": {
      return {
        ...state,
        recipesPrueba: action.payload,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    }
    case "GET_QUERY": {
      return {
        ...state,
        recipesPrueba: action.payload,
      };
    }
    case "GET_ID": {
      let response = action.payload;
      return {
        ...state,
        recipesById: response,
      };
    }
    case "RESTART_INFO": {
      return { ...state, recipesById: {} };
    }
    case "ALL_DIETS": {
      return { ...state, diets: action.payload };
    }
    case "TYPE_DIET": {
      const response = state.allRecipes;
      const responseDb = response.map((c) => {
        if (typeof c.diets[0] === "object") {
          return {
            ...c,
            diets: c.diets.map((r) => r.name),
          };
        }
        return c;
      });
      const filter = responseDb.filter((c) => c.diets.includes(action.payload));
      return {
        ...state,
        recipesPrueba: filter,
      };
    }
    case "FILTER_ASC":
      let sort = [];
      console.log(action.payload, "REDUCER");
      if (action.payload.toUpperCase() === "ASC") {
        sort = state.recipesPrueba.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload.toUpperCase() === "DES") {
        sort = state.recipesPrueba.sort(function (a, b) {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        recipesPrueba: sort,
      };
    case "FILTER_SCORE": {
      let sort = [];
      if (action.payload.toUpperCase() === "MAX") {
        sort = state.allRecipes.sort(function (a, b) {
          if (a.healthScore < b.healthScore) {
            return 1;
          }
          if (a.healthScore > b.healthScore) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload.toUpperCase() === "MIN") {
        sort = state.allRecipes.sort(function (a, b) {
          if (a.healthScore < b.healthScore) {
            return -1;
          }
          if (a.healthScore > b.healthScore) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        recipesPrueba: sort,
      };
    }
    case "FILTER_DB": {
      let filtrado = state.allRecipes;
      console.log(action.payload);
      const filter =
        action.payload === "DATABASE"
          ? filtrado.filter((c) => c.hasOwnProperty("updatedAt"))
          : action.payload === "API"
          ? filtrado.filter((c) => !c.hasOwnProperty("updatedAt"))
          : filtrado;
      return {
        ...state,
        recipesPrueba: filter,
      };
    }
    case "ADD_FAV": {
      let filterFavs = state.allRecipes;
      let fav = filterFavs.find((c) => c.id === action.payload);
      return {
        ...state,
        favs: state.favs.concat(fav),
      };
    }
    case "REMOVE_FAV": {
      return {
        ...state,
        favs: state.favs.filter((m) => m.id !== action.payload),
      };
    }

    default: {
      return state;
    }
  }
}
