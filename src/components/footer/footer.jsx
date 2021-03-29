import React from "react";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

import "./footer.styles.scss";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="social-section large-screen">
        <li className="social github">
          <a href="https://github.com/BanJoeH/">
            <img src={github} alt="gitHub link" />
          </a>
        </li>
        <li className="nav-link">
          <a href="https://joescript.io">Made by Joe</a>
        </li>
        <li className="social">
          <a href="https://www.linkedin.com/in/joescript/">
            <img src={linkedin} alt="LinkedIn link" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
