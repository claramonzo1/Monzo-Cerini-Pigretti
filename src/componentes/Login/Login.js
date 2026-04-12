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
            if (usuariosParseados[i].email === this.state.email) {
                if (usuariosParseados[i].password === this.state.password) {
            usuarioCorrecto = true;
    }
  }
}

        if (usuarioCorrecto === true) {
            

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
            <section className="login-container">
                <h2>Login</h2>

                <form className="filter-form" onSubmit={(event) => this.evitarSubmit(event)}>
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