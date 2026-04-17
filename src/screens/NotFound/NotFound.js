import React from "react";
import Navbar from "../../componentes/Navbar/Navbar";

function NotFound() {
  return (
    <div className="container">
      <h1>Udesa Movies</h1>
      <Navbar />

      <h2>404 - Contenido Inexistente</h2>
      <p>La página que buscás no existe.</p>
    </div>
  );
}

export default NotFound;