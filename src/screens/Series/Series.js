import { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar/Navbar";
import Serie from "../../componentes/Serie/Serie";

function Series(props) {

    const [datos, setDatos] = useState([]);
    const [seriesFiltradas, setSeriesFiltradas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [valor, setValor] = useState('');

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=1")
            .then(response => response.json())
            .then(data => {
                setSeriesFiltradas(data.results);
                setDatos(data.results);
                setPagina(2);
            })
            .catch(error => console.log("error"));
    }, []);

    function cargarMas() {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US&page=" + pagina)
            .then(response => response.json())
            .then(data => {
                setDatos(datos.concat(data.results));
                setSeriesFiltradas(seriesFiltradas.concat(data.results));
                setPagina(pagina + 1);
            })
            .catch(error => console.log("error"));
    }

    function evitarSubmit(event) {
        event.preventDefault();
    }

    function controlCambios(event) {
        let texto = event.target.value;
        setValor(texto);
        filtrarSeries(texto);
    }

    function filtrarSeries(textoAFiltrar) {
        setSeriesFiltradas(
            datos.filter((elm) =>
                elm.name.toLowerCase().includes(textoAFiltrar.toLowerCase())
            )
        );
    }

    return (
        <div className="all-movies container">
            <h1>Udesa Movies</h1>
            <Navbar />
            <h2 className="alert alert-primary">Todas las series</h2>

            <form className="filter-form" onSubmit={(event) => evitarSubmit(event)}>
                <label className="label-filtrar">Buscar serie: </label>
                <input type="text" placeholder="Buscar" onChange={(event) => controlCambios(event)} />
            </form>

            {pagina < seriesFiltradas.length ? (
                <button onClick={() => cargarMas()} className="btn btn-info">
                    Cargar Más
                </button>
            ) : null}

            <section className="cards">
                {seriesFiltradas.length === 0
                    ? <h3>Cargando...</h3>
                    : seriesFiltradas.map((elm, idx) => (
                        <Serie
                            key={idx}
                            datos={elm}
                        />
                    ))
                }
            </section>
        </div>
    );
}

export default Series;