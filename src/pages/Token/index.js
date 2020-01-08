import React, { Component } from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext"
import { ethers } from 'ethers';
import getContracts from "../../web3/getContracts";
import TokenMeta from "../../components/TokenMeta"
import CreateCertificateType from "../../components/forms/CreateCertificateType"
import CreateCertificate from "../../components/forms/CreateCertificate"
import RedeemCertificate from "../../components/forms/RedeemCertificate"
import ChooseToken from "../../components/forms/ChooseToken"

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