import React from "react"
import { Link } from "react-router-dom"

function Navbar(props){
  return(
    <nav className="nav">
      <ul className="nav">
        {props.elementos.map((unMenu, idx) => (
          <li key={idx} className="nav-item">
            <Link className="nav-link" to={unMenu.Link}>{unMenu.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;