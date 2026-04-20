import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detalle: null,
            esFavorito: false
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    detalle: data
                });
            })
            .catch(error => console.log(error));
    }

    agregarQuitarFavoritos() {
        this.setState({ esFavorito: !this.state.esFavorito });
    }

    render() {

        if (this.state.detalle === null) {
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
                            src={"https://image.tmdb.org/t/p/w342" + this.state.detalle.poster_path}
                            alt={this.state.detalle.title}
                            className="card-img-top"
                        />
                    </article>
                    <article className="col-md-8">
                        <h3>{this.state.detalle.title}</h3>
                        <p>Calificación: {this.state.detalle.vote_average}</p>
                        <p>Fecha de estreno: {this.state.detalle.release_date}</p>
                        <p>Duración: {this.state.detalle.runtime} minutos</p>
                        <p>Sinopsis: {this.state.detalle.overview}</p>
                        <p>Generos: {" "}{this.state.detalle.genres.map((genero, idx) => (<span key={idx}>{genero.name} </span>))}</p>

                        {cookies.get("user-auth-cookie") ? (
                            <button
                                className="btn alert-primary"
                                onClick={() => this.agregarQuitarFavoritos()}
                            >

                                {this.state.esFavorito ? "❤️" : "🩶"}
                            </button>
                        ) : null}
                    </article>
                </section>
            </div>
        );
    }
};

export default Detalle;