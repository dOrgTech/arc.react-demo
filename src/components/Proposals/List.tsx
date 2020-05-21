import * as React from "react";
import { Proposals, Proposal, ProposalData, ProposalEntity, Plugins, PluginData, Plugin } from "@daostack/arc.react";
import { Divider, Select, Switch, FormControl, InputLabel, FormGroup, FormControlLabel } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { History, Actives } from "./";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      paddingBottom: 10
    }
  })
);

export function DAOProposals() {
  const classes = useStyles();
  const oldProposals = { where: { stage_in: [1, 2] } };
  const activeProposals = { where: { stage_in: [3, 4, 5] } };
  const [currentProposals, setCurrentProposals] = React.useState(activeProposals);
  const [selectedPlugin, setSelectedPlugin] = React.useState<string>("");
  const [showingHistory, setShowingHistory] = React.useState<boolean>(false);

  const changePlugin = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPlugin(event.target.value as string);
  };

  const showHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = event.target.checked ? oldProposals : activeProposals;
    setShowingHistory(event.target.checked);
    setCurrentProposals(newList);
  };

  const ProposalFilters = () => {
    return (
      <FormGroup row>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="plugin-filter">Plugin filter</InputLabel>
          <Select
            native
            value={selectedPlugin}
            onChange={changePlugin}
            inputProps={{
              name: "plugin",
              id: "plugin-filter"
            }}
          >
            <Plugins from="DAO">
              <Plugin.Data>{(pluginData: PluginData) => <option value={pluginData.id}>{pluginData.name}</option>}</Plugin.Data>
            </Plugins>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={showingHistory}
              onChange={showHistory}
              color="primary"
              name="History"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label="History"
        />
      </FormGroup>
    );
  };

  const ProposalList = () => (
    <Proposal.Data>
      <Proposal.Entity>
        {(proposalData: ProposalData, proposalEntity: ProposalEntity) =>
          showingHistory ? (
            <History proposal={proposalData} />
          ) : (
            <Actives proposalData={proposalData} proposalEntity={proposalEntity} />
          )
        }
      </Proposal.Entity>
    </Proposal.Data>
  );

  return (
    <>
      <ProposalFilters />
      <Divider />
      {selectedPlugin ? (
        <Plugin id={selectedPlugin}>
          <Proposals filter={currentProposals} from="Plugin">
            <ProposalList />
          </Proposals>
        </Plugin>
      ) : (
        <Proposals filter={currentProposals} from="DAO">
          <ProposalList />
        </Proposals>
      )}
    </>
  );
}
