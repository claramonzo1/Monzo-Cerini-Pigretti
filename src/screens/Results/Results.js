import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

function Results(props) {

    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarDescripcion, setMostrarDescripcion] = useState({});
    const [favoritos, setFavoritos] = useState([]);
    const [hayCookie, setHayCookie] = useState(false);

    const tipo = props.match.params.tipo;
    const busqueda = props.match.params.busqueda;

    useEffect(() => {
        let favoritosGuardados = localStorage.getItem("favoritos");
        if (favoritosGuardados !== null) {
            favoritosGuardados = JSON.parse(favoritosGuardados);
        } else {
            favoritosGuardados = [];
        }
        setFavoritos(favoritosGuardados);
        setHayCookie(cookies.get("usuarioLogueado") !== undefined);
    }, []);

    useEffect(() => {
        buscarContenido();
    }, [tipo, busqueda]);

    function buscarContenido() {
        setCargando(true);

        fetch(
            `https://api.themoviedb.org/3/search/${tipo}?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&query=${encodeURIComponent(busqueda)}`
        )
            .then(response => response.json())
            .then(data => {
                setResultados(data.results);
                setCargando(false);
            })
            .catch(error => console.log("El error fue: " + error));
    }

    function verDescripcion(id) {
        let estadoActual = { ...mostrarDescripcion };
        estadoActual[id] = !estadoActual[id];
        setMostrarDescripcion(estadoActual);
    }

    function estaEnFavoritos(id) {
        let encontrado = favoritos.filter(fav => fav.id === id);
        return encontrado.length > 0;
    }

    function agregarQuitarFavoritos(item) {
        let favoritosActuales = favoritos;

        if (estaEnFavoritos(item.id)) {
            let filtrados = favoritosActuales.filter(unFav => unFav.id !== item.id);
            localStorage.setItem("favoritos", JSON.stringify(filtrados));
            setFavoritos(filtrados);
        } else {
            let favoritoNuevo = {
                id: item.id,
                tipo: props.match.params.tipo,
                nombre: item.title ? item.title : item.name,
                imagen: item.poster_path,
                descripcion: item.overview
            };
            favoritosActuales.push(favoritoNuevo);
            localStorage.setItem("favoritos", JSON.stringify(favoritosActuales));
            setFavoritos([...favoritosActuales]);
        }
    }

    return (
        <div className="container">
            <h1>Udesa Movies</h1>
            <Navbar />
            <h2>
                Resultados de {tipo === "movie" ? "películas" : "series"} para: {busqueda}
            </h2>

            {cargando ? <p>Cargando...</p> : null}

            {cargando === false ? (
                resultados.length === 0 ? (
                    <p>No se encontraron resultados.</p>
                ) : null
            ) : null}

            <section className="row">
                {resultados.map((item, idx) => (
                    <article className="col-3" key={item.id + idx}>
                        {item.poster_path ? (
                            <img className="img-fluid"
                                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                                alt={item.title ? item.title : item.name}
                            />
                        ) : (
                            <p>Sin imagen</p>
                        )}

                        <h4>{item.title ? item.title : item.name}</h4>

                        <button className="btn btn-primary btn-sm" onClick={() => verDescripcion(item.id)}>
                            {mostrarDescripcion[item.id] ? "Ocultar descripción" : "Ver más"}
                        </button>

                        {mostrarDescripcion[item.id] ? (
                            <p>{item.overview}</p>
                        ) : null}

                        <Link className="btn btn-primary btn-sm" to={`/detalle/${tipo}/${item.id}`}>
                            detalle
                        </Link>

                        {hayCookie ? (
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => agregarQuitarFavoritos(item)}>
                                {estaEnFavoritos(item.id) ? "❤️" : "🩶"}
                            </button>
                        ) : null}
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Results;