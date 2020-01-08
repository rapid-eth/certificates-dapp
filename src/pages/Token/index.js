import React, { Component } from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext"
import { ethers } from 'ethers';
import getContracts from "../../web3/getContracts";
import TokenMeta from "../../components/TokenMeta"
import CreateCertificateType from "../../components/forms/CreateCertificateType"
import CreateCertificate from "../../components/forms/CreateCertificate"
import RedeemCertificate from "../../components/forms/RedeemCertificate"
import {getLocalStorageArray} from "../../utils/localStorage"

import "./index.css"


class Token extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contract: null,
      contractLoaded: false,
      loadingMessage: "",
      symbol: null,
      name: null,
      supply: null,
      owner: null,
      balance: null
    };
  }
  setLoaded() {
    this.setState({
      contractLoaded: true
    })
  }

  componentDidMount = async () => {
    this.loadContract()
  }

  async loadContract() {
    try {
      console.log("loading contract")
      let provider = this.props.provider

      let templateCode = await provider.getCode(this.props.templateAddress)
      let code = await provider.getCode(this.props.tokenAddress)

      let contracts = getContracts(this.props.networkId)
      const exampleCoinJSON = contracts.exampleCoin

      if (templateCode !== code) {
        let loadingMessage = "deployed contract code does not match example coin contract"
        throw loadingMessage;
      }
      let contract = new ethers.Contract(this.props.tokenAddress, exampleCoinJSON.abi, this.props.signer);
      let owner = await contract.owner()

      this.setState({ contract, owner }, this.setLoaded)
    } catch (err) {
      console.log(err)
      this.setState({ loadingMessage: err.toString() })
    }
  }

  render() {
    if (!this.state.contract) {
      return (<div>{this.state.loadingMessage}</div>)
    }
    return (
      <div>
        <div className="token-box-div">
          <h3>Token Data</h3>
          <TokenMeta contract={this.state.contract} />
        </div>
        <div className="token-box-div">
          <h3>Create Certificate Type (admin only)</h3>
          <CreateCertificateType id="create-cert-type-form" contract={this.state.contract} />
        </div>
        <div className="token-box-div">
          <h3>Create Certificate (delegate only)</h3>
          <CreateCertificate id="create-cert-form" contract={this.state.contract} provider={this.props.provider} signer={this.props.signer} />
        </div>
        <div className="token-box-div">
          <h3>Redeem Certificate</h3>
          <RedeemCertificate id="redeem-cert-form" contract={this.state.contract} provider={this.props.provider} signer={this.props.signer} />
        </div>
      </div>
    );
  }
}



class ChooseToken extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectorTokens: [],
      coinABI: null,
      selectorTokenChoice: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.afterMount = this.afterMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async componentDidMount() {
    let abi = this.props.exampleCoin.interface.abi
    this.setState({coinABI: abi}, this.afterMount)
  }
  
  afterMount() {
    this.addToken(this.props.exampleCoin.address)
    let tokenAddressArray = getLocalStorageArray("CERTIFICATE_TOKEN_LIST")
    console.log(tokenAddressArray)
    tokenAddressArray.forEach(t => {
      this.addToken(t)
    });
  }

  async addToken(address) {
    
    let contract = new ethers.Contract(address, this.state.coinABI, this.props.provider);
    let symbol = await contract.symbol()
    let name = await contract.name()

    let token = {address, name, symbol}
    console.log(token)
    this.setState({ selectorTokens: [...this.state.selectorTokens, token] })
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.href = `/token/${this.state.selectorTokenChoice}`;
  }

  getSelector() {
    const { selectorTokens } = this.state


    return (
      <select name="selectorTokenChoice" onChange={this.handleChange}>
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
      <div>
        <h2>Token Finder</h2>
        <form onSubmit={this.handleSubmit}>
        {this.getSelector()}
        <br></br>
        <input type="submit" value="Go to Token" />

        </form>

        <br></br>
        <br></br>
      </div>
    )
  }
}


const TokenConsumer = (props) => (
  <MyWeb3Consumer>
    {({ loaded, networkId, signer, provider, exampleCoinContract }) => {
      if (!loaded) {
        return (<div>Loading form</div>)
      }
      if (!props.tokenId) {
        return <ChooseToken  exampleCoin={exampleCoinContract} provider={provider} />
      }
      return (
        <div className="token-page">
          <h1>Token Page</h1>
          <Token tokenAddress={props.tokenId} templateAddress={exampleCoinContract.address} networkId={networkId} signer={signer} provider={provider} />
        </div>
      )
    }}
  </MyWeb3Consumer>
);


export default TokenConsumer;