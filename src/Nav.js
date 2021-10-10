import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" width="50px" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/register" className="nav-link" aria-current="page">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;