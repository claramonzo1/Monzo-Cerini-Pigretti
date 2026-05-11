import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar/Navbar";

function Favoritos(props) {

    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritosParseados = [];

        if (favoritosGuardados !== null) {
            favoritosParseados = JSON.parse(favoritosGuardados);
        }

        setFavoritos(favoritosParseados);
    }, []);

    function eliminarFavorito(id) {
        let filtrados = favoritos.filter(unFav => unFav.id !== id);
        localStorage.setItem("favoritos", JSON.stringify(filtrados));
        setFavoritos(filtrados);
    }

    let peliculasFavoritas = favoritos.filter(unFav => unFav.tipo === "movie");
    let seriesFavoritas = favoritos.filter(unFav => unFav.tipo === "tv");

    return (
        <div className="container">
            <h1>Udesa Movies</h1>
            <Navbar />

            <h2 className="alert alert-primary">Películas favoritas</h2>

            {peliculasFavoritas.length === 0 ? <p>No hay películas favoritas.</p> : null}

            <section className="row">
                {peliculasFavoritas.map((item, idx) => (
                    <article className="col-3 single-card-movie" key={item.id + idx}>
                        {item.imagen ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w342${item.imagen}`}
                                alt={item.nombre}
                            />
                        ) : (
                            <p>Sin imagen</p>
                        )}
                        <h5>{item.nombre}</h5>
                        <p>{item.descripcion}</p>
                        <Link to={`/detalle/movie/${item.id}`}>
                            <button className="btn btn-primary">Ver más</button>
                        </Link>
                        <button className="btn btn-outline-secondary" onClick={() => eliminarFavorito(item.id)}>
                            ❤️
                        </button>
                    </article>
                ))}
            </section>

            <h2 className="alert alert-primary">Series favoritas</h2>

            {seriesFavoritas.length === 0 ? <p>No hay series favoritas.</p> : null}

            <section className="row">
                {seriesFavoritas.map((item, idx) => (
                    <article className="col-3 single-card-movie" key={item.id + idx}>
                        {item.imagen ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w342${item.imagen}`}
                                alt={item.nombre}
                            />
                        ) : (
                            <p>Sin imagen</p>
                        )}
                        <h5>{item.nombre}</h5>
                        <p>{item.descripcion}</p>
                        <Link to={`/detalle/tv/${item.id}`}>
                            <button className="btn btn-primary">Ver más</button>
                        </Link>
                        <button className="btn btn-outline-secondary" onClick={() => eliminarFavorito(item.id)}>
                            ❤️
                        </button>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Favoritos;