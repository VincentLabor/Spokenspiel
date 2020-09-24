import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Menu = ({ setSideMenu, sideMenu }) => {
  return (
    <div className="">
      <div className=" hideOnLargeMedia styledMenu backgroundBlue ">
        <div>
          <div className="flexBetween mg-left1 sidemenuBotMargin">
            <h2 className="leftAlign">SP</h2>
            <i
              className="fas fa-times closeConversation"
              onClick={() => setSideMenu(false)}
            ></i>
          </div>

          <ul className="flexText leftAlign fontSize20 colorWhite">
            <li className="mg1-bottom">
              <Link
                to="/"
                className="clear"
                onClick={() => {
                  setSideMenu(false);
                }}
              >
                <i class="fas fa-home"></i>{"    "}
                 Home
              </Link>
            </li>
            <li className="mg1-bottom">
              {" "}
              <Link to="/about" className="clear mg1-bottom">
              <i class="far fa-question-circle"></i>{"    "}
                 About
              </Link>
            </li>
            <li className="mg1-bottom">
              {" "}
              <Link to="/login" className="clear mg1-bottom">
              <i class="fas fa-sign-in-alt"></i>{"    "}
                 Login
              </Link>
            </li>
            <li className="mg1-bottom">
              {" "}
              <Link to="/register" className="clear ">
              <i class="fas fa-pen-square"></i>{"    "}
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
