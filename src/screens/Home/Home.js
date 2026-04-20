import React, { Component } from "react";
import PopMovies from "../../componentes/PopMovies/PopMovies";
import NowMovies from "../../componentes/NowMovies/NowMovies";
import PopTv from "../../componentes/PopTv/PopTv";
import AiringTv from "../../componentes/AiringTV/AiringTv";
import Navbar from "../../componentes/Navbar/Navbar";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            busqueda: '',
            tipo: 'movie'
        };
    }

    controlarCambios(event){
        this.setState({
            busqueda: event.target.value
        });
    }

    controlarTipo(event){
        this.setState({
            tipo: event.target.value
        });
    }

    enviarBusqueda(event){
        event.preventDefault();

        if(this.state.busqueda.trim() !== ''){
            this.props.history.push(
                "/resultado/" + this.state.tipo + "/" + this.state.busqueda
            );
        }
    }
render(){
        const menu = [
            { Nombre: "Login", Path: "/login" },
            { Nombre: "Crear Cuenta", Path: "/registro" },
            { Nombre: "Favoritos", Path: "/favoritos" },
            { Nombre: "Movies", Path: "/movies" },
            { Nombre: "Series", Path: "/series" }
        ];

        return(
            <div className="container">
                <h1>Udesa Movies</h1>
                <Navbar menu={menu} />

                <form className="search-form" onSubmit={(event) => this.enviarBusqueda(event)}>
                    <input type="text" placeholder="Buscar" onChange={(event) => this.controlarCambios(event)} />
                    <input type="submit" value="Submit" />
                </form>

                <PopMovies />
                <NowMovies />
                <PopTv />
                <AiringTv />
            </div>
        );
    } 
} 

export default Home;