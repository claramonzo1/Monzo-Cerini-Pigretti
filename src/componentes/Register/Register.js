import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            exito: ""
        };
    }

    controlarCambios(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    evitarSubmit(event) {
        event.preventDefault();
    
        let usuariosGuardados = localStorage.getItem("usuarios");
        let usuariosParseados = [];
    
        if (usuariosGuardados !== null) {
            usuariosParseados = JSON.parse(usuariosGuardados);
        }
    
        let usuarioEncontrado = false;
    
        for (let i = 0; i < usuariosParseados.length; i++) {
            if (usuariosParseados[i].email === this.state.email) {
                usuarioEncontrado = true;
            }
        }
    
        if (usuarioEncontrado === true) {
            this.setState({
                error: "El email ya está en uso",
                exito: ""
            });
        } else if (this.state.password.length < 6) {
            this.setState({
                error: "La contraseña debe tener al menos 6 caracteres",
                exito: ""
            });
        } else {
            let nuevoUsuario = {
                email: this.state.email,
                password: this.state.password
            };
    
            usuariosParseados.push(nuevoUsuario);
    
            let usuariosStringificados = JSON.stringify(usuariosParseados);
            localStorage.setItem("usuarios", usuariosStringificados);
    
           
    
            this.setState({
                email: "",
                password: "",
                error: "",
                exito: "Usuario creado correctamente"
            });
        }
    }

    render() {
        return (
            <section className="register-container">
                <h2>Crear cuenta</h2>

                <form className="filter-form" onSubmit={(event) => this.evitarSubmit(event)}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={(event) => this.controlarCambios(event)}
                    />

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => this.controlarCambios(event)}
                    />

                    <button type="submit">Crear cuenta</button>
                </form>

                <p>{this.state.error}</p>
                <p>{this.state.exito}</p>
            </section>
        );
    }
}

export default Register;