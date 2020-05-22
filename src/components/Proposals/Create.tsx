import React, { Dispatch, SetStateAction } from "react";
import { DAOData, PluginEntity, Plugin, PluginData } from "@dorgtech/arc.react";
import { Typography, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { createProposal } from "../../utils/mocks";
import { ContributionRewardForm } from "./Forms/ContributionReward";

interface IProps {
  pluginId: string;
  dao: DAOData;
  creatingProposal: Dispatch<SetStateAction<boolean>>;
}

export function Create(props: IProps) {
  const { pluginId, dao } = props;
  const newProposal = (pluginEntity: PluginEntity, dao: string) => {
    createProposal(pluginEntity, dao);
  };
  return (
    <div {...props}>
      RIGHT NOW THE PROPOSAL CREATION IS MOCKED - JUST CLICK THE BUTTON "CREATE HERE" :-)
      PS: DAOFACTORYINSTANCE IS NOT IMPLEMENTED YET
      <Plugin id={pluginId}>
        <Plugin.Data>
          <Plugin.Entity>
            {(pluginData: PluginData, pluginEntity: PluginEntity) => (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <KeyboardBackspaceIcon style={{ marginLeft: 40 }} onClick={() => props.creatingProposal(false)} />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{pluginData.name}</Typography>
                  </Grid>
                </Grid>
                <ContributionRewardForm />
                <button onClick={() => newProposal(pluginEntity, dao.id)}>CREATE HERE</button>
              </>
            )}
          </Plugin.Entity>
        </Plugin.Data>
      </Plugin>
    </div>
  );
}
