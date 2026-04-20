import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    controlarEmail(event) {
        this.setState({
            email: event.target.value,
            error: ""
        });
    }

    controlarPassword(event) {
        this.setState({
            password: event.target.value,
            error: ""
        });
    }

    onSubmit(email, password) {

    }

    evitarFormulario(event) {
        event.preventDefault();
        let usuariosStorage = localStorage.getItem("usuarios");

        if (usuariosStorage !== null) {
            let usuariosRegistrados = JSON.parse(usuariosStorage);

            let usuarioEncontrado = usuariosRegistrados.filter(
                usuario => usuario.email === this.state.email
            );

            if (usuarioEncontrado.length > 0) {
                if (usuarioEncontrado[0].password === this.state.password) {
                    cookies.set('sesion', this.state.email);
                    this.setState({ error: '' }, this.props.history.push('/'));


                    return;
                }
            }
        }

        this.setState({ error: 'Credenciales incorrectas' });
    }

    render() {
        return (
            <section className="login-container">
                <h1>Udesa Movies</h1>

                <Navbar />

                <h2 className="alert alert-primary">Login</h2>

                <div>
                    <form className="filter-form" onSubmit={(event) => this.enviarFormulario(event)}>
                        <div>
                            <input type="email" placeholder="Email" value={this.state.email} required
                                onChange={(event) => this.controlarEmail(event)}
                            />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" value={this.state.password} required
                                onChange={(event) => this.controlarPassword(event)}
                            />
                        </div>
                        <button className="btn-sm" type="submit">Ingresar</button>
                    </form>
                </div>
                {this.state.error !== "" ? <p>{this.state.error}</p> : null}
            </section>
        );
    }
}

export default Login;