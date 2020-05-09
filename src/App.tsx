import React, { useState, useEffect } from "react";
import { Plugin, DAO, DAOData, ArcConfig, Arc, Plugins, PluginData, networkSettings, DAOs } from "@dorgtech/daocomponents";
import { connectWallet } from "./utils/ethers";

function App() {
  const c = new ArcConfig("private")
  let connectionParams = networkSettings["private"]
  const web3Provider = (window as any).ethereum.currentProvider || (window as any).web3.currentProvider
  connectionParams = { ...connectionParams, web3Provider }
  const newConnection = new ArcConfig(connectionParams)
  const [provider, setProvider] = useState<any>(newConnection);

  const connectWallet = () => {
    // console.log(c)
    // console.log(connectionParams)
    // console.log(newConnection)
    // setProvider(newConnection)
  };

  

  const DAOPlugins = () => (
    <DAO address={"0xde949f934a0f8eae610f4b0a0c4f64211b62dfe1"}>
      <DAO.Data>{(dao: DAOData) => <div>{"DAO name: " + dao.name}</div>}</DAO.Data>
      <Plugins from={"DAO"}>
        <Plugin.Data>
          {(pluginData: PluginData) => (
            <>
              <div>{pluginData.name}</div>
              <div>{pluginData.address}</div>
              {pluginData.name === "SchemeRegistrar" && (
                <Plugin.Entity>
                  {(pluginEntity: any) => (
                    <button
                      onClick={async () => {
                        try {
                          const p = await pluginEntity.createProposal({
                            dao: "0xde949f934a0f8eae610f4b0a0c4f64211b62dfe1",
                            description: 'Proposal from DAOComponents :-)',
                            parametersHash: '0x0000000000000000000000000000000000000000000000000000000000001234',
                            permissions: '0x0000001f',
                            plugin: pluginEntity.coreState.address,
                            pluginToRegister: "0xde949f934a0f8eae610f4b0a0c4f64211b62dfe1",
                            proposalType: "SchemeRegistrarAdd",
                            tags: [ "FIRST" ]
                          }).send()
                          console.log(p)
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      Create proposal
                    </button>
                  )}
                </Plugin.Entity>
              )}
            </>
          )}
        </Plugin.Data>
      </Plugins>
    </DAO>
  );

  const DAOList = () => (
    <DAOs>
      <DAO.Data>
        {(dao: DAOData) => (
          <>
            <div>{dao.name}</div>
            <div>{dao.address}</div>
          </>
        )}
      </DAO.Data>
    </DAOs>
  );

  return (
    <div>
      <button onClick={connectWallet}>INICIA SESION AQUI</button>
      <Arc config={provider}>
        <DAOPlugins />
      </Arc>
    </div>
  );
}

export default App;
