import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/landingPage/landing";
import Detail from "./components/info/detail";
import Nav from "./components/nav/nav";
import Form from "./components/formulario/form";
import HomePrueba from "./components/homePrueba/homeprueba";
import Favorites from "./components/favs/favs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/home" component={Nav} />
      <Route path="/form" component={Nav} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={HomePrueba} />
      <Route exact path="/home/info/:id" component={Detail} />
      <Route exact path="/home/favs" component={Favorites} />
    </div>
  );
}

export default App;
