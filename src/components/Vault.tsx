import * as React from "react";
import { Token, TokenData, DAOData } from "@dorgtech/arc.react";
import { Button, Typography } from "@material-ui/core";
import { formatTokens } from "../utils/tokenFormatter";

interface IProps {
  dao: DAOData;
}

export const Vault = (props: IProps) => {
  const toEtherscan = () => {
    window.location.href = `https://etherscan.io/tokenholdings?a=${props.dao.id}`;
  };

  return (
    // We just use the token element because is being inferred the DAO data
    <>
      <Token>
        <Token.Data>
          {(token: TokenData) => (
            <div>
              <Typography variant="h5">{token.name}</Typography>
              <Typography variant="h6" align="center">
                {formatTokens(token.totalSupply)} {token.symbol}
              </Typography>
            </div>
          )}
        </Token.Data>
      </Token>
      <Button onClick={toEtherscan}>Go to etherscan</Button>
    </>
  );
};
