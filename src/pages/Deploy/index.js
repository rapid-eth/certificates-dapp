import React, { Component } from "react";
import DeployNewToken from "../../components/forms/DeployNewToken";
import { MyWeb3Consumer } from "../../web3/EthersContext";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "./index.css";
// import classes from "*.module.css";

const useStyles = theme => ({
  card: {
    display: "flex",
    justifyContent: "center"
  },

  title: {
    color: "black",
    textAlign: "center",
    boxShadow: "5px 5px #888888"
  },
  pos: {
    marginBottom: 12
  },
  body: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%"
  }
});
class Admin1 extends Component {
  componentDidMount = async () => {
    // console.log("create component", this.props.tokenContract.options)
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <DeployNewToken />
      </div>
    );
  }
}

const Admin = props => (
  <MyWeb3Consumer>
    {({ loaded, exampleCoinContract, exampleCoinFactory }) => {
      if (!loaded) {
        return <div>Loading form</div>;
      }
      return (
        <MuiThemeProvider>
          <Card>
            <h1 className="title">Admin Page</h1>
            <h3>Create a new token with the fields below</h3>
          </Card>
          <DeployNewToken id="new-token-form" factory={exampleCoinFactory} />
        </MuiThemeProvider>
      );
    }}
  </MyWeb3Consumer>
);

export default withStyles(useStyles)(Admin);
