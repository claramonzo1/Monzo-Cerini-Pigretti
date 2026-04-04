import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";

function App() {
  let menu = [
    {
      nombre: "AboutUs",
      Link: "/about"
    },
    {
      nombre: "Contacto",
      Link: "/contacto"
    },
    {
      nombre: "Personajes",
      Link: "/personajes"
    }
  ];

  return (
    <div className="App">
      <Navbar elementos={menu} />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Register} />
        <Route path="/detalle/:tipo/:id" component={Detalle} />
      </Switch>

      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
    </div>
  );
}

export default App;