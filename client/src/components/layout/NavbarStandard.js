import React from 'react'
import {Link} from "react-router-dom";
function NavbarStandard() {
    return (
        <nav className=" nav pd-2_5">
        <div className="">
          <h1><Link to="/"  className="clear">Spokenspiel</Link></h1>
        </div>
      </nav>
    )
}

export default NavbarStandard
