import * as React from "react";
import { Proposals, Proposal, ProposalData } from "@dorgtech/arc.react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Button, Typography, Divider } from "@material-ui/core";

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

export function DAOProposals() {
  const classes = useStyles();

  return (
    <Proposals from="DAO">
      <Proposal.Data>
        <Proposal.Entity>
          {(proposalData: ProposalData) => {
            const { title, description, plugin, winningOutcome } = proposalData
            return (
              <>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {title ? title : "No title"}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {description ? description : "No description"}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {plugin.entity.coreState?.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {winningOutcome === 1 ? "Passed" : "Failed"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <br />
                <Divider/>
              </>
            );
          }}
        </Proposal.Entity>
      </Proposal.Data>
    </Proposals>
  );
}
