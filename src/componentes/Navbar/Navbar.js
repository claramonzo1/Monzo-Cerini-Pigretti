import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar() {
  let logueado = cookies.get("user-auth-cookie");

  let menu = [
    { nombre: "Home", Link: "/" },
    { nombre: "Movies", Link: "/movies" },
    { nombre: "Series", Link: "/series" },
    { nombre: "Favoritas", Link: "/favoritos" },
    { nombre: "Registro", Link: "/registro" },
    { nombre: "Login", Link: "/login" }
  ];

  return (
    <nav>
      <ul className="nav nav-tabs my-4">
        {menu.map((elemento, idx) => {
          if (elemento.nombre === "Favoritas" && !logueado) {
            return null;
          }

          if (elemento.nombre === "Login" && logueado) {
            return null;
          }

          if (elemento.nombre === "Registro" && logueado) {
            return null;
          }

          return (
            <li key={elemento.nombre + idx} className="nav-item">
              <Link className="nav-link" to={elemento.Link}>
                {elemento.nombre}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;