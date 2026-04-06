import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";

function App() {
let menu = [
  { nombre: "Home", Link: "/" },
  { nombre: "Películas", Link: "/peliculas" },
  { nombre: "Series", Link: "/series" },
  { nombre: "Favoritas", Link: "/favoritos" },
  { nombre: "Registro", Link: "/registro" },
  { nombre: "Login", Link: "/login" }
];

  return (
    <div className="App">
      <Navbar elementos={menu} />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Register} />
        <Route path="/detalle/id/:id" component={Detalle} />
      </Switch>

      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
    </div>
  );
}

export default App;