import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";

function NowMovies(props) {

    const [peliculas, setPeliculas] = useState([]);
    const [verTodas, setVerTodas] = useState(false);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US")
            .then(response => response.json())
            .then(data => setPeliculas(data.results))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2 className="alert alert-primary">Movies now playing</h2>
            <section className="row cards" id="now-playing">
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

export default NowMovies;