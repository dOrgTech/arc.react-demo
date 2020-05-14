import React, { useState } from "react";
import { ArcConfig, Arc, networkSettings } from "@daostack/arc.react";
import { Views } from "./components"

function App() {
  // const c = new ArcConfig("private");
  let connectionParams = networkSettings["private"];
  const web3Provider = (window as any).ethereum.currentProvider || (window as any).web3.currentProvider;
  connectionParams = { ...connectionParams, web3Provider };
  const newConnection = new ArcConfig(connectionParams);
  const [provider, setProvider] = useState<any>(newConnection);

  const connectWallet = () => {
    setProvider(newConnection);
  };

  return (
    <div>
      <button onClick={connectWallet}>INICIA SESION AQUI</button>
      <Arc config={provider}>
        <Views />
      </Arc>
    </div>
  );
}

export default App;
