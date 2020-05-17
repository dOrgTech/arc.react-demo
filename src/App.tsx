import React, { useState, useEffect } from "react";
import { ArcConfig, Arc, networkSettings } from "@daostack/arc.react";
import { Views } from "./components";
import { Grid } from "@material-ui/core";

function App() {
  // const c = new ArcConfig("private");

  let connectionParams = networkSettings["private"];
  const web3Provider = (window as any).ethereum.currentProvider || (window as any).web3.currentProvider;
  connectionParams = { ...connectionParams, web3Provider };
  const newConnection = new ArcConfig(connectionParams);
  // setProvider(newConnection);  
  const [provider, setProvider] = useState<any>(newConnection);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // connectWallet()
  }, [])



  const connectWallet = () => {
    setLoading(true)
    let connectionParams = networkSettings["private"];
    const web3Provider = (window as any).ethereum.currentProvider || (window as any).web3.currentProvider;
    connectionParams = { ...connectionParams, web3Provider };
    const newConnection = new ArcConfig(connectionParams);
    setProvider(newConnection);
    setLoading(false)
  };

  return (
    <>
      <button onClick={connectWallet}>INICIA SESION AQUI</button>
      <Grid container direction="column" justify="center" alignItems="center">
        {!loading ? (
          <Arc config={provider}>
            <Views />
          </Arc>
        ) : (
          <h1>
            Loading
          </h1>
        )}
      </Grid>
    </>
  );
}

export default App;
