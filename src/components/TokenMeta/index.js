import React, { Component } from "react";
import "./index.css"
import InfoButton from "../InfoButton";
import verbiage from "../../verbiage.json"

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

  async getContractValue(fname) {
    let v
    try {
      let s = await this.props.contract[fname]()
      v = s.toString()
    } catch (error) {
      v = false
    }
    return v
  }


  async loadContract() {
    try {

      let symbol = await this.props.contract.symbol()
      let name = await this.props.contract.name()
      let owner = await this.getContractValue("owner")

      let b = await this.props.contract.balanceOf(window.ethereum.selectedAddress)
      let balance = b.toString()
      let decimals = await this.getContractValue("decimals")
      let supply = await this.getContractValue("totalSupply")

      let cap = await this.getContractValue("cap")
      console.log("cap", cap)



      console.log(supply.toString())
      this.setState({ symbol, name, owner, supply, decimals, balance, cap }, this.setLoaded)

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
      <div className="token-data-div">
        <InfoButton info={verbiage.tokenMetadata} />
        <span className="token-data-title">Token Data</span>
        <div className="token-inner-data-div" >

          <label className="token-data-label">Name:</label>
          <span className="token-data-span" >&nbsp;&nbsp;{this.state.name}</span>
          <br></br>
          <label className="token-data-label">Symbol:</label>
          <span className="token-data-span">&nbsp;&nbsp;{this.state.symbol}</span>
          <br></br>
          <OptionalLabel label="Owner" value={this.state.owner} />
          <br></br>
          <OptionalLabel label="Decimals" value={this.state.decimals} />
          <br></br>
          <label className="token-data-label">Balance:</label>
          <span className="token-data-span">&nbsp;&nbsp;{this.state.balance}</span>
          <br></br>
          <OptionalLabel label="Total Supply" value={this.state.supply} />
          <br></br>
          <OptionalLabel label="Cap" value={this.state.cap} />
        </div>
      </div>
    );
  }
}


const OptionalLabel = ({ label, value }) => {
  if (!value) {
    return (<></>)
  }
  return (
    <>
      <label className="token-data-label">{label}:</label>
      <span className="token-data-span">&nbsp;&nbsp;{value}</span>
    </>
  )
};



export default Token;