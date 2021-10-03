import React from "react";
import { useSelector } from "react-redux";
import Card from "../card/card";
export default function Favorites() {
  const favs = useSelector((state) => state.favs);

  return (
    <div>
      <h1>Favorites</h1>
      {favs &&
        favs.map((c) => {
          return (
            <Card
              key={c.id}
              title={c.title}
              image={c.image}
              diets={c.diets}
              summary={c.summary}
              id={c.id}
            />
          );
        })}
    </div>
  );
}
