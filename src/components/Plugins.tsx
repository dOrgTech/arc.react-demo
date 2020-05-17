import React, { useState } from "react";
import { Plugin, PluginEntity, Plugins, PluginData, Proposals, Proposal, ProposalData } from "@daostack/arc.react";
import { Grid } from "@material-ui/core";
import { createProposal } from "../utils/mocks";

interface IProposalProps {
  pluginType: "ReputationFromToken" | "Unknown" | "FundingRequest" | "JoinAndQuit" | "GenericScheme" | "SchemeRegistrar" | "ContributionReward" | "ContributionRewardExt" | "Competition" | "SchemeFactory" | "SchemeRegistrarAdd" | "SchemeRegistrarRemove"
}

export const ProposalPlugins = (props: IProposalProps) => {
  const { pluginType } = props;
  return (
    <>
      <Proposals from="Plugin">
        <Proposal.Data>
          {(proposalData: ProposalData) => 
            (proposalData.plugin.entity.coreState?.name === pluginType && 
              <div> { proposalData.id}</div>
            )
          }
        </Proposal.Data>
      </Proposals>
    </>
  );
};

export const DAOPlugins = () => {
  const [pluginSelected, setPluginSelected] = useState<string | null>(null);

  return (
    <Plugins from={"DAO"}>
      <Plugin.Data>
        {(pluginData: PluginData) => (
          <>
            <div>{pluginData.name}</div>
            <Plugin.Entity>
              {(pluginEntity: PluginEntity) => (
                <Grid>
                  <button onClick={e => createProposal(pluginEntity, pluginData.dao)}>Create proposal</button>
                  <button onClick={() => setPluginSelected(pluginData.name)}>See proposals</button>
                </Grid>
              )}
            </Plugin.Entity>
            {pluginSelected === pluginData.name && <ProposalPlugins pluginType={pluginSelected} />}
          </>
        )}
      </Plugin.Data>
    </Plugins>
  );
};
