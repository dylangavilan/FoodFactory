const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should work when its a valid name", () => {
        Recipe.create({ name: "Milanesa a la napolitana" });
      });
    });
  });
});
describe("Recipes", () => {
  describe("create", () => {
    it("Debe crear una receta y retornarla", async function () {
      try {
        await Recipe.create({
          title: "Fideos con tuco",
          image:
            "https://img-global.cpcdn.com/recipes/5830b03c00623e30/400x400cq70/photo.jpg",
          healthScore: 60,
          summary:
            "El Tuco Tallarini Sibarita es un sazonador 100% completo y natural porque contiene la combinación exacta de hongos, laurel, ajos, cebolla, tomate, sal y especias que le dan un gran color y sabor a sus comidas.",
        });
        const response = await Recipe.findOne({
          where: {
            title: "Fideos con tuco",
            image:
              "https://img-global.cpcdn.com/recipes/5830b03c00623e30/400x400cq70/photo.jpg",
            healthScore: 60,
            summary:
              "El Tuco Tallarini Sibarita es un sazonador 100% completo y natural porque contiene la combinación exacta de hongos, laurel, ajos, cebolla, tomate, sal y especias que le dan un gran color y sabor a sus comidas.",
          },
        });
        expect(response.dataValues.title).to.eql("Fideos con tuco");
        expect(response.dataValues.image).to.eql(
          "https://img-global.cpcdn.com/recipes/5830b03c00623e30/400x400cq70/photo.jpg"
        );
        expect(response.dataValues.healthScore).to.eql("60");
        expect(response.dataValues.summary).to.eql(
          "El Tuco Tallarini Sibarita es un sazonador 100% completo y natural porque contiene la combinación exacta de hongos, laurel, ajos, cebolla, tomate, sal y especias que le dan un gran color y sabor a sus comidas."
        );
      } catch (error) {
        console.log(error);
      }
    });
    it("Debe devolver las actividades", async function () {
      try {
        const res = await Recipe.findAll({});
        expect(res).to.be.greaterThan(0);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
