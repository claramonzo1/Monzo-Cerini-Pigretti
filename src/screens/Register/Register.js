import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    enviarFormulario(event) {
        event.preventDefault();

        let usuarios = localStorage.getItem("usuarios");

        if (usuarios === null) {
            usuarios = [];
        } else {
            usuarios = JSON.parse(usuarios);
        }

        if (this.state.password.length < 6) {
            return this.setState({
                error: "La contraseña debe tener mínimo 6 caracteres"
            });
        }

        let existe = false;

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === this.state.email) {
                existe = true;
            }
        }
        if (existe) {
            return this.setState({
                error: "El email ya está registrado"
            });
        }

        let nuevoUsuario = {
            email: this.state.email,
            password: this.state.password
        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        this.setState({
            email: "",
            password: "",
            error: ""
        });

        alert("¡Cuenta creada con éxito!");
        this.props.history.push("/login");
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

    render() {
        return (
            <section className="login-container">
                <h1>Udesa Movies</h1>

                <Navbar />

                <h2 className="alert alert-primary">Registrarse</h2>
                <div >
                    <div>
                        <form className="filter-form" onSubmit={(event) => this.enviarFormulario(event)}>
                            <div >
                                <input type="email" placeholder="Email" value={this.state.email}
                                    onChange={(event) => this.controlarEmail(event)} />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" value={this.state.password}
                                    onChange={(event) => this.controlarPassword(event)} />
                            </div>
                            <button className="btn-sm" type="submit" >Crear cuenta</button>
                        </form>
                        <p class="mt-3 text-center">¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a></p>
                    </div>
                    {this.state.error !== "" ? <p>{this.state.error}</p> : null}
                </div>
            </section>

        );
    }
}

export default Register;
