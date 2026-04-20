import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { Component } from "react";

const cookies = new Cookies();

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            usuarioLogueado: cookies.get("usuarioLogueado"),
        }
    }

    ocultar(){
        this.setState({
            ocultar: !this.state.verMas
        })
    }


    render(){
       const menu = [
        { Nombre: "Home", Path: "/" },
        { Nombre: "Movies", Path: "/movies" },
        { Nombre: "Series", Path: "/series" },
        { Nombre: "Login", Path: "/login" },
        { Nombre: "Crear Cuenta", Path: "/registro" },
        { Nombre: "Favoritos", Path: "/favoritos" }
    ];
        return(
        <div>
            <nav>
            <ul className="nav nav-tabs my-4">
                {
                    menu.map((elemento, idx) => 
                    <li key={elemento + idx} className={ elemento.Nombre == "Login" ? (this.state.usuarioLogueado == null ? "show" : "hide")
                        : elemento.Nombre == "Crear Cuenta" ? (this.state.usuarioLogueado == null ? "show" : "hide")
                        : elemento.Nombre == "Favoritos" ? (this.state.usuarioLogueado != null ? "show" : "hide")
                        : "show"}
                    >
    <a className="nav-link"><Link to={elemento.Path}> {elemento.Nombre}</Link></a></li>) }
            </ul>
        </nav>
        </div>
    )
    }
}


export default Navbar;
