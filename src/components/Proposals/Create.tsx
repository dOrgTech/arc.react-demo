import React, { Dispatch, SetStateAction, useContext } from "react";
import { DAOData, PluginEntity, usePlugin } from "@dorgtech/arc.react";
import { Typography, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { createProposal } from "../../utils/mocks";
import { Web3Context } from "../../utils/auth";
import { ContributionRewardForm } from "./Forms/ContributionReward";

interface IProps {
  dao: DAOData;
  creatingProposal: Dispatch<SetStateAction<boolean>>;
}

const newProposal = (pluginEntity: PluginEntity | undefined, dao: string) => {
  createProposal(pluginEntity as PluginEntity, dao);
};

export function Create(props: IProps) {
  const { dao, creatingProposal } = props;
  const [pluginData, pluginEntity] = usePlugin();
  const web3 = useContext(Web3Context);

  return (
    <div {...props}>
      <div style={{textAlign: "center"}}>
        RIGHT NOW THE PROPOSAL CREATION IS MOCKED - JUST CLICK THE BUTTON "CREATE HERE" :-)
        PS: DAOFACTORYINSTANCE IS NOT IMPLEMENTED YET
      </div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <KeyboardBackspaceIcon style={{ marginLeft: 40 }} onClick={() => creatingProposal(false)} />
        </Grid>
        <Grid item xs={8}>
          <Typography>{pluginData?.name}</Typography>
        </Grid>
      </Grid>
      <ContributionRewardForm />
      <button onClick={() => {
        if (web3.checkAddress()) {
          newProposal(pluginEntity, dao.id)
        }  
      }}>CREATE HERE</button>
    </div>
  );
}
