import React, { Component } from "react";
import { Link } from "react-router-dom";

class Serie extends Component {
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
      <article className="single-card-tv">
        <img
          src="{⁠https://image.tmdb.org/t/p/w500${this.props.datos.poster_path⁠}}"
          className="card-img-top"
          alt={this.props.datos.name}
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.datos.name}</h5>

          <button onClick={() => this.toggleDescripcion()}>
            {this.state.verDescripcion === false ? "Ver descripción" : "Ocultar descripción"}
          </button>

          {this.state.verDescripcion === true ? (
            <p className="card-text">{this.props.datos.overview}</p>
          ) : null}

          <Link
            className="btn btn-primary"
            to="{⁠/detalle/tv/${this.props.datos.id}⁠}"
          >
            Ver más
          </Link>

          <button className="btn alert-primary">🩶</button>
        </div>
      </article>
    );
  }
}

export default Serie;