import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { DAO, DAOData } from "@daostack/arc.react";
import { DAOPlugins } from "./Plugins";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

export function Views() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const sections = [DAOPlugins];
  const Tab = () => (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Plugins" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Members" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );

  const CurrentSection = sections[value];
  return (
    <>
      <DAO address={"0x68728fe67fb1fbae9076110f98e9ba3f5a00f936"}>
        <DAO.Data>{(dao: DAOData) => <div>{"DAO name: " + dao.name}</div>}</DAO.Data>
        <Tab />
        <CurrentSection />
      </DAO>
    </>
  );
}
