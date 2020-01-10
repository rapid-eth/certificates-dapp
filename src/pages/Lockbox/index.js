import React, { Component } from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext"
import { ethers } from 'ethers';
import getContracts from "../../web3/getContracts";
import TokenMeta from "../../components/TokenMeta"

import CreateLockboxCertificate from "../../components/forms/CreateLockboxCertificate"

import RedeemLockboxCertificate from "../../components/forms/RedeemLockboxCertificate"
import ChooseToken from "../../components/forms/ChooseToken"

import "./index.css"

class Lockbox extends Component {

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

      let contracts = getContracts(this.props.networkId)
      const exampleCoinJSON = contracts.exampleCoin

      let contract = new ethers.Contract(this.props.tokenAddress, exampleCoinJSON.abi, this.props.signer);

      this.setState({ contract }, this.setLoaded)
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
      <div className="lockbox-box-div">
        <h3>Token Data</h3>
        <TokenMeta contract={this.state.contract} />
      </div>
      <div className="lockbox-box-div">
        <h3>Create Lockbox Certificate</h3>
        <CreateLockboxCertificate id="create-cert-form" tokenContract={this.state.contract} lockboxContract={this.props.lockboxContract} provider={this.props.provider} signer={this.props.signer} />
      </div>
      <div className="lockbox-box-div">
        <h3>Redeem Lockbox Certificate</h3>
        <RedeemLockboxCertificate id="redeem-cert-form" contract={this.state.contract} lockboxContract={this.props.lockboxContract} provider={this.props.provider} signer={this.props.signer} />
      </div>
    </div>
  );
}
}

const TokenConsumer = (props) => (
  <MyWeb3Consumer>
    {({ loaded, networkId, signer, provider, exampleCoinContract, lockboxContract }) => {
      if (!loaded) {
        return (<div>Loading form</div>)
      }
      if (!props.tokenId) {
        return <ChooseToken  exampleCoin={exampleCoinContract} provider={provider} route="lockbox"/>
      }
      return (
        <div className="token-page">
          <h1>Lockbox Page</h1>
          <Lockbox tokenAddress={props.tokenId} templateAddress={exampleCoinContract.address} networkId={networkId} signer={signer} provider={provider} lockboxContract={lockboxContract}/>
        </div>
      )
    }}
  </MyWeb3Consumer>
);


export default TokenConsumer;