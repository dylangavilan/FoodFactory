import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./form.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allDiets } from "../../action";
export function validate(input) {
  let error = {};
  if (!input.title) {
    error.title = "Title is required";
  }
  if (!input.image) {
    error.image = "Image is required";
  }
  if (input.diets.length === 0) {
    error.diets = "Diets is required";
  }
  if (input.dishType.length === 0) {
    error.dishType = "dishTypes is required";
  }
  return error;
}
export default function Form() {
  let history = useHistory();
  const dietas = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allDiets());
  }, [dispatch]);
  const [input, setInput] = useState({
    recipe: "",
    summary: "",
    image: "",
    diets: [],
    healthScore: 0,
    spoonacularScore: 0,
    dishType: [],
    steps: [],
  });

  const [error, setError] = useState({});
  function addRecipe(e) {
    e.preventDefault();
    let find = input.diets.find((c) => c === e.target.value);
    if (!find) {
      setInput(() => {
        return {
          ...input,
          diets: [...input.diets, e.target.value],
        };
      });
    }
  }
  function onInputChange(e) {
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  // function dishTypeChange(e) {
  //   setInput((previous) => {
  //     return {
  //       ...previous,
  //       dishType: [...previous, e.target.value],
  //     };
  //   });
  // }
  function addOther() {
    setInput({ ...input, diets: [...input.diets, ""] });
  }
  function addOtherInput() {
    setInput({ ...input, steps: [...input.steps, ""] });
  }
  function handleText(e, i) {
    let step = [...input.steps];
    step[i] = e.target.value;
    setInput((prevState) => {
      return {
        ...prevState,
        steps: step,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (input.diets.length < 1 || !input.image) {
      return alert("faltan parametros");
    }
    await axios.post("http://localhost:3001/api/recetas", input);
    history.push("/home");
    alert("Recipe created");
  }
  return (
    <div className="form-total">
      <div className="body-form">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="body-input">
            <div className="container-form-title">
              <h3>
                <b>Title</b>
              </h3>
              <input
                autoComplete="off"
                className="form-title"
                type="text"
                name="title"
                onChange={onInputChange}
                value={input.title}
              />
              {error.title && <p className="danger">{error.title}</p>}
            </div>
            <div className="container-form-title">
              <h3>
                <b>Summary</b>
              </h3>
              <input
                autoComplete="off"
                type="text"
                className="form-title"
                name="summary"
                onChange={onInputChange}
                value={input.summary}
              />
            </div>
            <div className="container-form-title">
              <h3>
                <b>Image</b>
              </h3>
              <input
                autoComplete="off"
                className="form-title"
                type="text"
                name="image"
                onChange={onInputChange}
                value={input.image}
              />
              {error.image && <p className="danger">{error.image}</p>}
            </div>

            <div className="container-form-title">
              <h3>
                <b>healthScore</b>
              </h3>
              <input
                autoComplete="off"
                type="number"
                name="healthScore"
                className="form-title"
                onChange={onInputChange}
                value={input.healthScore}
              />
            </div>
            <div className="container-form-title">
              <h3>
                <b>Score</b>
              </h3>
              <input
                autoComplete="off"
                type="number"
                name="spoonacularScore"
                className="form-title"
                onChange={onInputChange}
                value={input.spoonacularScore}
              />
            </div>
            <div>
              {input.steps &&
                input.steps.map((el, i) => {
                  return (
                    <span key={i}>
                      <input
                        type="text"
                        className="input-steps-form"
                        onChange={(e) => {
                          handleText(e, i);
                        }}
                      />
                    </span>
                  );
                })}
              <button
                type="button"
                className="button-form"
                onClick={() => {
                  addOtherInput();
                }}
              >
                Add steps
              </button>
            </div>
            <div className="container-select-diets">
              {input.diets &&
                input.diets.map((el, i) => {
                  if (i < 5) {
                    return (
                      <div>
                        <select
                          className="select-diets-form"
                          onChange={(e) => {
                            addRecipe(e);
                          }}
                        >
                          <option value="recipes" disabled selected>
                            Diet
                          </option>
                          {dietas.map((c) => {
                            return (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  } else {
                    return "";
                  }
                })}
              {input.diets.length < 5 ? (
                <button
                  type="button"
                  className="button-form"
                  onClick={() => {
                    addOther();
                  }}
                >
                  Add diets
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <button type="submit" className="button-submit-form">
            Submit recipe
          </button>
        </form>
      </div>
    </div>
  );
}
