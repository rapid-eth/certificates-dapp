import React from "react";
import DeployNewToken from "../../components/forms/DeployNewToken"
import { MyWeb3Consumer } from "../../web3/EthersContext"


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