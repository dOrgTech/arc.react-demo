import { PluginEntity } from "@dorgtech/arc.react";
import {
  // BN,
  IProposalCreateOptionsCR,
  IProposalCreateOptionsCRExt,
  IProposalCreateOptionsComp,
  IProposalCreateOptionsFundingRequest,
  IProposalCreateOptionsGS,
  IProposalCreateOptionsJoinAndQuit,
  IProposalCreateOptionsSR,
  IProposalBaseCreateOptions
} from "./types";

export const PluginRegistrar = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsSR = {
    dao,
    descriptionHash: '',
    parametersHash:
      "0x0000000000000000000000000000000000000000000000000000000000001234",
    permissions: "0x0000001f",
    plugin,
    pluginToRegister: "0xde949f934a0f8eae610f4b0a0c4f64211b62dfe1",
    type: "SchemeRegistrarAdd",
    tags: ["First tag", "Second tag"],
  };
  return values;
};

export const ContributionReward = (dao: string, plugin: string, creator?: string) => {
  const values: IProposalCreateOptionsCR = {
    beneficiary: "0xffcf8fdee72ac11b5c542428b35eef5769c409f0",
    dao,
    title: "Contribution reward proposal",
    description: `Proposal created by: ${creator}`,
    ethReward: "300000000000",
    externalTokenAddress: undefined,
    externalTokenReward: "0",
    nativeTokenReward: "1",
    reputationReward: "10",
    plugin,
  };
  return values;
};

export const ContributionRewardExt = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsCRExt = {
    beneficiary: "0xffcf8fdee72ac11b5c542428b35eef5769c409f0",
    dao,
    ethReward: "30000000000",
    externalTokenAddress: undefined,
    externalTokenReward: "0",
    nativeTokenReward: "1",
    reputationReward: "1000000",
    plugin,
    proposer: "",
  };
  return values;
};

export const JoinAndQuit = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsJoinAndQuit = {
    descriptionHash: "hola",
    // fee: new BN(1000),
    dao,
    plugin
  };
  return values;
};

export const Competition = (dao: string, plugin: string) => {
  const time = new Date();
  const startTime = new Date(time.getSeconds() + 10);
  const suggestionsEndTime = new Date(time.getSeconds() + 100);
  const endTime = new Date(time.getSeconds() + 200);
  const values: IProposalCreateOptionsComp = {
    dao,
    endTime,
    ethReward: "10000",
    externalTokenAddress: undefined,
    externalTokenReward: '0',
    numberOfVotesPerVoter: 3,
    proposerIsAdmin: true,
    startTime,
    suggestionsEndTime,
    votingStartTime: startTime,
    rewardSplit: [50, 50],
    plugin,
    reputationReward: '10'
  };
  return values;
};

export const FundingRequest = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsFundingRequest = {
    beneficiary: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
    // amount: new BN(1000),
    descriptionHash: "0x10",
    dao,
    plugin,
  };
  return values;
};

export const GenericPlugin = (dao: string, plugin: string) => {
  const values : IProposalCreateOptionsGS = {
    dao,
    plugin,
    value: 0,
    callData: "0x"
  }
  return values
}

const triggerProposal = async (plugin: any, values: IProposalBaseCreateOptions) => {
  await plugin.createProposal(values).send();
};

export const createProposal = async (pluginEntity: PluginEntity, dao: any, creator?: string) => {
  let mockedValues: IProposalBaseCreateOptions | undefined = undefined;
  try {
    const { address } = pluginEntity.coreState!;
    switch (pluginEntity.coreState?.name) {
      case "SchemeRegistrar":
        mockedValues = PluginRegistrar(dao, address);
        break;
      case "Competition":
        mockedValues = Competition(dao, address);
        break;
      // case "JoinAndQuit":
      //   mockedValues = JoinAndQuit(dao, address);
      //   break;
      case "ContributionReward":
        mockedValues = ContributionReward(dao, address, creator);
        break;
      case "ContributionRewardExt":
        mockedValues = ContributionRewardExt(dao, address);
        break;
      // case "FundingRequest":
      //   mockedValues = FundingRequest(dao, address);
      //   break;
      case "GenericScheme":
        mockedValues = GenericPlugin(dao, address);
        break;
      default:
        console.log("Plugin not implemented");
        break;
    }
    if (mockedValues) {
      triggerProposal(pluginEntity, mockedValues);
    }
  } catch (e) {
    console.log("Error creating proposal");
    console.log(e.message);
  }
};
