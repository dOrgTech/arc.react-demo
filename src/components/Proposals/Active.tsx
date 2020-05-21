import React, { useContext } from "react";
import { Card, CardActions, CardContent, Button, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Web3Context } from "../../utils/auth";
import { ProposalData, ProposalEntity } from "@daostack/arc.react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350
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

interface IProps {
  proposalData: ProposalData;
  proposalEntity: ProposalEntity;
}

export const Actives = (props: IProps) => {
  const classes = useStyles();
  const { proposalData, proposalEntity } = props;
  const { title, description, tags, votesFor, votesAgainst, votes } = proposalData;
  const web3 = useContext(Web3Context);
  const alreadyVoted = votes.some(async vote => {
    await vote.entity.fetchState();
    return vote.entity.coreState?.voter === web3.address;
  });
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
};
