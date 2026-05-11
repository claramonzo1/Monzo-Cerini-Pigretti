import { useState, useEffect } from "react";
import Serie from "../Serie/Serie";

function PopTv(props) {

    const [series, setSeries] = useState([]);
    const [verTodas, setVerTodas] = useState(false);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1944c47872d6439a6a7d6a987a1991ac")
            .then(response => response.json())
            .then(data => setSeries(data.results))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2 className="alert alert-warning">Popular TV shows this week</h2>
            <section className="row cards" id="popular-tv">
                {series.length === 0 ? (
                    <p>Cargando...</p>
                ) : (
                    series
                        .filter((serie, idx) => verTodas ? true : idx < 4)
                        .map((serie, idx) => (
                            <Serie key={idx} datos={serie} />
                        ))
                )}
            </section>
            <button type="button" className="btn btn-outline-primary mb-3" onClick={() => setVerTodas(!verTodas)}>
                {verTodas ? "Ver menos" : "Ver todas"}
            </button>
        </div>
    );
}

export default PopTv;