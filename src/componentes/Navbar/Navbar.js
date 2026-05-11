import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar(props) {

    const [usuarioLogueado, setUsuarioLogueado] = useState(cookies.get("usuarioLogueado"));

    const menu = [
        { Nombre: "Home", Path: "/" },
        { Nombre: "Movies", Path: "/movies" },
        { Nombre: "Series", Path: "/series" },
        { Nombre: "Login", Path: "/login" },
        { Nombre: "Crear Cuenta", Path: "/registro" },
        { Nombre: "Favoritos", Path: "/favoritos" }
    ];

    return (
        <div>
            <nav>
                <ul className="nav nav-tabs my-4">
                    {menu.map((elemento, idx) =>
                        <li key={elemento.Nombre + idx}
                            className={
                                elemento.Nombre === "Login" ? (usuarioLogueado == null ? "show" : "hide")
                                : elemento.Nombre === "Crear Cuenta" ? (usuarioLogueado == null ? "show" : "hide")
                                : elemento.Nombre === "Favoritos" ? (usuarioLogueado != null ? "show" : "hide")
                                : "show"
                            }
                        >
                            <Link className="nav-link" to={elemento.Path}>{elemento.Nombre}</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;