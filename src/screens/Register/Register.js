import { useState } from "react";
import Navbar from "../../componentes/Navbar/Navbar";

function Register(props) {

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

    function enviarFormulario(event) {
        event.preventDefault();

        let usuarios = localStorage.getItem('usuarios');

        if (usuarios === null) {
            usuarios = [];
        } else {
            usuarios = JSON.parse(usuarios);
        }

        if (password.length < 6) {
            setError('La contraseña debe tener mínimo 6 caracteres');
            return;
        }

        let usuarioExistente = usuarios.filter(
            usuario => usuario.email === email
        );

        if (usuarioExistente.length > 0) {
            setError('El email ya está registrado');
            return;
        }

        let nuevoUsuario = {
            email: email,
            password: password,
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        setEmail('');
        setPassword('');
        setError('');
        props.history.push('/login');
    }

    return (
        <section className="login-container">
            <h1>Udesa Movies</h1>
            <Navbar />
            <h2 className="alert alert-primary">Registrarse</h2>

            <form className="filter-form" onSubmit={(event) => enviarFormulario(event)}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => controlarCambios(event)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => controlarCambios(event)}
                    />
                </div>
                <button className="btn-sm" type="submit">Crear cuenta</button>
            </form>

            <p className="mt-3 text-center">¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a></p>

            {error !== '' ? <p>{error}</p> : null}
        </section>
    );
}

export default Register;