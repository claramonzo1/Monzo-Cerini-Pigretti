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
  fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=1944c47872d6439a6a7d6a987a1991ac&language=en-US")
    .then((response) => response.json())
    .then((data) =>
      this.setState({
        series: data.results
      })
    )
    .catch((error) => console.log(error));
}

  render() {
    return (
    <div> 
        <h2 className="alert alert-warning"> Tv shows airing today</h2>
      <section className="row cards" id="on-air-today">
        {this.state.series.length === 0 ? (
          <p>Cargando...</p>
        ) : (
            this.state.series.slice(0, 4).map((serie, idx) => (
  <Serie key={idx} datos={serie} />
))
        //   this.state.series.map((serie, idx) => (
        //     <Serie key={idx} datos={serie} />
        //   )) esto es lo q si
        )}
      </section>
      {/* <Link className="btn btn-outline-warning mb-3" to="/detalles">
          Ver todas
        </Link> */}
      </div>
    );
  }
}

export default AiringTv; 
