import React, { useState } from "react";
import { ProposalData } from "@daostack/arc.react";
import { Card, CardActions, CardContent, Button, Typography, Divider } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 400
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
  proposal: ProposalData;
}

export function History(props: IProps) {
  const classes = useStyles();
  const { title, description, stage, winningOutcome, plugin} = props.proposal
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
            {stage === 0 ? "Expired" : winningOutcome === 1 ? "Passed" : "Failed"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <br />
      <Divider />
    </>
  );
}
