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

      let contracts = getContracts(this.props.networkId)
      const exampleCoinJSON = contracts.exampleCoin

      let contract = new ethers.Contract(this.props.tokenAddress, exampleCoinJSON.abi, this.props.signer);
      try {
        // let deployed = await contract.getDeployed()
        // console.log(deployed)
      } catch (error) {
        console.log(error)
        console.log('caught')
        throw new Error("contract not valid")
      }

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
          <TokenMeta contract={this.state.contract} />
        </div>
        <div className="lockbox-box-div">
          <CreateLockboxCertificate id="create-cert-form" tokenContract={this.state.contract} lockboxContract={this.props.lockboxContract} provider={this.props.provider} signer={this.props.signer} />
        </div>
        <div className="lockbox-box-div">
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
        return (
          <>
            <ChooseToken title="Lockbox Token Finder" goButtonText="Go to Lockbox" exampleCoin={exampleCoinContract} provider={provider} route="lockbox" />
            <AboutLockbox />
          </>
        )
      }
      return (
        <div className="token-page">
          <h1>Lockbox Page</h1>
          <Lockbox
            tokenAddress={props.tokenId}
            templateAddress={exampleCoinContract.address}
            networkId={networkId} signer={signer}
            provider={provider}
            lockboxContract={lockboxContract} />
        </div>
      )
    }}
  </MyWeb3Consumer>
);

const AboutLockbox = () => {
  return (
    <div className="about-lockbox-div">
      <div className="inner-about-lockbox-div">

      <h2>What is Lockbox?</h2>
      <p>
        The ERC20 Lockbox is a minimal solidity smart contract that allows holders of ERC20 tokens to allocate an amount of tokens to the Lockbox and distribute signed, off-chain "certificates" which can be redeemed for the specified amount of tokens.
      </p>
      <h2>Why is Lockbox useful?</h2>
      <p>
        Lockbox enables ANY existing ERC20 token holder to have the ability to sign and distribute redeemable certificates. This could be useful to developers/token holders who want to take advantage of certificate functionality but do not want to have to upgrade and redeploy a new token contract to do so. The concept of certificates can be applied to many use cases, for instance a Dapp creator who would like to distribute tokens as a reward but does not want to have to worry about paying the transaction fees for each and every token transfer. By signing a certificate, he now places the burden of creating the transaction to transfer the token on the redeemer.
      </p>
      <h2>Where can I learn more?</h2>
      <ul>
        <li>Medium Post: <a href="https://github.com/rapid-eth/erc20-lockbox">https://github.com/rapid-eth/erc20-lockbox</a></li>
        <li>Smart Contract Github: <a href="https://github.com/rapid-eth/erc20-lockbox">https://github.com/rapid-eth/erc20-lockbox</a></li>
      </ul>
      </div>

    </div>
  )
}


export default TokenConsumer;