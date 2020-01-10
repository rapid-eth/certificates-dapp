import React, { Component } from "react";
import { ethers } from "ethers";
import { navigate } from "@reach/router";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { getLocalStorageArray } from "../../../utils/localStorage";
import { isHexAddress } from "../../../web3/web3Utils";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
const styles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  chooser: {
    minWidth: 400
  }
});

class ChooseToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorTokens: [],
      coinABI: null,
      selectorTokenChoice: "",
      manualToken: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.afterMount = this.afterMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  async componentDidMount() {
    let abi = this.props.exampleCoin.interface.abi;
    this.setState({ coinABI: abi }, this.afterMount);
  }

  afterMount() {
    this.addToken(this.props.exampleCoin.address);
    let tokenAddressArray = getLocalStorageArray("CERTIFICATE_TOKEN_LIST");
    console.log(tokenAddressArray);
    tokenAddressArray.forEach(t => {
      this.addToken(t);
    });
  }

  async addToken(address) {
    let contract = new ethers.Contract(
      address,
      this.state.coinABI,
      this.props.provider
    );
    let symbol = await contract.symbol();
    let name = await contract.name();

    let token = { address, name, symbol };
    console.log(token);
    this.setState({ selectorTokens: [...this.state.selectorTokens, token] });
  }

  handleChange(event) {
    if (event.target.name === "selectorTokenChoice") {
      this.setState({ manualToken: "" });
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTokenChange(event) {
    this.setState({
      selectorTokenChoice: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.manualToken) {
      if (isHexAddress(this.state.selectorTokenChoice)) {
        navigate(`/token/${this.state.selectorTokenChoice}`);
      } else {
        alert("Please select a valid token from the list");
      }
    } else {
      if (isHexAddress(this.state.manualToken)) {
        navigate(`/token/${this.state.manualToken}`);
      }
      alert("Invalid Token address");
    }
  }

  getSelector() {
    const { selectorTokens } = this.state;

    return (
      <div>
        <FormControl className={this.props.classes.chooser}>
          <InputLabel id="demo-simple-select-label">
            Please select a token...
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="selectorTokenChoice"
            value={this.state.selectorTokenChoice}
            onChange={this.handleTokenChange}
          >
            {selectorTokens.map((token, idx) => {
              return (
                <MenuItem key={idx} value={token.address}>
                  {token.name} - {token.symbol} - {token.address}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);
    return (
      <div>
        <h2>Token Finder</h2>
        <form onSubmit={this.handleSubmit}>
          {this.getSelector()}
          <br></br>
          <span>OR</span>
          <br></br>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Add your own:"
              name="manualToken"
              value={this.state.manualToken}
              type="text"
              onChange={this.handleChange}
            />
          </form>
          <br></br>
          <Button type="submit" variant="contained" value="Go to Token">
            Go to Token
          </Button>{" "}
        </form>

        <br></br>
        <br></br>
      </div>
    );
  }
}

export default withStyles(styles)(ChooseToken);
