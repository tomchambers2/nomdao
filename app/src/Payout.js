import Web3 from "web3";
import { gameConfig } from "./gameConfig";
import { getNumberWithOrdinal } from "./utils";
const { cryptoEntryFee, cryptocurrency } = gameConfig;

export const Payout = ({ players, playerAddress }) => {
  if (!players) return <div>LOADING...</div>;

  const player = players.find(
    ({ playerAddress: otherPlayerAddress }) =>
      otherPlayerAddress === playerAddress
  );

  if (!players) return <div>LOADING...</div>;

  const totalBalance = players.reduce(
    (acc, { balance }) => acc + parseInt(Web3.utils.fromWei(balance)),
    0
  );

  const place =
    players
      .slice()
      .sort((p1, p2) => p2.balance - p1.balance)
      .findIndex(
        ({ playerAddress: otherPlayerAddress }) =>
          otherPlayerAddress === playerAddress
      ) + 1;

  const totalCryptoPot = cryptoEntryFee * players.length;

  if (!player) return <div></div>;

  const playerBalance = Web3.utils.fromWei(player.balance);

  return (
    <div>
      <h2>Payout</h2>
      <div className="item split">
        <div>Place:</div> <div>{getNumberWithOrdinal(place)}</div>
      </div>
      <div className="item split">
        <div>In Game Tokens:</div>
        <div>{Web3.utils.fromWei(player.balance)}</div>
      </div>
      <div className="item split">
        <div>Pot Share:</div>
        <div>{`${((playerBalance / totalBalance) * 100).toFixed(2)}%`}</div>
      </div>
      <div className="item split">
        <div>Payout: </div>
        <div>
          {(
            (Web3.utils.fromWei(player.balance) / totalBalance) *
            totalCryptoPot
          ).toFixed(2)}{" "}
          {cryptocurrency}
        </div>
      </div>
    </div>
  );
};
