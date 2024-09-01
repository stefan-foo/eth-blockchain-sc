import React, { useState } from "react";
import { ethers } from "ethers";
import { Outcome } from "../core/types/Outcome";
import { BetInfo } from "../core/model/BetInfo";
import { useEthersContext } from "../contexts/ethers.context";
import { compareAddresses } from "../core/lib/blockchain-util";
import ResolveDialog from "./ResolveDialog";

interface BetCardProps {
  bet: BetInfo;
  onPlaceBet: (betAddress: string, outcome: Outcome, amount: string) => void;
}

const BetCard: React.FC<BetCardProps> = ({ bet, onPlaceBet }) => {
  const { account } = useEthersContext();
  const [amount, setAmount] = useState<string>("");
  const [isResolveDialogOpen, setResolveDialogOpen] = useState(false);

  const isUserOrganizer = compareAddresses(account, bet.organizer);

  const handlePlaceBet = (outcome: Outcome) => {
    if (amount) {
      onPlaceBet(bet.address, outcome, amount);
      setAmount("");
    }
  };

  const handleResolve = (outcome: Outcome) => {
    // Call a function to resolve the bet (not implemented here)
    // Example: onResolve(bet.address, outcome);
    setResolveDialogOpen(false);
  };

  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md flex items-center border border-gray-300">
      {/* Team Sections */}
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
        <div className="text-xs text-gray-500 mb-2">
          {ethers.formatEther(BigInt(bet.totalBetHome))} ETH
        </div>
        {!bet.isResolved && !isUserOrganizer && (
          <button
            onClick={() => handlePlaceBet(Outcome.HOME)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-xs"
          >
            Bet on Home
          </button>
        )}
      </div>

      <div className="flex flex-col items-center w-1/3 text-center">
        <div className="text-sm text-gray-500 mb-2">
          Kickoff Time: {bet.kickoffTime.toLocaleString()}
        </div>
        {!bet.isResolved && !isUserOrganizer && (
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mb-2 text-xs"
            placeholder="Enter bet amount"
          />
        )}
        {bet.isResolved && (
          <div
            className={`text-lg font-semibold ${
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
        {isUserOrganizer && (
          <button
            onClick={() => setResolveDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
          >
            Resolve
          </button>
        )}
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div
          className={`text-lg font-semibold mb-2 ${
            bet.isResolved && bet.outcome === Outcome.AWAY ? "text-red-600" : ""
          }`}
        >
          {bet.awayTeam}
        </div>
        <div className="text-xs text-gray-500 mb-2">
          {ethers.formatEther(BigInt(bet.totalBetAway))} ETH
        </div>
        {!bet.isResolved && !isUserOrganizer && (
          <button
            onClick={() => handlePlaceBet(Outcome.AWAY)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-xs"
          >
            Bet on Away
          </button>
        )}
      </div>

      {isResolveDialogOpen && (
        <ResolveDialog
          onClose={() => setResolveDialogOpen(false)}
          onResolve={handleResolve}
        />
      )}
    </div>
  );
};

export default BetCard;
