import BN from "bn.js";
import moment from "moment";

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

// Showing the time left for a proposal, also getting it from alchemy
// https://github.com/daostack/alchemy/blob/dev/src/components/Shared/ProposalCountdown.tsx#L37
export const closingTime = (proposal: any) => {
  let time;
  switch (proposal.stage) {
    case 0:
    case 2:
      time = moment((proposal.createdAt + proposal.genesisProtocolParams.queuedVotePeriodLimit) * 1000)
      break
    case 3:
      time = moment((proposal.preBoostedAt + proposal.genesisProtocolParams.preBoostedVotePeriodLimit) * 1000)
      break
    case 4:
      time = moment((proposal.boostedAt + proposal.genesisProtocolParams.boostedVotePeriodLimit) * 1000)
      break
    case 5:
      time = moment((proposal.quietEndingPeriodBeganAt + proposal.genesisProtocolParams.quietEndingPeriod) * 1000)
      break
    case 1:
      time = moment(proposal.executedAt * 1000)
      break
  }
  if (time) {
    return calculateCountdown(time)
  }
};

function calculateCountdown(endDate: Date | moment.Moment) {
  const endDateMoment = moment(endDate);
  const now = new Date();

  const diff = endDateMoment.diff(now);

  // clear countdown when date is reached
  if (diff <= 0) {
    return "Completed"
  }

  const duration = moment.duration(diff);
  const timeLeft = {
    years: duration.years(),
    days: duration.days(),
    hours: duration.hours(),
    min: duration.minutes(),
    seconds: duration.seconds(),
    complete: false,
  };

  const { hours, min, seconds } = timeLeft
  return `${hours}:${min}:${seconds}`;
}

