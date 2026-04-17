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
        

            return(
                <div className="container">
                    <h1>Udesa Movies</h1>
                    <Navbar />
    
                <form className="search-form" onSubmit={(event) => this.enviarBusqueda(event)}>
                    <select
                        value={this.state.tipo}
                        onChange={(event) => this.controlarTipo(event)}
                    >
                        <option value="movie">Películas</option>
                        <option value="tv">Series</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={this.state.busqueda}
                        onChange={(event) => this.controlarCambios(event)}
                    />

                    <button type="submit" className="btn btn-success btn-sm">
                        Buscar
                    </button>
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