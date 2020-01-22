import React, { Fragment } from "react";

const Navbar = () => {
  return (
    <nav className=" nav pd-2_5">
      <div className="">
        <h1>Spokenspiel</h1>
      </div>
      <ul className="flexRight">
        <li>Login</li>
        <li>Register</li>
      </ul>
    </nav>
  );
};

export default Navbar;
