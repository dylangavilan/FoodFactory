import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { findById, restartInfo } from "../../action";
import "./detail.css";
import Loading from "../loading/loading";
export default function Detail() {
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipesById);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findById(id));
    return () => {
      dispatch(restartInfo());
    };
  }, [dispatch, id]);
  console.log(recipe);
  return Object.keys(recipe).length ? (
    <div className="all">
      <div className="body-detail">
        <div className="body-title-img">
          <div>
            <h2 className="recipe-title">{recipe.title}</h2>
          </div>

          <div className="img-detail">
            <img
              src={recipe.image ? recipe.image : null}
              alt="receta"
              className="recipe-image"
            ></img>
            <div className="healtscore-detail">
              HealthScore:{recipe.healthScore}
            </div>
          </div>
        </div>
        <div className="container-diets-info">
          <h4>Diets</h4>
          {recipe.diets &&
            recipe.diets.map((c, i) => {
              if (typeof c === "object") {
                return (
                  <span className="span-diet" key={c.name}>
                    {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                  </span>
                );
              }
              return (
                <span className="span-diet" key={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </span>
              );
            })}
        </div>
        <div>
          <h4>INGREDIENTS</h4>
          {recipe.extendedIngredients &&
            recipe.extendedIngredients.map((c) => {
              return <span key={c.name}>{c.name.capitalize()}</span>;
            })}
        </div>
        <div className="detail-diet-steps">
          <div className="body-recipe-summary">
            <h3 className="steps-title">Summary</h3>
            <div
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
              className="recipe-summary"
            ></div>
          </div>
          <div className="steps-detail">
            <h3 className="steps-title">Steps</h3>
            <div>
              <div className="detail-body-steps">
                {recipe.analyzedInstructions &&
                  recipe.analyzedInstructions.map((el, i) =>
                    el.steps.map((steps) => {
                      return <span key={steps.number}>{steps.step}</span>;
                    })
                  )}
                {recipe.steps &&
                  recipe.steps.map((c) => {
                    return <div key={c}>{c}</div>;
                  })}
              </div>
            </div>
          </div>
          {/* <div className="diets-detail">
            <h3>Diets</h3> */}
          {/* {recipe.diets &&
              recipe.diets.map((c, i) => {
                if (typeof c === "object") {
                  return (
                    <div>
                      <span key={c.name}>
                        {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                      </span>
                    </div>
                  );
                }
                return (
                  <div>
                    <span key={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </span>
                  </div>
                );
              })}
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <Loading> </Loading>
  );
}
