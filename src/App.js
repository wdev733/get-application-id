import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UseWalletProvider } from "use-wallet";

import Routes from "./routes";

import { NETWORK } from "./helper/constant";

const App = () => {
  return (
    <UseWalletProvider chainId={NETWORK.ROPSTEIN}>
      <Router>
        <Routes />
        <ToastContainer />
      </Router>
    </UseWalletProvider>
  );
};

export default App;
