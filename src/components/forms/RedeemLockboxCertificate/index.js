import React, { Component } from "react";
import { bigNumberify, compareHex } from "../../../web3/web3Utils"
import Dropzone from "../../Dropzone"
import TokenFormWrap from "../TokenFormWrap"

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

    async componentDidMount() {

    }

    handleChange(event) {
        try {
            if (event.target.name === "certJsonTextArea") {
                const cert = JSON.parse(event.target.value)
                //const { signature, address, recipient, certificateId } = cert
                console.log(cert)
                //todo patter match here
            }
            this.setState({ [event.target.name]: event.target.value });
        } catch (err) {
            console.log(err)
        }


    }

    async handleFileDrop(files) {
        console.log(files)
        let file = files[0]
        let s = await file.text()
        console.log(s)
        let json = JSON.parse(s)

        this.setState({ certJsonTextArea: JSON.stringify(json, 0, 2) })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { certJsonTextArea } = this.state
        const cert = JSON.parse(certJsonTextArea)
        const { type } = cert
        if (type.toLowerCase() === "lockbox") {
            this.submitLockboxTransaction()
        } else if (type.toLowerCase() === "erc20") {
            this.submitERC20Transaction()
        } else {
            alert("Invalid type value")
        }
    }

    submitERC20Transaction = async () => {
        const { certJsonTextArea } = this.state
        const cert = JSON.parse(certJsonTextArea)
        const { signature, certificateId, recipient} = cert
        if (!compareHex(recipient, window.ethereum.selectedAddress)) {
            alert("Recipient address does not match your address")
        } else {
            await this.props.contract.redeemCertificate(signature, certificateId)
            document.getElementById(this.props.id).reset();
        }
    };

    submitLockboxTransaction = async () => {
        const { certJsonTextArea } = this.state
        const cert = JSON.parse(certJsonTextArea)
        const { signature, tokenAddress, amount, recipient, signer, nonce } = cert
        let bnAmount = bigNumberify(amount)
        if (!compareHex(recipient, window.ethereum.selectedAddress)) {
            alert("Recipient address does not match your address")
        } else {
            await this.props.lockboxContract.redeem(signer, tokenAddress, bnAmount, nonce, signature)
            document.getElementById(this.props.id).reset();
        }

    };


    render() {
        return (
            <TokenFormWrap title="Redeem Certificate">
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    <Dropzone
                        onFilesAdded={this.handleFileDrop}
                        disabled={this.state.successfullyUploaded}
                    />
                    <label>
                        Certificate JSON:
                </label>
                    <br></br>
                    <textarea name="certJsonTextArea" value={this.state.certJsonTextArea} rows="10" cols="100" onChange={this.handleChange} />

                    <br></br>
                    <input type="submit" value="Redeem Certificate" />
                </form>
            </TokenFormWrap>
        );
    }
}
export default CreateForm;