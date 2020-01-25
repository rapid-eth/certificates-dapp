import React, { Component } from "react";
import { Link }from "@reach/router"
import "./index.css"
class Home extends Component {
  render() {
    return (
        <div className="home-page-div">
          <h2>Welcome to the ERC20 Certificates Ðapp</h2>
          <p>
            The ERC20 Certificate Token is a solidity smart contract extension of the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md">ERC20 Token Standard</a> which adds the ability for contract owners and their delegates to create and sign redeemable certificates without needing to create an on-chain transaction.
          </p>
          <h2>Why?</h2>
          <p>
           The concept of certificates can be applied to many use cases, for instance a Dapp creator who would like to distribute tokens as a reward but does not want to have to worry about paying the transaction fees for each and every token transfer. By signing a certificate, he now places the burden of creating the transaction to transfer the token on the redeemer.
          </p>
          <h2>How can I experiment with this?</h2>
          <p>
          This Dapp was created to allow experimentation with ERC20 Token Certificates. You can use this site to:
          </p>

          <ul>
          <li><Link to="/deploy">Deploy your own token certificate contract</Link> </li>
          <li><Link to="/token">Create/Sign/Redeem Certificates for your token</Link> </li>
          <li><Link to="/lockbox">Use our Token Lockbox to use certificate functionality with normal, existing ERC20 Tokens</Link> </li>


          </ul>
          <h2>Where can I learn more?</h2>
          <ul>
            <li>Smart Contract Github: <a href="https://github.com/rapid-eth/erc20-certificates">https://github.com/rapid-eth/erc20-certificates</a></li>
            <li>Dapp Github: <a href="https://github.com/rapid-eth/certificates-dapp">https://github.com/rapid-eth/certificates-dapp</a></li>
            <li>ERC20 Token Standard: <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md">https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md</a></li>
            <li>Rapid Team: <a href="https://rapidteam.io">https://rapidteam.io</a></li>
          </ul>
        </div>

    );
  }
}

export default Home;