import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar/Navbar";
import Movie from "../../componentes/Movie/Movie"

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            peliculasFiltradas: [],
            pagina: 1,
            valor: ""
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=1")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculasFiltradas: data.results,
                    datos: data.results,
                    pagina: 2
                });
            })
            .catch(error => console.log(" error"));
    }

    cargarMas() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=" + this.state.pagina)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculasFiltradas: this.state.peliculasFiltradas.concat(data.results),
                    pagina: this.state.pagina + 1
                });
            })
            .catch(error => console.log("error "));
    }
    evitarSubmit(event) {
        event.preventDefault();
    }
    controlCambios(event) {
        this.setState({
            valor: event.target.value
        }, () => this.filtrarPeliculas(this.state.valor)
        )
    }

    filtrarPeliculas(textoAFiltrar) {
    this.setState({
        peliculasFiltradas: this.state.datos.filter((elm) => 
            elm.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
        )
    })
}


    render() {
        return (
            <div className="all-movies container">
                <h1>Udesa Movies</h1>

                <Navbar />

                <h2 className="alert alert-primary">Todas las películas</h2>
            
                <form className="filter-form" onSubmit={(event) => this.evitarSubmit(event)}>
                    <label className="label-filtrar">
                        Buscar pelicula: </label> 
                    <input type="text" placeholder="Buscar" onChange={(event) => this.controlCambios(event)} />
                </form>
            
                {
                    this.state.pagina < this.state.peliculasFiltradas.length ?
                    <button onClick={()=> this.cargarMas()} className="btn btn-info">
                        Cargar Más
                    </button>
                    :
                    null
                }
                
                <section className="cards">
                    {
                        this.state.peliculasFiltradas.length === 0
                            ? <h3>Cargando...</h3>
                            : this.state.peliculasFiltradas.map((elm, idx) => (
                                <Movie
                                    key={idx}
                                    datos={elm}
                                />
                            ))
                    }
                </section>
            </div>
        );
    }
}

export default Movies;