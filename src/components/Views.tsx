import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HistoryIcon from "@material-ui/icons/History";
import { DAO, DAOData } from "@daostack/arc.react";

// import { DAO_ADDRESS } from "../utils/mocks";
import { DAOPlugins, DAOMembers, DAOProposals, Vault } from "./";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

export function Views() {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const sections = [DAOPlugins, DAOMembers, DAOProposals, Vault];

  const Tab = () => (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
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
      <DAO address={"0x1e405028793fbb373947fd99852e5bb852812a2d"}>
        <DAO.Data>
          {(dao: DAOData) => (
            <>
              <div>{"DAO name: " + dao.name}</div>
              <div>{"DAO rep total: " + dao.reputationTotalSupply}</div>
            </>
          )}
        </DAO.Data>
        <Tab />
        <CurrentSection />
      </DAO>
    </>
  );
}
