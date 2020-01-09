import React, { Component } from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext";
import { ethers } from "ethers";
import getContracts from "../../web3/getContracts";
import TokenMeta from "../../components/TokenMeta";
import CreateCertificateType from "../../components/forms/CreateCertificateType";
import CreateCertificate from "../../components/forms/CreateCertificate";
import RedeemCertificate from "../../components/forms/RedeemCertificate";
import ChooseToken from "../../components/forms/ChooseToken";
import { Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
  card: {
    border: "5px solid blue",
    display: "flex",
    justifyContent: "center"
  },

  title: {
    color: "black",
    textAlign: "center",
    border: "2px solid grey",
    boxShadow: "5px 5px #888888"
  },
  pos: {
    marginBottom: 12
  },
  border: {
    border: "5px solid blue"
  }
});

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
    });
  }

  componentDidMount = async () => {
    this.loadContract();
  };

  async loadContract() {
    try {
      console.log("loading contract");
      let provider = this.props.provider;

      let templateCode = await provider.getCode(this.props.templateAddress);
      let code = await provider.getCode(this.props.tokenAddress);

      let contracts = getContracts(this.props.networkId);
      const exampleCoinJSON = contracts.exampleCoin;

      if (templateCode !== code) {
        let loadingMessage =
          "deployed contract code does not match example coin contract";
        throw loadingMessage;
      }
      let contract = new ethers.Contract(
        this.props.tokenAddress,
        exampleCoinJSON.abi,
        this.props.signer
      );
      let owner = await contract.owner();

      this.setState({ contract, owner }, this.setLoaded);
    } catch (err) {
      console.log(err);
      this.setState({ loadingMessage: err.toString() });
    }
  }

  render() {
    if (!this.state.contract) {
      return <div>{this.state.loadingMessage}</div>;
    }
    const { classes } = this.props;
    return (
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {" "}
            <h1>Token Data</h1>
            <TokenMeta contract={this.state.contract} />
          </Typography>
          <Typography variant="h5" component="h2">
            <h3>Create Certificate Type (admin only)</h3>
            <CreateCertificateType
              id="create-cert-type-form"
              contract={this.state.contract}
            />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <h3>Create Certificate (delegate only)</h3>

            <CreateCertificate
              id="create-cert-form"
              contract={this.state.contract}
              provider={this.props.provider}
              signer={this.props.signer}
            />
          </Typography>
          <Typography variant="body2" component="p">
            <h3>Redeem Certificate</h3>
            <RedeemCertificate
              id="redeem-cert-form"
              contract={this.state.contract}
              provider={this.props.provider}
              signer={this.props.signer}
            />
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    );
  }
}
const TokenStyles = withStyles(useStyles)(Token);
const TokenConsumer = props => (
  <MyWeb3Consumer>
    {({ loaded, networkId, signer, provider, exampleCoinContract }) => {
      if (!loaded) {
        return <div>Loading form</div>;
      }
      if (!props.tokenId) {
        return (
          <ChooseToken exampleCoin={exampleCoinContract} provider={provider} />
        );
      }

      return (
        <div className="token-page">
          <h1>Token Page</h1>
          <TokenStyles
            tokenAddress={props.tokenId}
            templateAddress={exampleCoinContract.address}
            networkId={networkId}
            signer={signer}
            provider={provider}
          />
        </div>
      );
    }}
  </MyWeb3Consumer>
);

export default withStyles(useStyles)(TokenConsumer);
