import React, { useState, useContext } from "react";
import {
  Plugin,
  PluginEntity,
  Plugins,
  PluginData,
  Proposals,
  Proposal,
  ProposalData,
  ProposalEntity
} from "@daostack/arc.react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";

import { createProposal } from "../utils/mocks";
import { Web3Context } from "../utils/auth";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export const ProposalPlugins = () => {
  const classes = useStyles();
  const activeProposals = { where: { stage_in: [2, 3, 4, 5] } };
  const web3 = useContext(Web3Context);
  return (
    <Proposals filter={activeProposals} from="Plugin">
      <Proposal.Data>
        <Proposal.Entity>
          {(proposalData: ProposalData, proposalEntity: ProposalEntity) => {
            const { title, description, tags, votesFor, votesAgainst, votes } = proposalData;
            const alreadyVoted = votes.some(async (vote: any) => {
              await vote.entity.fetchState();
              return vote.entity.coreState?.voter === web3.address;
            });
            console.log(alreadyVoted);
            return (
              <>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {title ? title : "No title"}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {description ? description : "No description"}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {tags ? tags : "No tags"}
                    </Typography>
                    <Typography variant="body2" component="p">
                      For: {votesFor.toString()} - Agaisnt: {votesAgainst.toString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {alreadyVoted ? (
                      <p>Already voted</p>
                    ) : (
                      <Button
                        size="small"
                        onClick={async () => {
                          try {
                            await proposalEntity.vote(1).send();
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        Vote
                      </Button>
                    )}
                  </CardActions>
                </Card>
                <br />
                <Divider />
              </>
            );
          }}
        </Proposal.Entity>
      </Proposal.Data>
    </Proposals>
  );
};

export function DAOPlugins() {
  const [pluginSelected, setPluginSelected] = useState<string | null>(null);
  const web3 = useContext(Web3Context);

  const newProposal = (pluginEntity: PluginEntity, DAO: any) => {
    if (!web3.address) {
      console.log("please log in");
      return null;
    }
    createProposal(pluginEntity, DAO);
  };
  return (
    <List dense={true}>
      <Plugins from={"DAO"}>
        <Plugin.Data>
          <Plugin.Entity>
            {(pluginData: PluginData, pluginEntity: PluginEntity) => {
              const { numberOfPreBoostedProposals, numberOfBoostedProposals, numberOfQueuedProposals } = pluginData;
              const hasProposals = !!(numberOfPreBoostedProposals || numberOfBoostedProposals || numberOfQueuedProposals);
              return (
                <>
                  <ListItem>
                    <ListItemText primary={pluginData.name} />
                    <ListItemAvatar>
                      <IconButton
                        onClick={() => newProposal(pluginEntity, pluginData.dao)}
                        edge="end"
                        aria-label="New proposal"
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemAvatar>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => setPluginSelected(pluginData.name)} edge="end" aria-label="View all">
                        <VisibilityIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {pluginSelected === pluginData.name &&
                    (hasProposals ? <ProposalPlugins /> : <Typography align="center">No upcoming proposals</Typography>)}
                </>
              );
            }}
          </Plugin.Entity>
        </Plugin.Data>
        <Divider />
      </Plugins>
    </List>
  );
}
