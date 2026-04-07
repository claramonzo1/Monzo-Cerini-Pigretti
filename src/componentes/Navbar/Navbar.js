import React from "react"
import { Link } from "react-router-dom"

function Navbar(props){
  return(
    <nav>
      <ul>
        {props.elementos.map((unMenu, idx) => (
          <li key={idx}>
            <Link to={unMenu.Link}>{unMenu.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;