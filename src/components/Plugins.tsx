import React from "react";
import { Plugin, Plugins, PluginData, PluginEntity, ProposalEntity } from "@daostack/arc.react";
import {
  SchemeRegistrar,
  ContributionReward,
  ContributionRewardExt,
  JoinAndQuit,
  Competition,
  FundingRequest,
  GenericPlugin
} from "../utils/mocks";
import { IProposalBaseCreateOptions } from "../utils/types";

export const DAOPlugins = () => (
  <Plugins from={"DAO"}>
    <Plugin.Data>
      {(pluginData: PluginData) => (
        <>
          <div>{pluginData.name}</div>
          <Plugin.Entity>
            {(pluginEntity: PluginEntity) => (
              <button onClick={e => createProposal(pluginEntity, pluginData.dao)}>Create proposal</button>
            )}
          </Plugin.Entity>
        </>
      )}
    </Plugin.Data>
  </Plugins>
);

const triggerProposal = async (plugin: any, values: IProposalBaseCreateOptions) => {
  await plugin.createProposal(values).send();
};

const createProposal = async (pluginEntity: PluginEntity, dao: any) => {
  let mockedValues: IProposalBaseCreateOptions | undefined = undefined;
  try {
    const { address } = pluginEntity.coreState!
    switch (pluginEntity.coreState?.name) {
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
      case "GenericScheme":
        mockedValues = GenericPlugin(dao, address);
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
