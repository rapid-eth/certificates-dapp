import React from 'react';
import { Link } from "@reach/router"
import "./index.css"
//import Balance from "../../components/Balance"


function Header() {
  return (

    <div>
      <header>
        <div className="header-div">
          <Link className="nav-item nav-link" to="/"><img className="header-img" src="/ethcert.png"></img></Link>
          <Link className="nav-item nav-link" to="/deploy"><button className="btn-secondary button-class">Deploy</button></Link>
          <Link className="nav-item nav-link" to="/token"><button className="btn-secondary button-class">Token</button></Link>
          <Link className="nav-item nav-link" to="/lockbox"><button className="btn-secondary button-class">Lockbox</button></Link>
        </div>
      </header>
    </div>

  );
}

export default Header;
