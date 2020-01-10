import React from "react";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import "./App.css";
import { createHistory, LocationProvider, Router } from "@reach/router";
import createHashSource from "hash-source";
import Home from "./pages/Home";
import TokenList from "./pages/TokenList";
import Deploy from "./pages/Deploy";
import TokenPage from "./pages/Token";
import { MyWeb3Provider } from "./web3/EthersContext";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./dAppTheme";
let source = createHashSource();
let history = createHistory(source);

function App() {
  return (
    <div className="app-class">
      <MyWeb3Provider>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Router>
            <Home path="/" />
            <TokenList path="/list" />
            <Deploy path="/deploy" />
            <TokenPage path="/token" />
            <TokenPage path="/token/:tokenId" />
          </Router>
        </MuiThemeProvider>
      </MyWeb3Provider>
      <MuiThemeProvider theme={theme}></MuiThemeProvider>
    </div>
  );
}

export default App;
