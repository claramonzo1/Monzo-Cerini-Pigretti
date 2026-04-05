import React, { Component } from 'react';

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personajes:null,
        };
    }

    componentDidMount() {

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
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
        return(
            <div className="detalle-container">
                <img src={`https://image.tmdb.org/t/p/w342/${this.state.personaje.poster_path}`} alt={this.state.personaje.title} />
                <h1>{this.state.personaje.title}</h1>
                <p>Rating: {this.state.personaje.vote_average}</p>
                <p>Fecha de estreno: {this.state.personaje.release_date}</p>
                <p>Sinopsis: {this.state.personaje.overview}</p>
            </div>
        );
    }
}
    

export default Detalle;