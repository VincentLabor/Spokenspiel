import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" nav pd-2_5">
      <div className="">
        <h1><Link to="/"  className="clear">Spokenspiel</Link></h1>
      </div>
      <ul className="flexRight">
        <li><Link to="/about"  className="clear">About</Link></li>
        <li><Link to="/login" className="clear">Login</Link></li>
        <li><Link to="/register" className="clear"> Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
