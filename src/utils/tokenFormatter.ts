import BN from "bn.js";

// Getting this function from alchemy
// https://github.com/daostack/alchemy/blob/dev/src/lib/util.ts#L180
export function formatTokens(
  amountWei: BN | null,
  symbol?: string,
  decimals = 18
): string {
  if (amountWei === null) {
    return `N/A ${symbol ? symbol : ""}`;
  }

  const negative = amountWei.lt(new BN(0));
  const toSignedString = (amount: string) => {
    return (negative ? "-" : "") + amount + (symbol ? " " + symbol : "");
  };

  if (amountWei.isZero()) {
    return toSignedString("0");
  }

  const PRECISION = 2; // number of digits "behind the dot"
  const PRECISIONPOWER = 10 ** PRECISION;
  const toLocaleString = (amount: number): string => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: PRECISION,
    });
  };

  let significantDigits = 0;
  let units = "";

  /**
   * Like converting from WEI where 18 is a variable, not a constant.
   * `abs` because the number can be negative.  We'll convert back to signed at the end.
   * Note this yields a whole number of tokens, not a fraction.
   */
  const tokenAmount = amountWei
    .mul(new BN(PRECISIONPOWER))
    .div(new BN(10).pow(new BN(decimals)))
    .abs();

  if (tokenAmount.muln(PRECISION).eqn(0)) {
    return toSignedString("+0");
  } else if (tokenAmount.bitLength() > 53) {
    significantDigits = 1000000000;
    units = "B";
  } else if (tokenAmount.ltn(100000)) {
    significantDigits = 1;
  } else if (tokenAmount.lt(new BN(100000000))) {
    significantDigits = 1000;
    units = "k";
  } else {
    significantDigits = 1000000;
    units = "M";
  }

  const fractionalNumber =
    tokenAmount.div(new BN(significantDigits)).toNumber() / PRECISIONPOWER;
  const returnString = `${toLocaleString(fractionalNumber)}${units}`;
  return toSignedString(returnString);
}
