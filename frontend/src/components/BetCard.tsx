import React, { useState } from "react";
import { ethers } from "ethers";
import { Outcome } from "../core/types/Outcome";
import { BetInfo } from "../core/model/BetInfo";
import { useEthersContext } from "../contexts/ethers.context";
import { compareAddresses } from "../core/lib/blockchain-util";

interface BetCardProps {
  bet: BetInfo;
  onPlaceBet: (betAddress: string, outcome: Outcome, amount: string) => void;
}

const BetCard: React.FC<BetCardProps> = ({ bet, onPlaceBet }) => {
  const { account } = useEthersContext();
  const [amount, setAmount] = useState<string>("");

  const isUserOrganizer = compareAddresses(account, bet.organizer);

  const handlePlaceBet = (outcome: Outcome) => {
    if (amount) {
      onPlaceBet(bet.address, outcome, amount);
      setAmount("");
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md flex items-center border border-gray-300">
      <div className="flex flex-col items-center w-1/3">
        <div
          className={`text-lg font-semibold mb-2 ${
            bet.isResolved && bet.outcome === Outcome.HOME
              ? "text-green-600"
              : ""
          }`}
        >
          {bet.homeTeam}
        </div>
        <div className="text-sm text-gray-500 mb-2">
          Total Bets: {ethers.formatEther(BigInt(bet.totalBetHome))} ETH
        </div>
        {!bet.isResolved && !isUserOrganizer && (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => handlePlaceBet(Outcome.HOME)}
            >
              Bet on {bet.homeTeam}
            </button>
          </>
        )}
      </div>

      {/* Amount and Kickoff Time */}
      <div className="flex flex-col items-center w-1/3 text-center">
        <div className="mb-2 text-sm text-gray-500">
          Kickoff Time: {bet.kickoffTime.toLocaleString()}
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-2"
          placeholder="Enter bet amount"
        />
        {bet.isResolved && (
          <div
            className={`font-bold ${
              bet.outcome === Outcome.HOME
                ? "text-green-600"
                : bet.outcome === Outcome.AWAY
                ? "text-red-600"
                : bet.outcome === Outcome.DRAW
                ? "text-gray-600"
                : ""
            }`}
          >
            {bet.outcome === Outcome.HOME
              ? "Home Team Wins"
              : bet.outcome === Outcome.AWAY
              ? "Away Team Wins"
              : bet.outcome === Outcome.DRAW
              ? "Draw"
              : ""}
          </div>
        )}
      </div>

      {/* Away Team and Bet Button */}
      <div className="flex flex-col items-center w-1/3">
        <div
          className={`text-lg font-semibold mb-2 ${
            bet.isResolved && bet.outcome === Outcome.AWAY ? "text-red-600" : ""
          }`}
        >
          {bet.awayTeam}
        </div>
        <div className="text-sm text-gray-500 mb-2">
          Total Bets: {ethers.formatEther(BigInt(bet.totalBetAway))} ETH
        </div>
        {!bet.isResolved && !isUserOrganizer && (
          <>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handlePlaceBet(Outcome.AWAY)}
            >
              Bet on {bet.awayTeam}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BetCard;
