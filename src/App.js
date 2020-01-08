import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

import './App.css';
import { Router } from "@reach/router"
import Home from "./pages/Home"
import TokenList from "./pages/TokenList"
import Deploy from "./pages/Deploy"
import TokenPage from "./pages/Token"
import { MyWeb3Provider } from "./web3/EthersContext"
function App() {
  return (
    <div className="app-class">
      <MyWeb3Provider>
        <Header />
        <Router>
          <Home path="/" />
          <TokenList path="/list" />
          <Deploy path="/deploy" />
          <TokenPage path="/token" />
          <TokenPage path="/token/:tokenId" />
        </Router>
        <Footer />
      </MyWeb3Provider>
    </div>

  );
}

export default App;