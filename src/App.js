import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";
import Peliculas from "./screens/Peliculas/Peliculas";

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
<<<<<<< HEAD
      <h1> Udesa Peliculas</h1>
=======
      <h1>UdeSA Movies</h1>
>>>>>>> ed49d52dd01b90f2984067ec3c336d79f85a3534
      <Navbar elementos={menu} />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Register} />
<<<<<<< HEAD
        <Route path="/detalle/:tipo/:id" component={Detalle} />
=======
        <Route path="/detalle/id/:id" component={Detalle} />
        <Route path="/peliculas" component={Peliculas} />
>>>>>>> ed49d52dd01b90f2984067ec3c336d79f85a3534
      </Switch>

      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
    </div>
  );
}

export default App;