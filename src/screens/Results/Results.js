import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],
            cargando: true,
            mostrarDescripcion: {},
            favoritos: [],
            hayCookie: false
        };
    }

    componentDidMount() {
        let favoritosGuardados = localStorage.getItem("favoritos");
        if (favoritosGuardados !== null) {
            favoritosGuardados = JSON.parse(favoritosGuardados);
        } else {
            favoritosGuardados = [];
        }

        this.setState(
            {
                favoritos: favoritosGuardados,
                hayCookie: cookies.get("usuarioLogueado") !== undefined
            },
            () => this.buscarContenido()
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
            this.buscarContenido();
        }
        if (prevProps.match.params.tipo !== this.props.match.params.tipo) {
            this.buscarContenido();
        }
    }
    buscarContenido() {
        const tipo = this.props.match.params.tipo;
        const busqueda = this.props.match.params.busqueda;

        this.setState({ cargando: true });

        fetch(
            `https://api.themoviedb.org/3/search/${tipo}?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&query=${encodeURIComponent(busqueda)}`
        )
            .then(response => response.json())
            .then(data => this.setState({
                resultados: data.results,
                cargando: false
            }))
            .catch(error => console.log("El error fue: " + error));
    }

    verDescripcion(id) {
        let estadoActual = this.state.mostrarDescripcion;
        estadoActual[id] = !estadoActual[id];
        this.setState({
            mostrarDescripcion: estadoActual
        });
    }

    estaEnFavoritos(id) {
        let encontrado = this.state.favoritos.filter(fav => fav.id === id);
        return encontrado.length > 0;
    }

    agregarQuitarFavoritos(item) {
        let favoritosActuales = this.state.favoritos;

        if (this.estaEnFavoritos(item.id)) {
            let filtrados = favoritosActuales.filter(unFav => unFav.id !== item.id);
            localStorage.setItem("favoritos", JSON.stringify(filtrados));
            this.setState({ favoritos: filtrados });
        } else {
            let favoritoNuevo = {
                id: item.id,
                tipo: this.props.match.params.tipo,
                nombre: item.title ? item.title : item.name,
                imagen: item.poster_path,
                descripcion: item.overview
            };
            favoritosActuales.push(favoritoNuevo);
            localStorage.setItem("favoritos", JSON.stringify(favoritosActuales));
            this.setState({ favoritos: favoritosActuales });
        }
    }
    render() {
        const tipo = this.props.match.params.tipo;
        const busqueda = this.props.match.params.busqueda;

        return (
            <div className="container">
                <h1>Udesa Movies</h1>
                <Navbar />
                <h2>
                    Resultados de {tipo === "movie" ? "películas" : "series"} para: {busqueda}
                </h2>

                {this.state.cargando ? <p>Cargando...</p> : null}

                {this.state.cargando === false ? (
                    this.state.resultados.length === 0 ? (
                        <p>No se encontraron resultados.</p>
                    ) : null
                ) : null}
                <section className="row">
                    {this.state.resultados.map((item, idx) => (
                        <article className="col-3" key={item.id + idx}>
                            {item.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                                    alt={item.title ? item.title : item.name}
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                <p>Sin imagen</p>
                            )}

                            <h4>{item.title ? item.title : item.name}</h4>

                            <button className="btn btn-primary btn-sm" onClick={() => this.verDescripcion(item.id)}>
                                {this.state.mostrarDescripcion[item.id] ? "Ocultar descripción" : "Ver descripción"}
                            </button>

                            {this.state.mostrarDescripcion[item.id] ? (
                                <p>{item.overview}</p>
                            ) : null}

                            <Link className="btn btn-secondary btn-sm" to={`/detalle/${tipo}/${item.id}`}>
                                Ir a detalle
                            </Link>

                            {this.state.hayCookie ? (
                                <button className="btn btn-warning btn-sm" onClick={() => this.agregarQuitarFavoritos(item)}>
                                    {this.estaEnFavoritos(item.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                                </button>
                            ) : null}
                        </article>
                    ))}
                </section>
            </div>
        );
    }
}

export default Results;