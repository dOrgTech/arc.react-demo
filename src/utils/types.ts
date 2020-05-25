import BN from 'bn.js'
export { BN }
export interface IProposalBaseCreateOptions {
    dao: string;
    description?: string;
    descriptionHash?: string;
    title?: string;
    tags?: string[];
    plugin?: string;
    url?: string;
}

export interface IProposalCreateOptionsComp extends IProposalBaseCreateOptions {
  endTime: Date;
  reputationReward?: string;
  ethReward?: string;
  externalTokenReward?: string;
  externalTokenAddress?: string;
  rewardSplit: number[];
  nativeTokenReward?: string;
  numberOfVotesPerVoter: number;
  proposerIsAdmin?: boolean;
  startTime: Date | null;
  suggestionsEndTime: Date;
  votingStartTime: Date;
}

export interface IProposalCreateOptionsCR extends IProposalBaseCreateOptions {
  beneficiary: string;
  nativeTokenReward?: string;
  reputationReward?: string;
  ethReward?: string;
  externalTokenReward?: string;
  externalTokenAddress?: string;
  periodLength?: number;
  periods?: any;
}

export interface IProposalCreateOptionsCRExt extends IProposalBaseCreateOptions {
  beneficiary: string;
  nativeTokenReward?: string;
  reputationReward?: string;
  ethReward?: string;
  externalTokenReward?: string;
  externalTokenAddress?: string;
  proposer: string;
}

export interface IProposalCreateOptionsFundingRequest extends IProposalBaseCreateOptions {
  beneficiary: string;
  amount: BN;
  descriptionHash: string;
}

export interface IProposalCreateOptionsGS extends IProposalBaseCreateOptions {
  callData?: string;
  value?: number;
}

export interface IProposalCreateOptionsJoinAndQuit extends IProposalBaseCreateOptions {
  descriptionHash: string;
  fee: BN;
}

export interface IProposalCreateOptionsSR extends IProposalBaseCreateOptions {
  type: 'SchemeRegistrarAdd' | 'SchemeRegistrarEdit' | 'SchemeRegistrarRemove';
  parametersHash?: string;
  permissions?: string;
  pluginToRegister?: string;
}