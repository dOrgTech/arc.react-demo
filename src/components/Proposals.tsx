import * as React from "react";
import { Proposals, Proposal, ProposalData, ProposalEntity } from "@daostack/arc.react";

export const DAOProposals = () => {
  return (
    <Proposals from="DAO">
      <Proposal.Data>
        <Proposal.Entity>
          {(proposalData: ProposalData, proposalEntity: ProposalEntity) => {
            return (
              <>
                <h4>Created at: {proposalData.createdAt}</h4>
                <button
                  onClick={async () => {
                    try {
                      await proposalEntity.vote(1);
                      console.log("Vote worked!");
                    } catch (e) {
                      console.log("Vote failed!");
                      console.log(e.message);
                    }
                  }}
                >
                  Vote!
                </button>
              </>
            );
          }}
        </Proposal.Entity>
      </Proposal.Data>
    </Proposals>
  );
};
