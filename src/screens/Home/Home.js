import { useState } from "react";
import PopMovies from "../../componentes/PopMovies/PopMovies";
import NowMovies from "../../componentes/NowMovies/NowMovies";
import PopTv from "../../componentes/PopTv/PopTv";
import AiringTv from "../../componentes/AiringTV/AiringTv";
import Navbar from "../../componentes/Navbar/Navbar";

function Home(props) {

    const [busqueda, setBusqueda] = useState('');
    const [tipo, setTipo] = useState('movie');

    function controlarCambios(event) {
        setBusqueda(event.target.value);
    }

    function controlarTipo(event) {
        setTipo(event.target.value);
    }

    function enviarBusqueda(event) {
        event.preventDefault();
        if (busqueda !== '') {
            props.history.push('/resultado/' + tipo + '/' + busqueda);
        }
    }

    return (
        <div className="container">
            <h1>Udesa Movies</h1>
            <Navbar />

            <form className="search-form d-flex gap-2" onSubmit={(event) => enviarBusqueda(event)}>
                <input
                    type="text"
                    placeholder="Buscar"
                    onChange={(event) => controlarCambios(event)}
                />

                <select value={tipo} onChange={(event) => controlarTipo(event)}>
                    <option value="movie">Películas</option>
                    <option value="tv">Series</option>
                </select>

                <button className="btn btn-primary btn-sm" type="submit">Buscar</button>
            </form>

            <PopMovies />
            <NowMovies />
            <PopTv />
            <AiringTv />
        </div>
    );
}

export default Home;