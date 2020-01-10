import React, { Component } from "react";
import Dropzone from "../../Dropzone";
import { Button } from "@material-ui/core";
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      certJson: {},
      successfullyUploaded: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
  }

  async componentDidMount() {}

  handleChange(event) {
    try {
      if (event.target.name === "certJsonTextArea") {
        const cert = JSON.parse(event.target.value);
        const { signature, address, recipient, certificateId } = cert;
        console.log(cert);
        //todo patter match here
      }
      this.setState({ [event.target.name]: event.target.value });
    } catch (err) {
      console.log(err);
    }
  }

  async handleFileDrop(files) {
    console.log(files);
    let file = files[0];
    let s = await file.text();
    console.log(s);
    let json = JSON.parse(s);

    this.setState({ certJsonTextArea: JSON.stringify(json, 0, 2) });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submitTransaction();
  }

  submitTransaction = async () => {
    const { certJsonTextArea } = this.state;
    const cert = JSON.parse(certJsonTextArea);
    const { signature, address, recipient, certificateId } = cert;

    await this.props.contract.redeemCertificate(signature, certificateId);
    document.getElementById(this.props.id).reset();
  };

  render() {
    if (this.state.notOwner) {
      return (
        <span className="form-warning">
          You are not the owner of the contract {this.props.contract.address}
        </span>
      );
    }
    return (
      <form id={this.props.id} onSubmit={this.handleSubmit}>
        <Dropzone
          onFilesAdded={this.handleFileDrop}
          disabled={this.state.successfullyUploaded}
        />
        <label>Certificate JSON:</label>
        <br></br>
        <textarea
          name="certJsonTextArea"
          value={this.state.certJsonTextArea}
          rows="10"
          cols="100"
          onChange={this.handleChange}
        />
        <br></br>
        <Button
          type="submit"
          value="Redeem Certificate"
          variant="contained"
          color="primary"
        >
          Redeem Certificate
        </Button>{" "}
      </form>
    );
  }
}
export default CreateForm;
