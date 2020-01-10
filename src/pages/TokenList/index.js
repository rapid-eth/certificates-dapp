import React from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext";

const Dapp = props => (
  <MyWeb3Consumer>
    {({ loaded }) => {
      if (!loaded) {
        return <div>Loading contracts from Context</div>;
      }
      return (
        <div className="list-page">
          <h1>Token List Page</h1>
        </div>
      );
    }}
  </MyWeb3Consumer>
);

export default Dapp;
