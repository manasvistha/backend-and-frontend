import React from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
        <Link to="/">
          <h1 className="logo-text" style={{
            color: "black",
            textDecoration: "none",
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "cursive",
            letterSpacing: "2px",
            cursor: "pointer",
            //rem,ove underline
            textUnderlineOffset: "0px",
            textDecoration: "none",

          }}>Tales</h1>
          </Link>
      <span>
        Made with ♥️ by Manasvi and <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;
