import React, { Component } from "react";
import Movie from "../Movie/Movie";

class PopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      verTodas: false
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

        <section className="row cards" >
          {this.state.peliculas.length === 0 ? (
            <p>Cargando...</p>
          ) : (
            this.state.peliculas
              .filter((pelicula, idx) => this.state.verTodas ? true : idx < 4)
              .map((pelicula, idx) => (
                <Movie key={idx} datos={pelicula} />
              ))
          )}
        </section>

        <button type="button" className="btn btn-outline-primary mb-3" onClick={() => this.setState({ verTodas: !this.state.verTodas })}>
          {this.state.verTodas ? "Ver menos" : "Ver todas"}
        </button>
      </div>
    );
  }
}

export default PopMovies;