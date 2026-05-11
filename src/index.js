import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
// busca en el archivo html un elemtno q tenga el id root y lo convierte en la base de toda mi app
root.render(
// es el método q inicia el ciclo de vida de la app
  <BrowserRouter>
{/* // trae el componente q habilita el sistema de rutas, sin este envoltorio no podría navegadar entre dif páginas de tu sitio */}
    <App />
{/* renderiza app */}
  </BrowserRouter>
);
