import React, { Component } from "react";

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
      <section className="cardContainer">
        {this.state.peliculas.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          this.state.peliculas.map((pelicula, idx) => (
            <RMcard key={idx} datos={pelicula} />
          ))
        )}
      </section>
    );
  }
}

export default PopMovies; 

//ver linea 32 o 33 donde dice personaje capaz tiene q decir otra cosa ??