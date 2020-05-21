import React, { useState } from "react";
import { ArcConfig, Arc, networkSettings } from "@dorgtech/arc.react";
import { Grid } from "@material-ui/core";
import { Views, Header } from "./components";
import Web3Provider from "./utils/auth";

function App() {
  let arc = new ArcConfig("private");
  const [provider, setProvider] = useState<any>(arc);

  const connectWallet = async () => {
    let connectionParams = networkSettings["private"];
    const web3Provider = (window as any).ethereum.currentProvider || (window as any).web3.currentProvider;
    connectionParams = { ...connectionParams, web3Provider };
    arc = new ArcConfig(connectionParams);
    await arc.initialize();
    setProvider(arc);
    const web3 = arc.connection.web3;
    const accounts = await web3?.listAccounts()
    if (accounts) {
      return accounts[0];
    }
  };

  return (
    <Web3Provider>
      <Header connectWallet={connectWallet} />
      <Grid container direction="column" justify="center" alignItems="center">
        <Arc config={provider}>
          <Views />
        </Arc>
      </Grid>
    </Web3Provider>
  );
}

export default App;
