import React from "react"
import { Link } from "react-router-dom"

function Navbar(props) {
    return (
        <nav>
            <ul className="nav nav-tabs my-4">
               {props.elementos.map((elemento, idx) =>
                <li key={elemento + idx} className={
                    elemento.Nombre == "Login" ? (this.state.usuarioLogueado == null ? "show" : "hide")
                    :elemento.Nombre == "Crear Cuenta" ? (this.state.usuarioLogueado == null ? "show" : "hide")
                    : elemento.Nombre == "Favoritos" ? (this.state.usuarioLogueado != null ? "show" : "hide")
                    : "show"
                }>
                    <a className= "nav-link"> 
                        <Link to={elemento.Link}> {elemento.nombre}</Link>
                    </a>
                </li>
                )
                }
          </ul>
        </nav>
    )
  }


export default Navbar;     