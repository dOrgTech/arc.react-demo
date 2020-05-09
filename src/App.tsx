import React, { useState } from "react";
import { Plugin, DAO, DAOData, ArcConfig, Arc, Plugins, PluginData, networkSettings, DAOs } from "@dorgtech/daocomponents";
import {
  SchemeRegistrar,
  ContributionReward,
  ContributionRewardExt,
  JoinAndQuit,
  Competition,
  FundingRequest
} from "./utils/mocks";
import { IProposalBaseCreateOptions } from "./utils/types";

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

  const triggerProposal = async (plugin: any, values: IProposalBaseCreateOptions) => {
    const proposal = await plugin.createProposal(values).send();
    console.log(proposal);
  };

  const createProposal = async (pluginEntity: any, dao: string) => {
    let mockedValues: IProposalBaseCreateOptions | undefined = undefined;
    try {
      const { address } = pluginEntity.coreState;
      switch (pluginEntity.coreState.name) {
        case "SchemeRegistrar":
          mockedValues = SchemeRegistrar(dao, address);
          break;
        case "Competition":
          mockedValues = Competition(dao, address);
          break;
        case "JoinAndQuit":
          mockedValues = JoinAndQuit(dao, address);
        case "ContributionReward":
          mockedValues = ContributionReward(dao, address);
          break;
        case "ContributionRewardExt":
          mockedValues = ContributionRewardExt(dao, address);
          break;
        case "FundingRequest":
          mockedValues = FundingRequest(dao, address);
          break;
        default:
          console.log("Plugin not implemented");
      }
      if (mockedValues) {
        triggerProposal(pluginEntity, mockedValues);
      }
    } catch (e) {
      console.log("Error creating proposal");
      console.log(e.message);
    }
  };

  const DAOPlugins = () => (
    <DAO address={"0x68728fe67fb1fbae9076110f98e9ba3f5a00f936"}>
      <DAO.Data>{(dao: DAOData) => <div>{"DAO name: " + dao.name}</div>}</DAO.Data>
      <Plugins from={"DAO"}>
        <Plugin.Data>
          {(pluginData: PluginData) => (
            <>
              <div>{pluginData.name}</div>
              <div>{pluginData.address}</div>
              <div>{pluginData.id}</div>
              <Plugin.Entity>
                {(pluginEntity: any) => (
                  <button onClick={e => createProposal(pluginEntity, pluginData.dao.id)}>Create proposal</button>
                )}
              </Plugin.Entity>
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
