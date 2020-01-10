import React, { Component } from "react";
import { upsertStringToLocalStorageArray } from "../../../utils/localStorage";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Button } from "@material-ui/core";
const styles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: 200
    }
  },
  chooser: {
    minWidth: 400
  },

  body: {
    heigth: "auto",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    border: "5px solid red"
  }
});
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      name: null,
      symbol: null,
      decimalUnits: null,
      cap: null,
      price: null,
      showOther: false,
      waiting: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submitTransaction();
  }

  submitTransaction = async () => {
    const { name, symbol, decimalUnits, cap } = this.state;

    this.setState({ waiting: true });
    let contract = await this.props.factory.deploy(
      name,
      symbol,
      decimalUnits,
      cap
    );

    console.log(contract);
    upsertStringToLocalStorageArray("CERTIFICATE_TOKEN_LIST", contract.address);

    await contract.deployTransaction.wait();
    this.setState({ waiting: false });

    document.getElementById(this.props.id).reset();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.body}>
        <div className={classes.formBody}>
          <FormControl
            className={classes.root}
            id={this.props.id}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="standard-basic"
              label="Token Name:"
              name="name"
              type="text"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Token Symbol:"
              name="symbol"
              type="text"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label=" Decimal Units:"
              name="decimalUnits"
              type="number"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Mint Cap:"
              name="cap"
              type="number"
              onChange={this.handleChange}
            />

            {this.state.waiting ? (
              <div>Please Wait While Token Deploys...</div>
            ) : (
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
              >
                DEPLOY
              </Button>
            )}
          </FormControl>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(CreateForm);
