import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction, Typography, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HistoryIcon from "@material-ui/icons/History";
import { DAO, DAOData } from "@daostack/arc.react";

import { DAOPlugins, DAOMembers, DAOProposals, Vault } from "./";

const useStyles = makeStyles({
  root: {
    width: 500
  },
  daoInfo: {
    paddingTop: 10
  }
  
});

const DAO_ADDRESS = "0x45267c65df13e19554d60cb6e08ca361fcde5230"

export function Views() {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const sections = [DAOPlugins, DAOMembers, DAOProposals, Vault];

  const Tab = () => (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        if (newValue === 3) {
          window.location.href = `https://etherscan.io/tokenholdings?a=${DAO_ADDRESS}`
        } 
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Plugins" icon={<BuildIcon />} />
      <BottomNavigationAction label="Members" icon={<GroupIcon />} />
      <BottomNavigationAction label="History" icon={<HistoryIcon />} />
      <BottomNavigationAction label="Vault" icon={<AccountBalanceIcon />} />
    </BottomNavigation>
  );

  const CurrentSection = sections[value];

  return (
    <>
      <DAO address={DAO_ADDRESS}>
        <DAO.Data>
          {(dao: DAOData) => (
            <>
              <Paper variant="outlined" style={{ width: 400, height: 50 }}>
                <Typography className={classes.daoInfo} align="center" variant="subtitle1">{`${dao.name}'s DAO`}</Typography>
              </Paper>
              {/* <div>{"DAO rep total: " + Math.floor(Number(dao.reputationTotalSupply))}</div> */}
              <Tab />
              <CurrentSection dao={dao} />
            </>
          )}
        </DAO.Data>
      </DAO>
    </>
  );
}
