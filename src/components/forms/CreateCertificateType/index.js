import React, { Component } from "react";
import { isHexAddress } from "../../../web3/web3Utils";

import "./index.css"
class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            delegates: [],
            metadata: null,
            notOwner: false,
            delegateFields: [],
            delegateLength: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewDelegateField = this.addNewDelegateField.bind(this);

    }

    async componentDidMount() {
        //compare users address to owner, see if it matches
        let ownerAddress = await this.props.contract.owner()
        console.log(ownerAddress)

        if (window.ethereum.selectedAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
            this.setState({ notOwner: true });
        }
    }

    handleChange(event) {
        console.log(this.state)

        if (event.target.name === "delegates") {
            let delegateFields = this.state.delegateFields
            let i = event.target.id
            delegateFields[i] = event.target.value
            console.log(this.state)
            this.setState({ delegateFields });

        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    addNewDelegateField() {
        console.log("adding new delegate")
        let newFields = this.state.delegateFields
        newFields.push("")
        this.setState({ delegateFields: newFields })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitTransaction()
    }
    submitTransaction = async () => {
        const { amount, delegateFields, metadata } = this.state
        try {
            delegateFields.forEach((df,i) => {
                if (!isHexAddress(df)) {
                    throw "Delegate Field " + i + " is not a valid address"
                }
            })
            //delegateFields.push(window.ethereum.selectedAddress)
            await this.props.contract.createCertificateType(amount, delegateFields, metadata)
            document.getElementById(this.props.id).reset();
        } catch (err) {
            alert(err.toString())
        }

    };


    render() {
        if (this.state.notOwner) {
            return (<span className="form-warning">You are not the owner of the contract {this.props.contract.address}</span>)
        }
        return (
            <form id={this.props.id} onSubmit={this.handleSubmit}>
                <br></br>
                <label>
                    Amount:
            <input name="amount" type="number" onChange={this.handleChange} />
                </label>
                <br></br>

                <label>
                    Metadata:
            <input name="metadata" type="text" onChange={this.handleChange} />
                </label>
                <br></br>
                <label>
                    Delegates:
                 {this.state.delegateFields.map((d, fId) => {
                     return (<div key={fId}><input id={fId} name="delegates" type="text" onChange={this.handleChange} /><br></br></div>)
                 })}
                </label>
                <div className="add-delegate-div" onClick={this.addNewDelegateField}>
                    <span>+</span>
                </div>
                <br></br>
                <input type="submit" value="Submit" disabled={this.state.notOwner} />
            </form>
        );
    }
}
export default CreateForm;