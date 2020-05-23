import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction, Typography, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { DAO, DAOData } from "@dorgtech/arc.react";

import { DAOMembers, DAOProposals, Vault } from "./";
import { formatTokens } from "../utils/protocolHelpers";

const useStyles = makeStyles({
  root: {
    width: 500
  },
  daoInfo: {
    paddingTop: 10
  }
});

const DAO_ADDRESS = "0x45267c65df13e19554d60cb6e08ca361fcde5230";

export function Views() {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const sections = [DAOProposals, DAOMembers, Vault];

  const Tab = () => (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Proposals" icon={<BuildIcon />} />
      <BottomNavigationAction label="Members" icon={<GroupIcon />} />
      <BottomNavigationAction label="Vault" icon={<AccountBalanceIcon />} />
    </BottomNavigation>
  );

  const CurrentSection = sections[value];

  return (
    <>
      <DAO address={DAO_ADDRESS}>
        <DAO.Data>
          {(daoData: DAOData) => {
            return (
              <>
                <Paper variant="outlined" style={{ width: 400, height: 85 }}>
                  <Typography className={classes.daoInfo} align="center" variant="subtitle1">
                    {daoData.name}
                  </Typography>
                  <Typography className={classes.daoInfo} align="center" variant="subtitle1">
                    {formatTokens(daoData.reputationTotalSupply)} REP
                  </Typography>
                </Paper>
                <Tab />
                <CurrentSection dao={daoData} />
              </>
            );
          }}
        </DAO.Data>
      </DAO>
    </>
  );
}
