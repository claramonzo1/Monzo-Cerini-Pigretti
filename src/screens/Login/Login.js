import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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

    onSubmit(event) {
        event.preventDefault();

        let usuariosGuardados = localStorage.getItem("usuarios");
        let usuariosParseados = [];

        if (usuariosGuardados !== null) {
            usuariosParseados = JSON.parse(usuariosGuardados);
        }

        let usuarioCorrecto = false;
        let usuarioEncontrado = null;

        for (let i = 0; i < usuariosParseados.length; i++) {
            if (
                usuariosParseados[i].email === this.state.email &&
                usuariosParseados[i].password === this.state.password
            ) {
                usuarioCorrecto = true;
                usuarioEncontrado = usuariosParseados[i];
            }
        }

        if (usuarioCorrecto === true) {
            cookies.set("user-auth-cookie", usuarioEncontrado.email);

            this.setState({
                email: "",
                password: "",
                error: "",
                exito: "Login correcto"
            });

            this.props.history.push("/");
        } else {
            this.setState({
                error: "Credenciales incorrectas",
                exito: ""
            });
        }
    }

    render() {
        return (
            <section className="login-container">
                <h2>Login</h2>

                <form className="filter-form" onSubmit={(event) => this.onSubmit(event)}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(event) => this.controlarCambios(event)}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={this.state.password}
                        onChange={(event) => this.controlarCambios(event)}
                    />

                    <button className="btn-sm" type="submit">Ingresar</button>
                </form>

                <p>{this.state.error}</p>
                <p>{this.state.exito}</p>
            </section>
        );
    }
}

export default Login;