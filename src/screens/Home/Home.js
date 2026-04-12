import React, { Component } from "react";
import { Link } from "react-router-dom";
import PopMovies from "../../componentes/PopMovies/PopMovies";
import NowMovies from "../../componentes/NowMovies/NowMovies";
import PopTv from "../../componentes/PopTv/PopTv"
import AiringTv from "../../componentes/AiringTV/AiringTv";

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            busqueda: ''
        };
    }

controlarCambios(event){
    this.setState({
        busqueda: event.target.value
    });
}

enviarBusqueda(event){
    event.preventDefault();
    this.props.history.push("/resultado/" + this.state.busqueda);
}

render(){
    return(
        <div className="continer"> 
        <form className="search-form" onSubmit={(event) => this.enviarBusqueda(event)}>
            <input
            type="text"
            placeholder="Buscar..."
            onChange= {(event) => this.controlarCambios(event)} />
            <button type="submit" className="btn btn-success btn-sm">Buscar</button>
             </form>
             <PopMovies/>
             <NowMovies/>
             <PopTv/>
             <AiringTv/>
        </div>
    );
}
}

export default Home;

