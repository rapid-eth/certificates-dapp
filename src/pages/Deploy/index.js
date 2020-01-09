import React, { Component } from "react";
import DeployNewToken from "../../components/forms/DeployNewToken";
import { MyWeb3Consumer } from "../../web3/EthersContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "./index.css";

const useStyles = theme => ({
  card: {
    border: "5px solid blue",
    display: "flex",
    justifyContent: "center"
  },

  title: {
    color: "black",
    textAlign: "center",
    border: "2px solid blue",
    boxShadow: "5px 5px #888888"
  },
  pos: {
    marginBottom: 12
  },
  border: {
    border: "5px solid blue"
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
          <form>
            <TextField
              hintText="Hint text"
              floatingLabelText="Fixed Floating label text"
              floatingLabelFixed={true}
            />
            <div className="admin-page">
              <h1 className="title">Admin Page</h1>

              <h3>Fill out the form below to create a new token</h3>
              <DeployNewToken
                id="new-token-form"
                factory={exampleCoinFactory}
              />
            </div>
          </form>
        </MuiThemeProvider>
      );
    }}
  </MyWeb3Consumer>
);

export default Admin;
