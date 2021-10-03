import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="div-landing">
      <div>
        <Link to="home">
          <button className="title-landing">Home</button>
        </Link>
      </div>
    </div>
  );
}
