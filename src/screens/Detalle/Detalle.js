import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";


const cookies = new Cookies();

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detalle: {},
            esFavorito: false
        };
    }

    componentDidMount() {
        this.cargarDetalle();
    }

    cargarDetalle() {
        const tipo = this.props.match.params.tipo;
        const id = this.props.match.params.id;

        fetch(
            `https://api.themoviedb.org/3/${tipo}/${id}?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US`
        )
            .then(response => response.json())
            .then(data => {
                let favoritosGuardados = localStorage.getItem("favoritos");
                let favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

                let filtrados = favoritos.filter(function (fav) {
                    if (fav.id === data.id) {
                        if (fav.tipo === tipo) {
                            return true;
                        }
                    }
                    else {return false};
                });

                let encontrado = filtrados.length > 0 ? true : false;

                this.setState({
                    detalle: data,
                    esFavorito: encontrado
                });
            })
            .catch(error => console.log("Error al cargar detalle: " + error));
    }


    agregarQuitarFavoritos() {
        const tipo = this.props.match.params.tipo;
        const detalle = this.state.detalle;

        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

        if (this.state.esFavorito) {
            let filtrados = favoritos.filter(function(fav) {
                if (fav.id === detalle.id) {
                    if (fav.tipo === tipo) {
                        return false;
                    }
                }
                return true;
            });
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            this.setState({ esFavorito: false });
        } else {
            let nuevoFavorito = {
                id: detalle.id,
                tipo: tipo,
                nombre: detalle.title | detalle.name,
                imagen: detalle.poster_path
            };
            favoritos.push(nuevoFavorito);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            this.setState({ esFavorito: true });
        }
    }

    render() {
        if (this.state.cargando) {
            return (
                <div className="container">
                    <h1>Udesa Movies</h1>
                    <Navbar />
                    <p>Cargando...</p>
                </div>
            );
        }

        const tipo = this.props.match.params.tipo;
        const detalle = this.state.detalle;
        const esPelicula = tipo === "movie";

        return (
            <div className="container">

                {detalle.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w342${detalle.poster_path}`}
                        alt={detalle.title || detalle.name}
                    />
                ) : (
                    <p>Sin imagen</p>
                )}

                <h2>{detalle.title || detalle.name}</h2>

                <p>⭐ Calificación: {detalle.vote_average}</p>

                <p>
                    📅 Fecha de estreno:{" "}
                    {esPelicula ? detalle.release_date : detalle.first_air_date}
                </p>

                {esPelicula && (
                    <p> Duración: {detalle.runtime} minutos</p>
                )}

                <p>📝 Sinópsis: {detalle.overview}</p>

                <p>
                    🎭 Géneros:{" "}
                    {detalle.genres && detalle.genres.length > 0
                        ? detalle.genres.map(g => g.name).join(", ")
                        : "Sin géneros"}
                </p>

                {cookies.get("user-auth-cookie") ? (
                    <button
                        className="btn alert-primary"
                        onClick={() => this.agregarQuitarFavoritos()}
                    >
                        {this.state.esFavorito ? "❤️ Quitar de favoritos" : "🩶 Agregar a favoritos"}
                    </button>
                ) : null}

            </div>
        );
    }
}

export default Detalle;

// ver de la linea 84 para abajo porque hay cposas q no vimos 