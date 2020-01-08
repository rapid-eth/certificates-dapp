import React from "react";
import { Link } from "@reach/router";
import "./index.css";
import Button from "@material-ui/core/Button";

//import Balance from "../../components/Balance"

function Header() {
  return (
    <div>
      <header>
        <div className="header-div">
          <Link className="nav-item nav-link" to="/">
            <Button varient="contained" color="secondary">
              Home
            </Button>
          </Link>
          <Link className="nav-item nav-link" to="/deploy">
            <Button varient="contained" color="secondary">
              Deployed
            </Button>
          </Link>
          <Link className="nav-item nav-link" to="/token">
            <Button varient="contained" color="secondary">
              Token
            </Button>
          </Link>
        </div>
        {/* <div className="balance-tab">
            <Balance />
          </div> */}
      </header>
    </div>
  );
}

export default Header;
