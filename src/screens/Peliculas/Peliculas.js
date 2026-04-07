import React, { Component } from "react";
class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            pagina: 1,
            filtro: ""
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=1")
            .then(response => response.json())
            .then(data => this.setState(
                { peliculas: data.results }
            ))
            .catch(error => console.log("El error fue: " + error));
    }

    controlarCambios(event) {
        this.setState({
            filtro: event.target.value
        });
    }

    cargarMas() {
        let numeroPagina = this.state.pagina + 1;

        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=" + numeroPagina)
            .then(response => response.json())
            .then(data => this.setState({
                peliculas: this.state.peliculas.concat(data.results),
                pagina: numeroPagina
            }))
            .catch(error => console.log("El error fue: " + error));
    }

    render() {
        let peliculasFiltradas = this.state.peliculas.filter(pelicula =>
            pelicula.title.toLowerCase().includes(this.state.filtro.toLowerCase())
        );

        return (
            <section className="all-movies">
                <h2>Todas las películas</h2>

                <form className="filter-form">
                    <input
                        type="text"
                        placeholder="Filtrar películas"
                        value={this.state.filtro}
                        onChange={(event) => this.controlarCambios(event)}
                    />
                </form>

                {
                    this.state.peliculas.length === 0 ?
                    <h3>Cargando...</h3>
                    :
                    <section className="cards">
                        {peliculasFiltradas.map(pelicula =>
                            <article className="single-card-movie" key={pelicula.id}>
                                <img
                                    src={"https://image.tmdb.org/t/p/w342" + pelicula.poster_path}
                                    alt={pelicula.title}
                                />
                                <div className="cardBody">
                                    <h3>{pelicula.title}</h3>
                                </div>
                            </article>
                        )}
                    </section>
                }

                <button onClick={() => this.cargarMas()}>Cargar más</button>
            </section>
        );
    }
}

export default Peliculas;