import React, { Component } from "react";
import { Link } from "react-router-dom";
import Serie from "../Serie/Serie";

class PopTv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: []
    };
  }

componentDidMount() {
  fetch("https://api.themoviedb.org/3/tv/popular?api_key=1944c47872d6439a6a7d6a987a1991ac")
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
        <h2 className="alert alert-warning">Popular TV shows this week</h2>
        <section className="row cards" id="popular-tv">
          {this.state.series.length === 0 ? (
            <p>Cargando...</p>
          ) : (
            this.state.series.map((serie, idx) => (
              <Serie key={idx} datos={serie} />
            ))
          )}
        </section>
        <Link className="btn btn-outline-warning mb-3" to="/series">
          Ver todas
        </Link>
      </div>
    );
  }
}

export default PopTv; 
