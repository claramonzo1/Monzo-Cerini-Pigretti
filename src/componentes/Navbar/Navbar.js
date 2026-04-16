import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar(props) {
  let logueado = cookies.get("user-auth-cookie");

  function logout() {
    cookies.remove("user-auth-cookie");
    props.history.push("/");
  }

  return (
    <nav>
      <ul className="nav nav-tabs my-4">
        {props.elementos.map((elemento, idx) => {
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

        {logueado ? (
          <li className="nav-item">
            <button className="nav-link" onClick={logout}>
              Cerrar sesión
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);