import React, { Component } from "react";
import { Link } from "@reach/router"
import "./index.css"


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
      <div>
        <header>
          <Link to="/"><img className="header-img" src="/ethcert.png"></img></Link>
          <div className="header-buttons">
            <Link className="header-link-item" to="/deploy">Deploy</Link>
            <Link className="header-link-item" to="/token">Token</Link>
            <Link className="header-link-item" to="/lockbox">Lockbox</Link>
          </div>
        </header>
      </div>

    );
  }
}

// function ModLink(props) {
//   return (
//   <Link className="header-link-item" to={props.to}>{props.text}</Link>
//   );
// }

export default Header;
