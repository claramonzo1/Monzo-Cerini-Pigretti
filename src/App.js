import React from "react";
import Register from "./componentes/Register/Register";
import Navbar from "./componentes/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";

function App() {
  let menu =[
    {
      nombre: "AboutUs",
      Link: "/about"
    }
    {
      nombre: "Contacto",
      Link: "/contacto"
    }
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
        <Route path="/about" component={AboutUs} />
      </Switch>

      <Register />
      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
    </div>
  );
}

export default App;