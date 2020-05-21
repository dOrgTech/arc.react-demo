import React, { Dispatch, SetStateAction } from "react";
import { DAOData, PluginEntity, Plugin, PluginData } from "@daostack/arc.react";
import { Typography } from "@material-ui/core";
import { createProposal } from "../../utils/mocks";

interface IProps {
  pluginId: string;
  dao: DAOData;
  creatingProposal: Dispatch<SetStateAction<boolean>>;
}

export function Create(props: IProps) {
  const { pluginId, dao } = props;
  const newProposal = (pluginEntity: PluginEntity, dao: string) => {
    createProposal(pluginEntity, dao)
  };
  return (
    <>
      <button onClick={() => props.creatingProposal(false)}> Go back </button>
      <Plugin id={pluginId}>
        <Plugin.Data>
          <Plugin.Entity>
            {(pluginData: PluginData, pluginEntity: PluginEntity) => (
              <>
              <Typography>
                New proposal for: {pluginData.name}
              </Typography>
              <button onClick={() => newProposal(pluginEntity, dao.id)}>CREATE HERE</button>
              </>
            )}
          </Plugin.Entity>
        </Plugin.Data>
      </Plugin>
    </>
  );
}
