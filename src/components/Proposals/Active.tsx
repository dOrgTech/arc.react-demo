import React, { useContext } from "react";
import { Card, CardActions, CardContent, Button, Typography, Divider, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BN from 'bn.js'

import { Web3Context } from "../../utils/auth";
import { ProposalData, ProposalEntity } from "@dorgtech/arc.react";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minWidth: 400
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
  totalRep: BN
}

const showPercentage = (votes: BN, totalRep: BN) => {
  return votes.muln(100).div(totalRep).toNumber();
}

const executeVote = async (decision: number, proposalEntity: ProposalEntity) => {
  try {
    await proposalEntity.vote(decision).send();
  } catch (e) {
    console.log(e);
  }
}

export const Actives = (props: IProps) => {
  const classes = useStyles();
  const { proposalData, proposalEntity } = props;
  const [ voting, isVoting ] = React.useState<boolean>(false)
  const { title, description, tags, votesFor, votesAgainst, votes } = proposalData;
  const web3 = useContext(Web3Context);
  // is this the best way?
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
            For: {showPercentage(votesFor, props.totalRep)}% - Against: {showPercentage(votesAgainst, props.totalRep)}%
          </Typography>
        </CardContent>
        <CardActions>
          {alreadyVoted ? (
            <p>Already voted</p>
          ) : (
            <Button
              size="small"
              onClick={() => isVoting(true)}
            >
              Vote
            </Button>
          )}
        </CardActions>
      </Card>
      <br />
      <Divider />
      <Snackbar
        open={voting}
        message={title ? title : "No title "}
        action={
          <>
            <Button color="primary" size="small" onClick={() => executeVote(1, proposalEntity)}>
              For
            </Button>
            <Button color="secondary" size="small" onClick={() => executeVote(2, proposalEntity)}>
              Against
            </Button>
            <Button color="inherit" size="small" onClick={() => isVoting(false)}>
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
};
