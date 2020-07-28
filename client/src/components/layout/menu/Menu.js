import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Menu = ({setSideMenu, sideMenu}) => {

  return (
    <div className="">
      <div className=" hideOnLargeMedia styledMenu ">
        <div>
          <i
            className="fas fa-times closeConversation"
            onClick={() => setSideMenu(false)}
          ></i>
          <ul className="flexText">
            <li>
              <Link
                to="/"
                className="clear"
                onClick={() => {
                  setSideMenu(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/about" className="clear ">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/login" className="clear ">
                Login
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/register" className="clear ">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
