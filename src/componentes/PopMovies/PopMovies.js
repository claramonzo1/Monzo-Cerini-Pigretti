import React, { Component } from "react";
import { Link } from "react-router-dom";
import Movie from "../Movie/Movie";

class PopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          peliculas: data.results
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Popular movies this week</h2>

        <section className="row cards" id="movies">
          {this.state.peliculas.length === 0 ? (
            <p>Cargando...</p>
          ) : (
            this.state.peliculas
              .filter((pelicula, idx) => idx < 4)
              .map((pelicula, idx) => (
                <Movie key={idx} datos={pelicula} />
              ))
          )}
        </section>

        <Link className="btn btn-outline-primary mb-3" to="/peliculas">
          Ver todas
        </Link>
      </div>
    );
  }
}

export default PopMovies;