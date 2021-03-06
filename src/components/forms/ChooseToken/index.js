import React, { Component } from "react";
import { ethers } from 'ethers';
import { navigate } from "@reach/router"

import { getLocalStorageArray } from "../../../utils/localStorage"
import { isHexAddress } from "../../../web3/web3Utils";
import "./index.css"

export default class ChooseToken extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectorTokens: [],
            coinABI: null,
            selectorTokenChoice: null,
            manualToken: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.afterMount = this.afterMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        let abi = this.props.exampleCoin.interface.abi
        this.setState({ coinABI: abi }, this.afterMount)
    }

    afterMount() {
        this.addToken(this.props.exampleCoin.address)
        let tokenAddressArray = getLocalStorageArray("CERTIFICATE_TOKEN_LIST")
        // console.log(tokenAddressArray)
        tokenAddressArray.forEach(t => {
            this.addToken(t)
        });
    }

    async addToken(address) {

        let contract = new ethers.Contract(address, this.state.coinABI, this.props.provider);
        let symbol = await contract.symbol()
        let name = await contract.name()

        let token = { address, name, symbol }
        // console.log(token)
        this.setState({ selectorTokens: [...this.state.selectorTokens, token] })
    }

    handleChange(event) {
        if (event.target.name === "selectorTokenChoice") {
            this.setState({manualToken: ""})
        }
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.manualToken) {
            if (isHexAddress(this.state.selectorTokenChoice)) {
                navigate(`/${this.props.route}/${this.state.selectorTokenChoice}`);
            } else {
                alert("Please select a valid token from the list")
            }
        } else {
            if (isHexAddress(this.state.manualToken)) {
                navigate(`/${this.props.route}/${this.state.manualToken}`);
            } else {
                alert("Invalid Token address")
            }
        }
    }

    getSelector() {
        const { selectorTokens } = this.state
        return (
            <select className="selector-class" name="selectorTokenChoice" onChange={this.handleChange}>
                <option key={"-1"} value={""}>Please select a token...</option>

                {selectorTokens.map((token, idx) => {
                    if (token) {
                        return (
                            <option key={idx} value={token.address}>{token.name} - {token.symbol} - {token.address}</option>
                        )
                    } else return null

                })}
            </select>
        );
    }


    render() {
        return (
            <div className="token-finder">
                <h2>{this.props.title}</h2>
                <form className="finder-form" onSubmit={this.handleSubmit}>
                    {this.getSelector()}
                    <span id="or-span">OR</span>
                    <label>
                        Add your own: 
                        </label>

                <input name="manualToken" className="address-input" value={this.state.manualToken} type="text" placeholder="0x123..." onChange={this.handleChange} />

                    <input className="finder-submit-button" type="submit" value={this.props.goButtonText} />

                </form>

                <br></br>
                <br></br>
            </div>
        )
    }
}
