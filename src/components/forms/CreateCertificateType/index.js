import React, { Component } from "react";
import "./index.css"
class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            delegates: [],
            metadata: null,
            notOwner: false
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
        if (event.target.name === "delegates") {
            let delegates = [event.target.value]
            this.setState({ delegates });

        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    addNewDelegateField() {
        console.log("adding new delegate")
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitTransaction()
    }
    submitTransaction = async () => {
        const { amount, delegates, metadata } = this.state
        delegates.push(window.ethereum.selectedAddress)
        await this.props.contract.createCertificateType(amount, delegates, metadata)
        document.getElementById(this.props.id).reset();
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
                {/* <label>
                    Delegate:
            <input name="delegates" type="text" onChange={this.handleChange} />
                </label>
                <div className="add-delegate-div" onClick={this.addNewDelegateField}>
                    <span>+</span>
                </div>
                <br></br> */}
                <input type="submit" value="Submit" disabled={this.state.notOwner} />
            </form>
        );
    }
}
export default CreateForm;