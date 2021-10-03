import React from "react";
import "./paginate.css";
export default function Paginado({
  recipesPage,
  allRecipes,
  paginado,
  currentPage,
}) {
  let pagina = [];
  for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPage); i++) {
    pagina.push(i);
  }
  return (
    <nav className="nav-paginate">
      {currentPage > 1 ? (
        <button onClick={() => paginado(currentPage - 1)}>{"<"}</button>
      ) : (
        ""
      )}
      {pagina &&
        pagina.map((c) => {
          return (
            <button
              key={c}
              className={
                c === currentPage
                  ? "current-paginate-button"
                  : "paginate-button"
              }
              onClick={() => paginado(c)}
            >
              {c}
            </button>
          );
        })}
      {currentPage < pagina.length ? (
        <button onClick={() => paginado(currentPage + 1)}>{">"}</button>
      ) : (
        ""
      )}
    </nav>
  );
}
