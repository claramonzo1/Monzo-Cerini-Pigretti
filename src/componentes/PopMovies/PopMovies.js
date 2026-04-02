import React, { Component } from "react";
import {Link} from "react-router-dom";

class PopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: []
    };
  }

componentDidMount() {

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(url,options)
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
            this.state.peliculas.map((pelicula, idx) => (
              <Movie key={idx} datos={pelicula} history={this.props.history} />
            ))
          )}
        </section>
        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => this.props.history.push("/peliculas")}
        >
          Ver todas
        </button>
      </div>
    );
  }
}

export default PopMovies;

