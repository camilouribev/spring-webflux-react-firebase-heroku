import React from "react";

function Footer() {
  return (
    <footer>
      <nav className="nav__footer">
        <section className="footer-section">
          <h4 className="page-footer"> Question and answers: </h4>
          <p className="page-footer"> The place to share and learn</p>
        </section>
        <section className="footer-section">
          <h4 className="page-footer"> How to use: </h4>
          <p className="page-footer">
            {" "}
            Subscribe and be able to ask to our community
          </p>
        </section>
        <section className="footer-section">
          <h4 className="page-footer"> Created by: Camilo Uribe </h4>
        </section>
      </nav>
    </footer>
  );
}

export default Footer;
