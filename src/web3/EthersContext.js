import React, { Component } from "react";
import { ethers } from 'ethers';
import { navigate } from "@reach/router"
import Web3Error from "./web3Errors"

import getWeb3 from "./getWeb3";
import getContracts from "./getContracts";


const Context = React.createContext();

export class MyWeb3Provider extends Component {
  constructor(props) {
    super(props);
    this.gatherData = this.gatherData.bind(this);

    this.state = {
      loaded: false,
      gameList: [],
      refresh: () => { },
      web3: null,
      web3NotFound: false
    }
  }

  setLoaded() {
    this.setState({
      loaded: true
    })
  }

  addGameToList(gameEvent) {
    //let game = event.returned
    this.setState({
      games: gameEvent
    })
  }
  async componentDidMount() {
    this.gatherData()
  }

  async componentDidUpdate() {
    //this.gatherData()
  }

  async gatherData() {
    try {
      // Get network provider and web3 instance
      let web3
      if (!this.state.web3) {
        web3 = await getWeb3();
      } else {
        web3 = this.state.web3
      }

      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      //console.log(provider)
      try {
        await provider.ready
      } catch (e) {
        throw new Web3Error("InvalidProviderError", "Provider Invalid or Non-existent")
      }
      //console.log(provider.network)

      // check that provider is valid AND is rinkeby network
      if (provider.network.chainId !== 4) {
        throw new Web3Error("ChainIDError", "Must be on rinkeby (chainId = 4)")
      }


      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      const signer = provider.getSigner();

      const contracts = getContracts(networkId)
      const exampleCoinJSON = contracts.exampleCoin
      const lockboxJSON = contracts.lockbox

      let exampleCoinFactory = new ethers.ContractFactory(exampleCoinJSON.abi, exampleCoinJSON.bytecode, signer);
      let exampleCoinContract = new ethers.Contract(exampleCoinJSON.address, exampleCoinJSON.abi, signer);

      let lockboxContract = new ethers.Contract(lockboxJSON.address, lockboxJSON.abi, signer);

      this.setState({ web3, provider, signer, networkId, accounts, exampleCoinContract, exampleCoinFactory, lockboxContract }, this.setLoaded);
    } catch (error) {

      switch (error.type) {
        case "InvalidProviderError":
          alert("No browser web3 provider found, please install a wallet such as metamask to use this app")
          navigate("/web3NotFound")
          break;
        case "ChainIDError":
          alert("Please change your metamask network to rinkeby")
          navigate("/web3NotFound")
          break;
        default:
          break;
      }
      console.error(error);
    }

  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

}

export const MyWeb3Consumer = Context.Consumer;

export default Context