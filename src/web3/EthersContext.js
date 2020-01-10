import React, { Component } from "react";
import { ethers } from 'ethers';


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
      web3: null
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
      console.log(provider)

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
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
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