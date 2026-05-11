import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

function Detalle(props) {

    const [detalle, setDetalle] = useState(null);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        let id = props.match.params.id;
        let tipo = props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US`)
            .then(response => response.json())
            .then(data => setDetalle(data))
            .catch(error => console.log(error));
    }, []);

    function agregarQuitarFavoritos() {
        setEsFavorito(!esFavorito);
    }

    if (detalle === null) {
        return <h3>Cargando ...</h3>
    }

    return (
        <div>
            <h1>Udesa Movies</h1>
            <Navbar />
            <h2 className="alert alert-primary">Detalle</h2>
            <section className="row">
                <article className="col-md-4">
                    <img
                        src={"https://image.tmdb.org/t/p/w342" + detalle.poster_path}
                        alt={detalle.title}
                        className="card-img-top"
                    />
                </article>
                <article className="col-md-8">
                    <h3>{detalle.title}</h3>
                    <p>Calificación: {detalle.vote_average}</p>
                    <p>Fecha de estreno: {detalle.release_date}</p>
                    <p>Duración: {detalle.runtime} minutos</p>
                    <p>Sinopsis: {detalle.overview}</p>
                    <p>Generos: {" "}{detalle.genres.map((genero, idx) => (<span key={idx}>{genero.name} </span>))}</p>

                    {cookies.get("usuarioLogueado") ? (
                        <button
                            className="btn alert-primary"
                            onClick={() => agregarQuitarFavoritos()}
                        >
                            {esFavorito ? "❤️" : "🩶"}
                        </button>
                    ) : null}
                </article>
            </section>
        </div>
    );
}

export default Detalle;