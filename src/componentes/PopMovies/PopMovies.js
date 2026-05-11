import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";

function PopMovies(props) {

    const [peliculas, setPeliculas] = useState([]);
    const [verTodas, setVerTodas] = useState(false);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US")
            .then(response => response.json())
            .then(data => setPeliculas(data.results))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2 className="alert alert-primary">Popular movies this week</h2>

            <section className="row cards">
                {peliculas.length === 0 ? (
                    <p>Cargando...</p>
                ) : (
                    peliculas
                        .filter((pelicula, idx) => verTodas ? true : idx < 4)
                        .map((pelicula, idx) => (
                            <Movie key={idx} datos={pelicula} />
                        ))
                )}
            </section>

            <button type="button" className="btn btn-outline-primary mb-3" onClick={() => setVerTodas(!verTodas)}>
                {verTodas ? "Ver menos" : "Ver todas"}
            </button>
        </div>
    );
}

export default PopMovies;