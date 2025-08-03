import React from 'react';

const Navbar = ({ onHomeClick }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
      <a className="navbar-brand" href="#" onClick={onHomeClick}>
        🔴Pokemon App
      </a>
      <span className="navbar-text text-light">
        Gotta Catch 'Em All!😎
      </span>
    </div>
  </nav>
);

export default Navbar;