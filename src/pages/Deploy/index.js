import React, { Component } from "react";
import DeployNewToken from "../../components/forms/DeployNewToken"
import { MyWeb3Consumer } from "../../web3/EthersContext"

class Admin1 extends Component {

    componentDidMount = async () => {
        // console.log("create component", this.props.tokenContract.options)
    }

    render() {
        return (
            <div>
                <DeployNewToken />
            </div>
        );
    }
}

const Admin = (props) => (
    <MyWeb3Consumer>
        {({ loaded, exampleCoinContract, exampleCoinFactory }) => {
            if (!loaded) {
                return (<div>Loading form</div>)
            }
            return (
                <div className="admin-page">
                    <h1>Admin Page</h1>
                    <h3>Fill out the form below to create a new token</h3>
                    <DeployNewToken id="new-token-form" factory={exampleCoinFactory} />
                </div>
            )
        }}
    </MyWeb3Consumer>
);


export default Admin;