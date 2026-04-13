import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";
import Movies from "./screens/Movies/Movies";

function App() {
let menu = [
  { nombre: "Home", Link: "/" },
  { nombre: "Movies", Link: "/movies" },
  { nombre: "Series", Link: "/series" },
  { nombre: "Favoritas", Link: "/favoritos" },
  { nombre: "Registro", Link: "/registro" },
  { nombre: "Login", Link: "/login" }
];

  return (
    <div className="container">
      <h1> Udesa Movies </h1>
      <Navbar elementos={menu} />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Register} />
        <Route path="/detalle/:tipo/:id" component={Detalle} />
        <Route path="/movies" component={Movies} />
      </Switch>

      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
    </div>
  );
}

export default App;
