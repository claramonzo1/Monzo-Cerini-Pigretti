import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

class Favoritos extends Component {
    constructor(props){
        super(props);
        this.state = {
            favoritos: []
        };
    }

    componentDidMount(){
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritosParseados = [];

        if(favoritosGuardados !== null){
            favoritosParseados = JSON.parse(favoritosGuardados);
        }

        this.setState({
            favoritos: favoritosParseados
        });
    }

    eliminarFavorito(id){
        let filtrados = this.state.favoritos.filter(unFav => unFav.id !== id);

        localStorage.setItem("favoritos", JSON.stringify(filtrados));

        this.setState({
            favoritos: filtrados
        });
    }

    render(){
        if(!cookies.get("user-auth-cookie")){
            return <Redirect to="/login" />;
        }

        let peliculasFavoritas = this.state.favoritos.filter(unFav => unFav.tipo === "movie");
        let seriesFavoritas = this.state.favoritos.filter(unFav => unFav.tipo === "tv");

        return(
            <div className="container">
            <h1>Udesa Movies</h1>
            <Navbar />
        
            <h2>Películas favoritas</h2>
                

                {peliculasFavoritas.length === 0 ? <p>No hay películas favoritas.</p> : null}

                <section className="row">
                    {peliculasFavoritas.map((item, idx) => (
                        <article className="col-3" key={item.id + idx}>
                            {item.imagen ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${item.imagen}`}
                                    alt={item.nombre}
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                <p>Sin imagen</p>
                            )}

                            <h4>{item.nombre}</h4>

                            <Link to={`/detalle/movie/${item.id}`}>Ir a detalle</Link>

                            <button onClick={() => this.eliminarFavorito(item.id)}>
                                Eliminar de favoritos
                            </button>
                        </article>
                    ))}
                </section>

                <h2>Series favoritas</h2>

                {seriesFavoritas.length === 0 ? <p>No hay series favoritas.</p> : null}

                <section className="row">
                    {seriesFavoritas.map((item, idx) => (
                        <article className="col-3" key={item.id + idx}>
                            {item.imagen ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${item.imagen}`}
                                    alt={item.nombre}
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                <p>Sin imagen</p>
                            )}

                            <h4>{item.nombre}</h4>

                            <Link to={`/detalle/tv/${item.id}`}>Ir a detalle</Link>

                            <button onClick={() => this.eliminarFavorito(item.id)}>
                                Eliminar de favoritos
                            </button>
                        </article>
                    ))}
                </section>
            </div>
        );
    }
}

export default Favoritos;