import React, { Component } from "react";

class Token extends Component {

    constructor(props) {
      super(props);
      this.state = {
        contractLoaded: false,
        loadingMessage: "Loading Contract...",
        owner: null
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

        let symbol = await this.props.contract.symbol()
        let name = await this.props.contract.name()
        let owner = await this.props.contract.owner()
        let supply = await this.props.contract.totalSupply()
        let balance = await this.props.contract.balanceOf(window.ethereum.selectedAddress)
        let cap = await this.props.contract.cap()

  
        console.log(supply.toString())
        this.setState({ symbol, name, owner, supply: supply.toString(), balance: balance.toString(), cap: cap.toString() }, this.setLoaded)
  
      } catch (err) {
        console.log(err)
        this.setState({ loadingMessage: err.toString() })
  
      }
    }
  
    render() {
      if (!this.state.contractLoaded) {
        return (<div>{this.state.loadingMessage}</div>)
      }
      return (
        <div>
          <label>Name:</label>
          <span>{this.state.name}</span>
          <br></br>
          <label>Symbol:</label>
          <span>{this.state.symbol}</span>
          <br></br>
          <label>Owner:</label>
          <span>{this.state.owner}</span>
          <br></br>
          <label>Balance:</label>
          <span>{this.state.balance}</span>
          <br></br>
          <label>Total Supply:</label>
          <span>{this.state.supply}</span>
          <br></br>
          <label>Cap:</label>
          <span>{this.state.cap}</span>
          <br></br>
        </div>
      );
    }
  }

  export default Token;