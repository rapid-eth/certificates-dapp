import React from "react";
import DeployNewToken from "../../components/forms/DeployNewToken"
import { MyWeb3Consumer } from "../../web3/EthersContext"
import "./index.css"

const Admin = (props) => (
    <MyWeb3Consumer>
        {({ loaded, exampleCoinContract, exampleCoinFactory }) => {
            if (!loaded) {
                return (<div>Loading form</div>)
            }
            return (
                <div className="admin-page">                    
                    <DeployNewToken id="new-token-form" factory={exampleCoinFactory} />
                </div>
            )
        }}
    </MyWeb3Consumer>
);


export default Admin;