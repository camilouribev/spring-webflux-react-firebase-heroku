import React from "react";
import { Link } from "react-router-dom";

export const PublicNavbar = () => (
  <nav>
    <Link className="logo" to="/">
      <img src="/icon.png" alt="icon" style={{ maxWidth: 50, padding: 0 }} />
    </Link>
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/login">Login</Link>
    </section>
  </nav>
);

export const PrivateNavbar = ({ children }) => (
  <nav>
    <Link className="logo" to="/">
      <img src="/icon.png" alt="icon" style={{ maxWidth: 50, padding: -10 }} />
    </Link>
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
      <Link>{children}</Link>
    </section>
  </nav>
);
