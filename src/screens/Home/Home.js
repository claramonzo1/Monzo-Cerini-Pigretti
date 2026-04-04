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
    this.state({
        busqueda: event.target.value
    });
}

enviarBusqueda(event){
    event.preventDeFault();
    this.props.history.push("/reultado/" + this.state.busqueda);
}

render(){
    return(
        <div className="continer"> 
        <from className="search-from" onSubmit={(event) => this.enviarBusqueda(event)}>
            <input
            type="text"
            placeholder="Buscar..."
            onChange= {(event) => this.controlarCambios(event)} />
            <button type="submit" className="btn btn-success btn-sm">Buscar</button>
             </from>
             <PopMovies/>
             <NowMovies/>
             <PopTv/>
             <AiringTv/>
        </div>
    );
}
}

export default Home;

