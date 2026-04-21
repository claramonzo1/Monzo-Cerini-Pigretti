import React, { Component } from "react";
import Serie from "../Serie/Serie";
import { Link } from "react-router-dom";

class AiringTv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      verTodas: false
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
            this.state.series
              .filter((serie, idx) => this.state.verTodas ? true : idx < 4)
              .map((serie, idx) => (
                <Serie key={idx} datos={serie} />
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

export default AiringTv;

