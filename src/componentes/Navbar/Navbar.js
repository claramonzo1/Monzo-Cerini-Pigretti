import React from "react"

function Navbar (props){
    return(
        <nav> 
            <ul className="main-nav">
                {props.elementos.map((unMenu, idx)=> (
                    <li> key={idx} 
                    <Link to={unMenu.Link}>{unMenu.nombre}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;