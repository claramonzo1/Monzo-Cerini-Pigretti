import React, { Component } from "react";
import Navbar from "../../componentes/Navbar/Navbar";
import Serie from "../../componentes/Serie/Serie";

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            seriesFiltradas: [],
            pagina: 1,
            valor: " "
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=1")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    seriesFiltradas: data.results,
                    datos: data.results,
                    pagina: 2
                });
            })
            .catch(error => console.log(error));
    }
    cargarMas() {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=" + this.state.pagina)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    datos: this.state.datos.concat(data.results),
                    seriesFiltradas: this.state.seriesFiltradas.concat(data.results),
                    pagina: this.state.pagina + 1
                });
            })
            .catch(error => console.log(error));
    }
    evitarSubmit(event) {
        event.preventDefault();
    }

    controlCambios(event) {
        this.setState(
            { valor: event.target.value },
            () => this.filtrarSeries(this.state.valor)
        );
    }
    filtrarSeries(textoAFiltrar) {
        this.setState({
            seriesFiltradas: this.state.datos.filter((elm) =>
                elm.name.toLowerCase().includes(textoAFiltrar.toLowerCase())
            )
        });

    }

    render() {
        return (
            <div className="all-movies container">
                <h1>Udesa Movies</h1>

                <Navbar />
                <h2 className="alert alert-primary">Todas las series </h2>

                <form className="filter-form" onSubmit={(event) => this.evitarSubmit(event)}>
                    <label className="label-filtrar">
                        Buscar serie: </label> 
                    <input type="text" onChange={(event) => this.controlCambios(event)} />
                </form>

                {this.state.pagina < this.state.seriesFiltradas.length ?
                    <button onClick={() => this.cargarMas()} className="btn btn-info">
                        Cargar Más
                    </button>
                    : null
                }
                <section className="cards">
                    {this.state.seriesFiltradas.length == 0
                        ? <h3>Cargando...</h3>
                        : this.state.seriesFiltradas.map((elm, idx) => (
                            <Serie
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

export default Series;