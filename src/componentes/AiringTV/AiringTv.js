import React, { Component } from "react";
import Serie from "../Serie/Serie";
import {Link} from "react-router-dom"

class AiringTv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: []
    };
  }

componentDidMount() {

const url = 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1';
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
        <h2 className="alert alert-warning"> Tv shows airing today</h2>
      <section className="row cards" id="on-air-today">
        <h2> TV show airing today </h2>
        {this.state.series.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          this.state.series.map((serie, idx) => (
            <Serie key={idx} datos={serie} history={this.props.history} />
          ))
        )}
      </section>
      <Link className="btn btn-outline-warning mb-3" to="/detalles">
          Ver todas
        </Link>
      </div>
    );
  }
}

export default AiringTv; 
