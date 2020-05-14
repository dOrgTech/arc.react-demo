import React from "react";
import { Plugin, DAO, DAOData, Plugins, PluginData } from "@daostack/arc.react";
import {
  SchemeRegistrar,
  ContributionReward,
  ContributionRewardExt,
  JoinAndQuit,
  Competition,
  FundingRequest
} from "../utils/mocks";
import { IProposalBaseCreateOptions } from "../utils/types";

export const DAOPlugins = () => (
  <Plugins from={"DAO"}>
    <Plugin.Data>
      {(pluginData: PluginData) => (
        <>
          <div>{pluginData.name}</div>
          <div>{pluginData.address}</div>
          <div>{pluginData.id}</div>
          <Plugin.Entity>
            {(pluginEntity: any) => (
              <button onClick={e => createProposal(pluginEntity, pluginEntity.coreState.dao)}>Create proposal</button>
            )}
          </Plugin.Entity>
        </>
      )}
    </Plugin.Data>
  </Plugins>
);

const triggerProposal = async (plugin: any, values: IProposalBaseCreateOptions) => {
  const proposal = await plugin.createProposal(values).send();
  console.log(proposal);
};

const createProposal = async (pluginEntity: any, dao: string) => {
  console.log(dao);
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
      console.log(mockedValues);
      console.log(pluginEntity);
      triggerProposal(pluginEntity, mockedValues);
    }
  } catch (e) {
    console.log("Error creating proposal");
    console.log(e.message);
  }
};
