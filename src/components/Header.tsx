import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Web3Context } from "../utils/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

interface IProps {
  connectWallet: Function;
}

export function Header(props: IProps) {
  const classes = useStyles();
  const provider = useContext(Web3Context);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {provider.address ? (
            <p>
              Logged as <Typography noWrap style={{width: 100}}>{provider.address}</Typography>
            </p>
          ) : (
            <Button
              onClick={async () => {
                const address = await props.connectWallet();
                provider.setAddress(address);
              }}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
