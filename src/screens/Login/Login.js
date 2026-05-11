import { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../componentes/Navbar/Navbar";

const cookies = new Cookies();

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function controlarCambios(event) {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
        setError('');
    }

    function evitarFormulario(event) {
        event.preventDefault();

        let usuariosStorage = localStorage.getItem('usuarios');

        if (usuariosStorage !== null) {
            let usuariosRegistrados = JSON.parse(usuariosStorage);

            let usuarioEncontrado = usuariosRegistrados.filter(
                usuario => usuario.email === email
            );

            if (usuarioEncontrado.length > 0) {
                if (usuarioEncontrado[0].password === password) {
                    cookies.set('usuarioLogueado', email);
                    setError('');
                    props.history.push('/');
                    return;
                }
            }
        }

        setError('Credenciales incorrectas');
    }

    return (
        <section className="login-container">
            <h1>Udesa Movies</h1>
            <Navbar />
            <h2 className="alert alert-primary">Login</h2>

            <form className="filter-form" onSubmit={(event) => evitarFormulario(event)}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(event) => controlarCambios(event)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(event) => controlarCambios(event)}
                    />
                </div>
                <button className="btn-sm" type="submit">Ingresar</button>
            </form>

            {error !== '' ? <p>{error}</p> : null}

        </section>
    );
}

export default Login;