import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

import './App.css';
import { Router } from "@reach/router"

import Home from "./pages/Home"
import TokenList from "./pages/TokenList"
import Deploy from "./pages/Deploy"
import TokenPage from "./pages/Token"
import LockboxPage from "./pages/Lockbox"
import { MyWeb3Provider } from "./web3/EthersContext"
import Web3NotFound from './web3/web3NotFoundPage';


function App() {
  return (
    <>
    <div className="app-class">

      <MyWeb3Provider>
        <Header />
        <div className="page-div">
          <Router>
            <Home path="/" />
            <TokenList path="/list" />
            <Deploy path="/deploy" />
            <TokenPage path="/token" />
            <TokenPage path="/token/:tokenId" />
            <LockboxPage path="/lockbox" />
            <LockboxPage path="/lockbox/:tokenId" />
            <Web3NotFound path="/web3NotFound" />
          </Router>
        </div>
      </MyWeb3Provider>
      <Footer />

    </div>

</>
  );
}

export default App;