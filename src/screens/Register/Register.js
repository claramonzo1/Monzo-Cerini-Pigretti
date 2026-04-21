import React, { Component } from "react";
import Navbar from "../../componentes/Navbar/Navbar";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    controlarCambios(event) {
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
        });
    }

    enviarFormulario(event) {
        event.preventDefault();

        let usuarios = localStorage.getItem('usuarios');

        if (usuarios === null) {
            usuarios = [];
        } else {
            usuarios = JSON.parse(usuarios);
        }

        if (this.state.password.length < 6) {
            return this.setState({ error: 'La contraseña debe tener mínimo 6 caracteres' });
        }

        let usuarioExistente = usuarios.filter(
            usuario => usuario.email === this.state.email
        );

        if (usuarioExistente.length > 0) {
            return this.setState({ error: 'El email ya está registrado' });
        }

        let nuevoUsuario = {
            email: this.state.email,
            password: this.state.password,
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        this.setState(
            { email: '', password: '', error: '' },
            () => this.props.history.push('/login')
        );
    }

    render() {
        return (
            <section className="login-container">
                <h1>Udesa Movies</h1>

                <Navbar />

                <h2 className="alert alert-primary">Registrarse</h2>
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
                
                {this.state.error !== "" ? <p>{this.state.error}</p> : null}
            </section>

        );
    }
}

export default Register;