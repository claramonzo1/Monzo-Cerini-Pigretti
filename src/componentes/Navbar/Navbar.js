import React from "react"
import { Link } from "react-router-dom"

<<<<<<< HEAD
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
             <li className="nav-item">
                <p className="nav-link usuario">UdeSA Movies</p>
                <img src="" alt="" />
            </li>
          </ul>
        </nav>
    )
  }
=======
function Navbar(props){
  return(
    <nav className="nav">
      <ul className="nav">
        {props.elementos.map((unMenu, idx) => (
          <li key={idx} className="nav-item">
            <Link className="nav-link" to={unMenu.Link}>{unMenu.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
>>>>>>> ed49d52dd01b90f2984067ec3c336d79f85a3534


export default Navbar;     