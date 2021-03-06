import React, { Component } from "react";
import { upsertStringToLocalStorageArray } from "../../../utils/localStorage"
import TokenFormWrap from "../TokenFormWrap";
import "./index.css"
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
        this.submitTransaction()
    }

    submitTransaction = async () => {
        const { name, symbol, decimalUnits, cap } = this.state

        this.setState({ waiting: true })
        let contract = await this.props.factory.deploy(name, symbol, decimalUnits, cap)

        console.log(contract)
        upsertStringToLocalStorageArray("CERTIFICATE_TOKEN_LIST", contract.address)

        await contract.deployTransaction.wait()
        this.setState({ waiting: false })

        document.getElementById(this.props.id).reset();
    };


    render() {
        return (
            <TokenFormWrap title="Fill out form to create a new token" helperText="">
                <form id={this.props.id} onSubmit={this.handleSubmit}>

                    <label>Token Name:</label>
                    <br></br>

                    <input name="name" type="text" onChange={this.handleChange} />
                    <br></br>
                    <br></br>

                    <label>Token Symbol:</label>
                    <br></br>

                    <input name="symbol" type="text" onChange={this.handleChange} />
                    <br></br>
                    <br></br>

                    <label>Decimal Units: </label>
                    <br></br>
                    <input name="decimalUnits" type="number" onChange={this.handleChange} />
                    <br></br>
                    <br></br>

                    <label>Mint Cap:  </label>
                    <br></br>

                    <input name="cap" type="number" onChange={this.handleChange} />
                    <br></br>
                    <br></br>

                    {this.state.waiting ? <div>Please Wait While Token Deploys...</div> : <input type="submit" value="Submit" />}
                </form>
            </TokenFormWrap>
        );
    }
}
export default CreateForm;