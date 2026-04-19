import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false
    };
  }

  componentDidMount() {
    let favoritosGuardados = localStorage.getItem("favoritos");

    
    let favoritos = favoritosGuardados !== null ? JSON.parse(favoritosGuardados) : [];

    let idPelicula = this.props.datos.id;

    
    let coincidentes = favoritos.filter(function(fav) {
      if (fav.id === idPelicula) {
        if (fav.tipo === "movie") {
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
      
      let idPelicula = this.props.datos.id;

      let filtrados = favoritos.filter(function(fav) {
        if (fav.id === idPelicula) {
          if (fav.tipo === "movie") {
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
        tipo: "movie",
        nombre: this.props.datos.title,
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
          alt={this.props.datos.title}
        />

        <div className="cardBody">
          <h5 className="card-title">{this.props.datos.title}</h5>

          <p className="card-text">{this.props.datos.overview}</p>

          <Link className="btn btn-primary" to={`/detalle/movie/${this.props.datos.id}`}>
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