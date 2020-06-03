import * as React from "react";
import { Proposals,
  Proposal,
  ProposalData,
  ProposalEntity,
  Plugins,
  Plugin,
  DAOData,
  usePlugin, 
  EmptyView
} from "@dorgtech/arc.react";
import { 
  Divider,
  Select,
  Switch,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Fade,
  Typography 
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import BN from "bn.js";

import { History, Actives } from "./";
import { Create } from "./Create";

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

interface IProps {
  dao: DAOData;
}

export function DAOProposals(props: IProps) {
  const { dao } = props;
  const classes = useStyles();
  const oldProposals = { where: { stage_in: [0, 1] } };
  const activeProposals = { where: { stage_in: [2, 3, 4, 5] }, orderBy: "closingAt", orderDirection: "desc" };
  const [currentProposals, setCurrentProposals] = React.useState<any>(activeProposals);
  const [selectedPlugin, selectPlugin] = React.useState<string>("");
  const [showingHistory, setShowingHistory] = React.useState<boolean>(false);
  const [creatingProposal, setCreatingProposal] = React.useState<boolean>(false);
  const [daoPlugins, setDaoPlugins] = React.useState<any>([{ id: "", name: "All plugins" }])

  const changePlugin = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === "") {
      const newList = showingHistory ? oldProposals : activeProposals;
      setCurrentProposals(newList);
    }
    selectPlugin(event.target.value as string);
  };

  const showHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = event.target.checked ? oldProposals : activeProposals;
    setShowingHistory(event.target.checked);
    setCurrentProposals(newList);
  };

  const newView = () => {
    setCreatingProposal(true);
  };

  const ProposalFilters = () => {
    return (
      <>
        <Plugins from="DAO">
          <PluginOptions />
        </Plugins>
        <FormGroup row>
          <Typography style={{ marginTop: "6.5px", marginRight: "6px" }} variant="body1">Active</Typography >
          <FormControlLabel
            control={
              <Switch
                checked={showingHistory}
                onChange={showHistory}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Historical"
          />
          {selectedPlugin && <AddBoxIcon style={{ paddingTop: 7 }} onClick={newView} />}
        </FormGroup>
        <FormControl className={classes.formControl}>
          <Select 
            native
            value={selectedPlugin}
            onChange={changePlugin}
          >
            {daoPlugins.map((plugin: any)=><option key={`plugin_${plugin.id}`} value={plugin.id}>{plugin.name}</option>)}
          </Select>
          <FormHelperText>Plugin filter</FormHelperText>
        </FormControl>
      </>
    );
  };

  const PluginOptions = () => {
    const [pluginData] = usePlugin()
    const checkIfExists = (plugin: any) => plugin.name === pluginData?.name
    if (!(daoPlugins.some(checkIfExists)) && pluginData) {
      setDaoPlugins([...daoPlugins, {id: pluginData?.id, name: pluginData?.name }])
    }
    return <></>
  }

  interface IListProps {
    totalRep: BN;
  }

  const ProposalList = (props: IListProps) => (
    <Proposal.Data>
      <Proposal.Entity>
        {(proposalData: ProposalData, proposalEntity: ProposalEntity) =>
          showingHistory ? (
            <History proposal={proposalData} />
          ) : (
            <Actives totalRep={props.totalRep} proposalData={proposalData} proposalEntity={proposalEntity} />
          )
        }
      </Proposal.Entity>
    </Proposal.Data>
  );

  return creatingProposal ? (
    <Fade in={creatingProposal}>
      <Plugin id={selectedPlugin}>
        <Create dao={dao} creatingProposal={setCreatingProposal} />
      </Plugin>
    </Fade>
  ) : (
    <>
      <ProposalFilters />
      <Divider />
      <EmptyView render={() => (
        <div>
          No proposals has been created for current plugin
        </div>
      )}>
        {selectedPlugin ? (
          <Plugin id={selectedPlugin}>
            <Proposals filter={currentProposals} from="Plugin">
              <ProposalList totalRep={dao.reputationTotalSupply} />
            </Proposals>
          </Plugin>
        ) : (
          <Proposals filter={currentProposals} from="DAO">
            <ProposalList totalRep={dao.reputationTotalSupply} />
          </Proposals>
        )}
      </EmptyView>
    </>
  );
}
