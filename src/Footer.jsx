import React from "react";
import "./styles.css"
import GithubLogo from "./images/github.png";

function Footer(){
    return(
        <div>
        <a href="https://github.com/nandinish/NavigateTheBot" target="_blank" rel="noreferrer noopener">
            <img
              src={GithubLogo}
              width="70"
              height="70"
              className="github-logo"
              alt="logo"
            />
        </a>
        </div>
    );
}
export default Footer;
