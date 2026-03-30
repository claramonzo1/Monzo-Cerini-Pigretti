import React from "react";
<<<<<<< HEAD
import Register from "./componentes/Register/Register";
import Navbar from "./componentes/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
=======
import Login from "./componentes/Login/Login";
>>>>>>> db708f01adb84d50315a5da26dffa7b341a2aec6

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
<<<<<<< HEAD
            <Navbar elementos={menu} />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={AboutUs} />
      </Switch>

      <Register />
      <footer>
        <p>Pigretti, Monzó y Cerini</p>
      </footer>
=======
      <Login />
>>>>>>> db708f01adb84d50315a5da26dffa7b341a2aec6
    </div>
  );
}

export default App;