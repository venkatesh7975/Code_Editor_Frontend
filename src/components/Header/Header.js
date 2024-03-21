import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TUF Code Editor</Link>
       
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

     
        <div className="collapse navbar-collapse dropdown-menu-end" id="navbarNav">

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/FormFields">Form Fields</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Entries">Submitted Entries</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
