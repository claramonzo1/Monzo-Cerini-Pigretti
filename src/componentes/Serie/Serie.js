import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Serie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false,
      verDescripcion: false
    };
  }

  componentDidMount() {
    let favoritosGuardados = localStorage.getItem("favoritos");

    let favoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

    let idSerie = this.props.datos.id;

    let coincidentes = favoritos.filter(function (fav) {
      if (fav.id === idSerie) {
        if (fav.tipo === "tv") {
          return true;
        }
      }
      return false;
    });

    this.setState({ esFavorito: coincidentes.length > 0 ? true : false });
  }

  agregarQuitarFavoritos() {
    let favoritosGuardados = localStorage.getItem("favoritos");

    let favoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

    if (this.state.esFavorito) {
      let idSerie = this.props.datos.id;

      let filtrados = favoritos.filter(function (fav) {
        if (fav.id === idSerie) {
          if (fav.tipo === "tv") {
            return false;
          }
        }
        return true;
      });

      localStorage.setItem("favoritos", JSON.stringify(filtrados));
      this.setState({ esFavorito: false });
    } else {
      let nuevoFavorito = {
        id: this.props.datos.id,
        tipo: "tv",
        nombre: this.props.datos.name,
        imagen: this.props.datos.poster_path
      };

      favoritos.push(nuevoFavorito);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      this.setState({ esFavorito: true });
    }
  }

  render() {
    return (
      <article className="single-card-movie">
        <img
          src={`https://image.tmdb.org/t/p/w500${this.props.datos.poster_path}`}
          className="card-img-top"
          alt={this.props.datos.name}
        />

        <div className="cardBody">
          <h5 className="card-title">{this.props.datos.name}</h5>

          {this.state.verDescripcion ? <p className="card-text">{this.props.datos.overview}</p> : null}

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => this.setState({ verDescripcion: !this.state.verDescripcion })}
            >
              {this.state.verDescripcion ? "Ver menos" : "Ver más"}
            </button>

            <Link className="btn btn-primary btn-sm me-2" to={`/detalle/tv/${this.props.datos.id}`}>
              detalle
            </Link>

            {cookies.get("usuarioLogueado") ? (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => this.agregarQuitarFavoritos()}
              >
                {this.state.esFavorito ? "❤️" : "🩶"}
              </button>
            ) : null}
          </div>
        </div>
      </article>
    );
  }
}

export default Serie;