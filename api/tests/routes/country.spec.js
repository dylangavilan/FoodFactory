/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("GET QUERY", () => {
    it("deberia retornar 200", () =>
      agent.get("/api/recetas?name=Madsadas").expect(200));
  });
  describe("GET ID", () => {
    it("deberia retornar 200", () =>
      agent.get("/api/recetas/716268").expect(200));
  });
});
