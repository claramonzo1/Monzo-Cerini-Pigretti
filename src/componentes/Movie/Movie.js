import React, { Component } from "react";
import { Link } from "react-router-dom";
import Peliculas from "../../screens/Peliculas/Peliculas";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false
    };
  }

  toggleDescripcion() {
    this.setState({
      verDescripcion: this.state.verDescripcion === false ? true : false
    });
  }

  render() {
    return (
      <article className="single-card-movie">
        <img
<<<<<<< HEAD
          src="{https://image.tmdb.org/t/p/w500${this.props.datos.poster_path}"
=======
          src={`https://image.tmdb.org/t/p/w342${this.props.datos.poster_path}`}
>>>>>>> ed49d52dd01b90f2984067ec3c336d79f85a3534
          className="card-img-top"
          alt={this.props.datos.title}
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.datos.title}</h5>

          <button onClick={() => this.toggleDescripcion()}>
            {this.state.verDescripcion === false ? "Ver descripción" : "Ocultar descripción"}
          </button>

          {this.state.verDescripcion === true ? (
            <p className="card-text">{this.props.datos.overview}</p>
          ) : null}

          <Link
            className="btn btn-primary"
            to={`/detalle/movie/${this.props.datos.id}`}
          >
            Ver más
          </Link>

          <button className="btn alert-primary">🩶</button>
        </div>
      </article>
    );
  }
}

export default Movie;