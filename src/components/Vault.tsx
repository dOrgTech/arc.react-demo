import * as React from "react";
import { Token, TokenData, DAOData, DAOEntity, TokenEntity } from "@dorgtech/arc.react";
import { Button, Typography } from "@material-ui/core";
import { formatTokens } from "../utils/protocolHelpers";

interface IProps {
  dao: DAOData;
  daoEntity: DAOEntity
}

export const Vault = (props: IProps) => {
  const [ethBalance, setEthBalance] = React.useState<number>(0)
  const toEtherscan = () => {
    window.location.href = `https://etherscan.io/tokenholdings?a=${props.dao.id}`;
  };

  return (
    // We just use the token element because is being inferred the DAO data
    <>
      <Token>
        <Token.Data>
        <Token.Entity>
          {(token: TokenData, tokenEntity: TokenEntity) => (
            <div>
              {/* <Typography variant="h6" align="center">
                {tokenEntity.balanceOf(props.dao.id).subscribe((data: any) => data.toNumber())}
              </Typography> */}
              <Typography variant="h6" align="center">
                {token.name}: {formatTokens(token.totalSupply)} {token.symbol}
              </Typography>
            </div>
          )}
        </Token.Entity>
        </Token.Data>
      </Token>
      <Button onClick={toEtherscan}>Go to etherscan</Button>
    </>
  );
};
