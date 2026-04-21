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

    controlarCambios(event) {
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
        });
    }

    evitarFormulario(event) {
        event.preventDefault();

        let usuariosStorage = localStorage.getItem('usuarios');

        if (usuariosStorage !== null) {
            let usuariosRegistrados = JSON.parse(usuariosStorage);

            let usuarioEncontrado = usuariosRegistrados.filter(
                usuario => usuario.email === this.state.email
            );

            if (usuarioEncontrado.length > 0) {
                if (usuarioEncontrado[0].password === this.state.password) {
                    cookies.set('usuarioLogueado', this.state.email);

                    // El segundo parámetro de setState debe ser un callback
                    this.setState({ error: '' }, () => this.props.history.push('/'));
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


                <form className="filter-form" onSubmit={(event) => this.evitarFormulario(event)}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              required
              onChange={(event) => this.controlarCambios(event)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              required
              onChange={(event) => this.controlarCambios(event)}
            />
          </div>
          <button className="btn-sm" type="submit">Ingresar</button>
        </form>

            {this.state.error !== '' ? <p>{this.state.error}</p> : null}

      </section>
    );
  }
}

export default Login;