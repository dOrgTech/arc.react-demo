import React, { useState } from "react";
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

  return (
    <Proposals from="Plugin">
      <Proposal.Data>
        <Proposal.Entity>
          {(proposalData: ProposalData, proposalEntity: ProposalEntity) => {
            const { title, description, tags } = proposalData;
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
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={async () => {
                        proposalEntity.vote(1);
                      }}
                    >
                      Vote
                    </Button>
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
  return (
    <List dense={true}>
      <Plugins from={"DAO"}>
        <Plugin.Data>
          <Plugin.Entity>
            {(pluginData: PluginData, pluginEntity: PluginEntity) => {
              const { numberOfPreBoostedProposals, numberOfBoostedProposals, numberOfQueuedProposals } = pluginData;
              const hasProposals = !!(numberOfPreBoostedProposals && numberOfBoostedProposals && numberOfQueuedProposals);
              return (
                <>
                  <ListItem>
                    <ListItemText primary={pluginData.name} />
                    <ListItemAvatar>
                      <IconButton
                        onClick={e => createProposal(pluginEntity, pluginData.dao)}
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
