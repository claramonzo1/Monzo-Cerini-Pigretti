import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Serie(props) {

    const [esFavorito, setEsFavorito] = useState(false);
    const [verDescripcion, setVerDescripcion] = useState(false);

    useEffect(() => {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

        let idSerie = props.datos.id;

        let coincidentes = favoritos.filter(function(fav) {
            if (fav.id === idSerie) {
                if (fav.tipo === "tv") {
                    return true;
                }
            }
            return false;
        });

        setEsFavorito(coincidentes.length > 0 ? true : false);
    }, []);

    function agregarQuitarFavoritos() {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

        if (esFavorito) {
            let idSerie = props.datos.id;

            let filtrados = favoritos.filter(function(fav) {
                if (fav.id === idSerie) {
                    if (fav.tipo === "tv") {
                        return false;
                    }
                }
                return true;
            });

            localStorage.setItem("favoritos", JSON.stringify(filtrados));
            setEsFavorito(false);

        } else {
            let nuevoFavorito = {
                id: props.datos.id,
                tipo: "tv",
                nombre: props.datos.name,
                imagen: props.datos.poster_path
            };

            favoritos.push(nuevoFavorito);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            setEsFavorito(true);
        }
    }

    return (
        <article className="single-card-movie">
            <img
                src={`https://image.tmdb.org/t/p/w500${props.datos.poster_path}`}
                className="card-img-top"
                alt={props.datos.name}
            />

            <div className="cardBody">
                <h5 className="card-title">{props.datos.name}</h5>

                {verDescripcion ? <p className="card-text">{props.datos.overview}</p> : null}

                <div className="d-flex gap-2 mt-2">
                    <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => setVerDescripcion(!verDescripcion)}
                    >
                        {verDescripcion ? "Ver menos" : "Ver más"}
                    </button>

                    <Link className="btn btn-primary btn-sm me-2" to={`/detalle/tv/${props.datos.id}`}>
                        detalle
                    </Link>

                    {cookies.get("usuarioLogueado") ? (
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => agregarQuitarFavoritos()}
                        >
                            {esFavorito ? "❤️" : "🩶"}
                        </button>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

export default Serie;