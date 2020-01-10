import React, { Component } from "react";
import { arrayify } from "../../../web3/web3Utils";

import "./index.css"
class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            metadata: null,
            recipient: null,
            certificates: [],
            selectedCertificateId: null,
            signedCertificate: {},
            isCertSigned: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.downloadCert = this.downloadCert.bind(this);

    }

    async componentDidMount() {

        let timeNonce = Date.now()

        let tokenContract = this.props.tokenContract
        let lockboxContract = this.props.lockboxContract
        let approvedAmount = await tokenContract.allowance(window.ethereum.selectedAddress, lockboxContract.address)


        this.setState({ timeNonce, approvedAmount, tokenAddress: tokenContract.address })
    }

    handleChange(event) {
        // console.log("event",event.target.name, event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }

    addNewDelegateField() {
        console.log("adding new delegate")
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitTransaction()
    }
    submitTransaction = async () => {
        if (!this.state.approvedAmount.gt(this.state.amount)) {
            await this.approveLockbox(this.state.amount)
        }

        let cHash = await this.props.lockboxContract.getCertificateHash(this.state.amount, this.state.recipient, window.ethereum.selectedAddress, this.state.tokenAddress, this.state.timeNonce)
        const certHashBytes = arrayify(cHash);
        let signature = await this.props.signer.signMessage(certHashBytes)
        let signedCertificate = {
            type: "Lockbox",
            signature,
            amount: this.state.amount,
            tokenAddress: this.state.tokenAddress,
            recipient: this.state.recipient,
            signer: window.ethereum.selectedAddress,
            nonce: this.state.timeNonce,
        }
        this.setState({ signedCertificate, isCertSigned: true })

        document.getElementById(this.props.id).reset();
    };

    async approveLockbox(amt) {
        await this.props.tokenContract.approve(this.props.lockboxContract.address, amt)
    }


    downloadCert() {
        if (!this.state.isCertSigned) {
            alert("cert not valid")
            return
        }
        const blob = new Blob([JSON.stringify(this.state.signedCertificate)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        console.log("blob url", url)
        const a = document.createElement('a');
        a.href = url;
        a.download = this.state.signedCertificate.type + "-" + this.state.signedCertificate.nonce || 'download';
        a.click();
    }




    render() {
        return (
            <div>
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    <label>
                        <span>Recipient:</span>
                        <input name="recipient" type="text" onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        <span>Amount:</span>
                        <input name="amount" type="number" onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="Create Certificate" />
                </form>
                {
                    this.state.isCertSigned ? <div><pre><code>{JSON.stringify(this.state.signedCertificate, 0, 2)}</code></pre><button onClick={this.downloadCert}>Download Certificate</button> </div> : null
                }
            </div>
        );
    }
}


export default CreateForm;