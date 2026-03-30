import React, { Component } from "react";

class Login extends Component {
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

        let usuarioCorrecto = false;

        for (let i = 0; i < usuariosParseados.length; i++) {
            if (
                usuariosParseados[i].email === this.state.email &&
                usuariosParseados[i].password === this.state.password
            ) {
                usuarioCorrecto = true;
            }
        }

        if (usuarioCorrecto === true) {
            document.cookie = "sesion=activa; path=/";

            this.setState({
                email: "",
                password: "",
                error: "",
                exito: "Login correcto"
            });
        } else {
            this.setState({
                error: "Credenciales incorrectas",
                exito: ""
            });
        }
    }

    render() {
        return (
            <section>
                <h2>Login</h2>

                <form onSubmit={(event) => this.evitarSubmit(event)}>
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

                    <button type="submit">Ingresar</button>
                </form>

                <p>{this.state.error}</p>
                <p>{this.state.exito}</p>
            </section>
        );
    }
}

export default Login;