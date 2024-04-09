import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";

export default class NavBar extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          
            <img
              src={Logo}
              alt=""
              width="60" height="60"
            />

            <Link className="navbar-brand" to={"/welcome"}>
              <b style={{color:'var(--textColor)'}}>JobNest</b>
            </Link>
            
        </nav>
      </>
    );
  }
}
