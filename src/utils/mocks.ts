import {
  IProposalCreateOptionsCR,
  IProposalCreateOptionsCRExt,
  IProposalCreateOptionsComp,
  IProposalCreateOptionsFundingRequest,
  IProposalCreateOptionsGS,
  IProposalCreateOptionsJoinAndQuit,
  IProposalCreateOptionsSR,
} from "./types";

export const SchemeRegistrar = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsSR = {
    dao,
    description: "Proposal from DAOComponents :-)",
    parametersHash:
      "0x0000000000000000000000000000000000000000000000000000000000001234",
    permissions: "0x0000001f",
    plugin,
    pluginToRegister: "0xde949f934a0f8eae610f4b0a0c4f64211b62dfe1",
    proposalType: "SchemeRegistrarAdd",
    tags: ["First tag", "Second tag"],
  };
  return values;
};

export const ContributionReward = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsCR = {
    beneficiary: "0xffcf8fdee72ac11b5c542428b35eef5769c409f0",
    dao,
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
    descriptionHash: "0x10",
    fee: "10000",
    dao,
    description: "Join and Quit from DAOComponents",
    title: "Yes",
    plugin,
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
    externalTokenAddress: undefined,
    numberOfVotesPerVoter: 3,
    proposerIsAdmin: true,
    ethReward: "10000",
    startTime,
    suggestionsEndTime,
    votingStartTime: startTime,
    endTime,
    rewardSplit: [50, 50],
    plugin,
  };
  return values;
};

export const FundingRequest = (dao: string, plugin: string) => {
  const values: IProposalCreateOptionsFundingRequest = {
    beneficiary: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
    amount: "100000",
    descriptionHash: "0x10",
    dao,
    description: "Join and Quit from DAOComponents",
    title: "Yes",
    plugin,
  };
  return values;
};
