import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction, Typography, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HistoryIcon from "@material-ui/icons/History";
import { DAO, DAOData, DAOEntity } from "@daostack/arc.react";

import { DAOPlugins, DAOMembers, DAOProposals, Vault } from "./";
// import { BN } from "../utils/types";

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
        if (newValue === 2) {
          window.location.href = `https://etherscan.io/tokenholdings?a=${DAO_ADDRESS}`;
        }
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Proposals" icon={<BuildIcon />} />
      <BottomNavigationAction label="Members" icon={<GroupIcon />} />
      {/* <BottomNavigationAction label="History" icon={<HistoryIcon />} /> */}
      <BottomNavigationAction label="Vault" icon={<AccountBalanceIcon />} />
    </BottomNavigation>
  );

  const CurrentSection = sections[value];

  return (
    <>
      <DAO address={DAO_ADDRESS}>
        <DAO.Data>
          {(daoData: DAOData) => {
          /*           
            const PRECISION = 2; // number of digits "behind the dot"
            const PRECISIONPOWER = 10 ** PRECISION;
            const totalRep = dao.reputationTotalSupply.mul(new BN(PRECISIONPOWER)).div(new BN(10).pow(new BN(18))).abs()
            console.log(totalRep.ltn(100000))
            const f = totalRep.div(new BN(1000000000)).toNumber() / PRECISIONPOWER
            console.log(f) 
          */
            return (
              <>
                <Paper variant="outlined" style={{ width: 400, height: 50 }}>
                  <Typography className={classes.daoInfo} align="center" variant="subtitle1">
                    {daoData.name}
                  </Typography>
                  <Typography className={classes.daoInfo} align="center" variant="subtitle1">
                    {/* {dao.reputationTotalSupply.idivn(10000000).toNumber()} */}
                  </Typography>
                </Paper>
                <Tab />
                <CurrentSection dao={daoData}/>
              </>
            );
          }}
        </DAO.Data>
      </DAO>
    </>
  );
}
