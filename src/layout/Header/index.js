import React from 'react';
import { Link } from "@reach/router"
import "./index.css"
//import Balance from "../../components/Balance"


function Header() {
  return (

    <div>
      <header>
        <div className="header-div">
          <Link className="nav-item nav-link" to="/"><button className="btn-primary">Home</button></Link>
          <Link className="nav-item nav-link" to="/deploy"><button className="btn-secondary">Deploy</button></Link>
          <Link className="nav-item nav-link" to="/token"><button className="btn-secondary">Token</button></Link>
          <Link className="nav-item nav-link" to="/lockbox"><button className="btn-secondary">Lockbox</button></Link>
        </div>
      </header>
    </div>

  );
}

export default Header;
