import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import TokenContract from "../contracts/rinkeby/FootballToken.json";
import FootballContract from "../contracts/rinkeby/Football.json";
import FaucetContract from "../contracts/rinkeby/Faucet.json";

const Context = React.createContext();

export class MyWeb3Provider extends Component {
  constructor(props) {
    super(props);
    this.gatherData = this.gatherData.bind(this);

    this.state = {
      loaded: false,
      gameList: [],
      refresh: ()=> {},
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
    console.log("cpmp update")
  }

  async gatherData() {
    try {
      // Get network provider and web3 instance
      let web3
      if (!this.state.web3){
        web3 = await getWeb3();
      } else {
        web3 = this.state.web3
      }

      console.log(web3.currentProvider)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = TokenContract.networks[networkId];
      const tokenContract = new web3.eth.Contract(
        TokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const fbdeployedNetwork = FootballContract.networks[networkId];
      const squaresContract = new web3.eth.Contract(
        FootballContract.abi,
        fbdeployedNetwork && fbdeployedNetwork.address,
      );

      const faucetdNetwork = FaucetContract.networks[networkId];
      const faucetContract = new web3.eth.Contract(
        FaucetContract.abi,
        faucetdNetwork && faucetdNetwork.address,
      );

      squaresContract.events.GameCreated({
        fromBlock: 0
      }, (error, event) => {
        let {gameId, owner, token, metadata} = event.returnValues
        let g = {gameId, owner, token, metadata}        
        this.setState({ gameList: [...this.state.gameList, g] }) //simple value
      })

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, networkId, accounts, squaresContract, tokenContract, faucetContract }, this.setLoaded);
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