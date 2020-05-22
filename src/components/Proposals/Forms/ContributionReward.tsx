import * as React from "react";
import { FormControl, TextField, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginLeft: 25
    },
    input: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

export function ContributionRewardForm() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <FormControl className={classes.input}>
            <TextField id="title" label="Title" color="primary" />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.input}>
            <TextField id="beneficiary" label="Beneficiary" color="primary" />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth className={classes.input}>
            <TextField fullWidth id="description" label="Description" color="primary" />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.input}>
            <TextField id="ethReward" label="Eth Reward" color="primary" />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.input}>
            <TextField id="reputationReward" label="Reputation Reward" color="primary" />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
