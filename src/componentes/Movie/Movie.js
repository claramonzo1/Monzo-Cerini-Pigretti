import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      esFavorito: false
    };
  }

  componentDidMount() {
    let favoritosGuardados = localStorage.getItem("favoritos");
    let favoritos = [];

    if (favoritosGuardados !== null) {
      favoritos = JSON.parse(favoritosGuardados);
    }

    let encontrado = false;

    for (let i = 0; i < favoritos.length; i++) {
      if (
        favoritos[i].id === this.props.datos.id &&
        favoritos[i].tipo === "movie"
      ) {
        encontrado = true;
      }
    }

    this.setState({
      esFavorito: encontrado
    });
  }

  toggleDescripcion() {
    this.setState({
      verDescripcion: !this.state.verDescripcion
    });
  }

  agregarQuitarFavoritos() {
    let favoritosGuardados = localStorage.getItem("favoritos");
    let favoritos = [];

    if (favoritosGuardados !== null) {
      favoritos = JSON.parse(favoritosGuardados);
    }

    let encontrado = false;
    let filtrados = [];

    for (let i = 0; i < favoritos.length; i++) {
      if (
        favoritos[i].id === this.props.datos.id &&
        favoritos[i].tipo === "movie"
      ) {
        encontrado = true;
      }
    }

    if (encontrado) {
      filtrados = favoritos.filter(
        (unFav) =>
          !(unFav.id === this.props.datos.id && unFav.tipo === "movie")
      );

      localStorage.setItem("favoritos", JSON.stringify(filtrados));

      this.setState({
        esFavorito: false
      });
    } else {
      let nuevoFavorito = {
        id: this.props.datos.id,
        tipo: "movie",
        nombre: this.props.datos.title,
        imagen: this.props.datos.poster_path
      };

      favoritos.push(nuevoFavorito);

      localStorage.setItem("favoritos", JSON.stringify(favoritos));

      this.setState({
        esFavorito: true
      });
    }
  }

  render() {
    return (
      <article className="single-card-movie">
        <img
          src={`https://image.tmdb.org/t/p/w500${this.props.datos.poster_path}`}
          className="card-img-top"
          alt={this.props.datos.title}
        />

        <div className="cardBody">
          <h5 className="card-title">{this.props.datos.title}</h5>

          <button onClick={() => this.toggleDescripcion()}>
            {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
          </button>

          {this.state.verDescripcion ? (
            <p className="card-text">{this.props.datos.overview}</p>
          ) : null}

          <Link to={`/detalle/movie/${this.props.datos.id}`}>
            Ver más
          </Link>

          {cookies.get("user-auth-cookie") ? (
            <button
              className="btn alert-primary"
              onClick={() => this.agregarQuitarFavoritos()}
            >
              {this.state.esFavorito ? "❤️" : "🩶"}
            </button>
          ) : null}
        </div>
      </article>
    );
  }
}

export default Movie;