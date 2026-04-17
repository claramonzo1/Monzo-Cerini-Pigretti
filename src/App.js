import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Movies from "./screens/Movies/Movies";
import Results from "./screens/Results/Results";
import Favoritos from "./screens/Favoritos/Favoritos";
import NotFound from "./screens/NotFound/NotFound";

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
      <h1>Udesa Movies</h1>
      <Navbar elementos={menu} />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Register} />
        <Route path="/detalle/:tipo/:id" component={Detalle} />
        <Route path="/movies" component={Movies} />
        <Route path="/resultado/:tipo/:busqueda" component={Results} />
        <Route path="/favoritos" component={Favoritos} />
        <Route component={NotFound} />
      </Switch>

      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
    </div>
  );
}

export default App;