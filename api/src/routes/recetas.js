const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { response } = require("express");
const { DB_APIKEY } = process.env;
router.use(express.json());

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    const responseApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&number=100&addRecipeInformation=true`
    );
    const responseInfo = await responseApi.data.results.map((el) => {
      return {
        title: el.title,
        image: el.image,
        id: el.id,
        diets: el.diets,
        dishType: el.dishTypes,
        healthScore: el.healthScore,
        summary: el.summary,
        cuisines: el.cuisines,
        spoonacularScore: el.spoonacularScore,
      };
    });
    const responseDb = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const response = responseInfo.concat(responseDb);
    response.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    return res.status(200).send(response);
  }
  if (name) {
    const recipe = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let characters = await recipe.filter((c) =>
      c.title.toLowerCase().includes(name.toLowerCase())
    );
    const responseApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&number=100&addRecipeInformation=true `
    );
    const charactersApi = await responseApi.data.results.filter((c) =>
      c.title.toLowerCase().includes(name.toLowerCase())
    );
    let char = charactersApi.concat(characters);
    return res.status(200).send(char);
  }
});
// router.get("/order/:ordertype", async (req, res) => {
//   const { ordertype } = req.params;
//   const responseApi = await axios.get(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&number=100&addRecipeInformation=true `
//   );
//   const responseDb = await Recipe.findAll({
//     include: {
//       model: Diet,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   const response = responseApi.data.results.concat(responseDb);
//   if (ordertype === "AZ") {
//     response.sort(function (a, b) {
//       if (a.title < b.title) {
//         return -1;
//       }
//       if (a.title > b.title) {
//         return 1;
//       }
//       return 0;
//     });
//     res.send(response);
//   }
//   if (ordertype === "ZA") {
//     response.sort(function (a, b) {
//       if (b.title < a.title) {
//         return -1;
//       }
//       if (b.title > a.title) {
//         return 1;
//       }
//       return 0;
//     });
//     res.send(response);
//   }
// });
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length > 18) {
    const recipeInfo = await Recipe.findOne({
      where: {
        id: id,
      },
      include: [Diet],
    });
    return recipeInfo
      ? res.send(recipeInfo)
      : res.status(404).send("ID NO VALIDA");
  }
  if (id.length < 17) {
    const recipeInfo = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${DB_APIKEY}&addRecipeInformation=true`
    );
    const responseInfo = {
      title: recipeInfo.data.title,
      image: recipeInfo.data.image,
      id: recipeInfo.data.id,
      diets: recipeInfo.data.diets,
      dishType: recipeInfo.data.dishTypes,
      healthScore: recipeInfo.data.healthScore,
      summary: recipeInfo.data.summary,
      cuisines: recipeInfo.data.cuisines,
      extendedIngredients: recipeInfo.data.extendedIngredients,
      analyzedInstructions: recipeInfo.data.analyzedInstructions,
      spoonacularScore: recipeInfo.data.spoonacularScore,
    };
    return responseInfo
      ? res.status(200).send(responseInfo)
      : res.status(404).send("no se encontro la id");
  }
});
router.post("/", async (req, res) => {
  const {
    title,
    diets,
    dishType,
    image,
    summary,
    steps,
    healthScore,
    spoonacularScore,
  } = req.body;
  if (!title) {
    return res.status(404).send("ingrese title");
  }
  let recipeCreated = await Recipe.create({
    title,
    image,
    steps,
    dishType,
    summary,
    healthScore,
    spoonacularScore,
  });
  let dietsDB = await Diet.findAll({
    where: {
      name: diets,
    },
  });
  await recipeCreated.addDiet(dietsDB);
  const recipe = await Recipe.findAll();
  res.status(200).send(recipe);
});
// router.get("/diet/:diet", async (req, res) => {
//   const { diet } = req.params;
//   const recipes = await axios.get(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&number=100&addRecipeInformation=true`
//   );
//   const responseInfo = await recipes.data.results.map((el) => {
//     return {
//       title: el.title,
//       image: el.image,
//       id: el.id,
//       diets: el.diets,
//       dishType: el.dishTypes,
//       healthScore: el.healthScore,
//       summary: el.summary,
//       cuisines: el.cuisines,
//       spoonacularScore: el.spoonacularScore,
//     };
//   });
//   const filter = await responseInfo.filter((c) => c.diets.includes(diet));
//   const responseDb = await Recipe.findAll({
//     include: {
//       model: Diet,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });

//   res.send(responseDb.concat(filter));
// });

module.exports = router;
