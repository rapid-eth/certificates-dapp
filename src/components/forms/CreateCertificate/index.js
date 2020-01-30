import React, { Component } from "react";
import { decodeLogs, arrayify } from "../../../web3/web3Utils";
import TokenFormWrap from "../TokenFormWrap"
import verbiage from "../../../verbiage.json"

import "./index.css"
class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            metadata: null,
            notOwner: false,
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

        this.getLogs()

        let ownerAddress = await this.props.contract.owner()

        if (window.ethereum.selectedAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
            this.setState({ notOwner: true });
        }
    }

    async getLogs() {
        let filter = this.props.contract.filters.CertificateTypeCreated();
        filter.fromBlock = 0

        let logs = await this.props.provider.getLogs(filter)
        let contractEventInterface = this.props.contract.interface.events['CertificateTypeCreated']
        let decodedLogs = decodeLogs(logs, contractEventInterface)

        let certificates = []
        for (let i = 0; i < decodedLogs.length; i++) {
            const log = decodedLogs[i];
            let dataString = await this.props.contract.getCertificateData(log.id)
            let cert = { id: log.id, amount: log.amount.toString(), meta: dataString, delegates: log.delegates }
            certificates.push(cert)
        }
        this.setState({ certificates })

        this.getDelegateSelector()
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
        if (this.state.selectedCertificateId) {
            let cHash = await this.props.contract.getCertificateHash(this.state.selectedCertificateId, this.state.recipient)
            const certHashBytes = arrayify(cHash);
            let signature = await this.props.signer.signMessage(certHashBytes)
            let signedCertificate = {
                type: "ERC20",
                signature,
                address: this.props.contract.address,
                recipient: this.state.recipient,
                certificateId: this.state.selectedCertificateId
            }
            this.setState({ signedCertificate, isCertSigned: true })
        } else {
            alert("No valid cert selected")
        }
        document.getElementById(this.props.id).reset();
    };

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
        a.download = this.state.signedCertificate.certificateId || 'download';
        a.click();
    }

    getDelegateSelector() {
        const { certificates } = this.state
        let selectorList = []
        for (let i = 0; i < certificates.length; i++) {
            const c = certificates[i];
            let delegate = c.delegates.filter(d => d.toLowerCase() === window.ethereum.selectedAddress.toLowerCase())
            if (delegate > 0) {
                selectorList.push(c)
            }
        }

        return (
            <select className="create-selector" name="selectedCertificateId" onChange={this.handleChange}>
                <option key={"-1"} value={""}>Please select a Certificate Type...</option>

                {selectorList.map((cert, idx) => {
                    if (cert) {
                        return (
                            <option key={idx} value={cert.id}>{cert.meta} - {cert.amount}</option>
                        )
                    } else return null

                })}
            </select>
        );
    }

    displayCert() {

    }



    render() {
        if (this.state.certificates.length === 0) {
            return (
                <TokenFormWrap title="Create Certificate" helperText={verbiage.tokenCertificateCreate}>
                    <span className="form-warning">
                        You are not a delegate for any certificates on contract {this.props.contract.address}
                    </span>
                </TokenFormWrap>
            )
        }
        return (
            <TokenFormWrap title="Create Certificate" helperText={verbiage.tokenCertificateCreate}>
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    <label>Certificate:</label>
                    <br></br>
                    {this.getDelegateSelector()}
                    <br></br>
                    <br></br>


                    <label>Recipient:</label>
                    
                    <br></br>
                    <input name="recipient" type="text" onChange={this.handleChange} />

                    <br></br>
                    <br></br>

                    <input type="submit" value="Create Certificate" />
                </form>
                <div className="cert-json">
                {
                    this.state.isCertSigned ? <div><pre><code>{JSON.stringify(this.state.signedCertificate, 0, 2)}</code></pre><button onClick={this.downloadCert}>Download Certificate</button> </div> : null
                }
                </div>
            </TokenFormWrap>
        );
    }
}


export default CreateForm;