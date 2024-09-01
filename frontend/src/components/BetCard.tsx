import React, { useState } from "react";
import { ethers } from "ethers";
import { Outcome } from "../core/types/Outcome";
import { BetInfo } from "../core/model/BetInfo";
import { useEthersContext } from "../contexts/ethers.context";
import ResolveDialog from "./ResolveDialog";
import KickoffTimeDialog from "./KickoffTimeDialog";
import { getOutcomeStyle } from "../util/outcome-style.util";
import { compareAddresses } from "../util/blockchain-util";

interface BetCardProps {
  bet: BetInfo;
  onPlaceBet: (betAddress: string, outcome: Outcome, amount: string) => void;
  onResolveBet: ((betAddress: string, outcome: Outcome) => void) | null;
  onUpdateKickoff: ((betAddress: string, newKickoffTime: Date) => void) | null;
}

const BetCard: React.FC<BetCardProps> = ({
  bet,
  onPlaceBet,
  onResolveBet,
  onUpdateKickoff,
}) => {
  const { account } = useEthersContext();
  const [amount, setAmount] = useState<string>("");
  const [isResolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [isEditKickoffDialogOpen, setEditKickoffDialogOpen] = useState(false);

  const isUserOrganizer = compareAddresses(account, bet.organizer);

  const handlePlaceBet = (outcome: Outcome) => {
    if (!amount) return;
    onPlaceBet(bet.address, outcome, amount);
    setAmount("");
  };

  const handleResolve = (outcome: Outcome) => {
    if (onResolveBet) onResolveBet(bet.address, outcome);
    setResolveDialogOpen(false);
  };

  const handleUpdateKickoff = (newKickoffTime: Date) => {
    if (onUpdateKickoff) onUpdateKickoff(bet.address, newKickoffTime);
    setEditKickoffDialogOpen(false);
  };

  return (
    <div className="mb-4 bg-white rounded shadow-md flex-col items-start border border-gray-300">
      {bet.ratingCount !== undefined && bet.averageRating !== undefined && (
        <div className="text-xs text-gray-600 pr-4 pt-1 flex justify-end gap-1">
          <div className="font-semibold">
            Average Rating:{" "}
            {bet.ratingCount === 0 ? "/" : bet.averageRating.toFixed(1)}
          </div>
          <div className="text-gray-500">
            {`(${bet.ratingCount} ${
              bet.ratingCount === 1 ? " review" : "reviews"
            })`}
          </div>
        </div>
      )}

      <div className="w-full p-4 pt-0 flex">
        <div className="flex flex-col items-center w-1/3">
          <div
            className={`text-lg font-semibold mb-2 ${getOutcomeStyle(
              Outcome.HOME,
              bet.outcome
            )}`}
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
          <div className="flex items-center mb-2 text-sm text-gray-500">
            <div>
              <div>
                Kickoff Time{" "}
                {isUserOrganizer && !bet.isResolved && (
                  <button
                    onClick={() => setEditKickoffDialogOpen(true)}
                    className="ml-2 text-blue-500 hover:text-blue-700 text-xs"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div>{bet.kickoffTime.toLocaleString()}</div>
            </div>
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
                ? "Home Team Won"
                : bet.outcome === Outcome.AWAY
                ? "Away Team Won"
                : bet.outcome === Outcome.DRAW
                ? "Draw"
                : ""}
            </div>
          )}
          {isUserOrganizer && !bet.isResolved && (
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
            className={`text-lg font-semibold mb-2 ${getOutcomeStyle(
              Outcome.AWAY,
              bet.outcome
            )}`}
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

        {isEditKickoffDialogOpen && (
          <KickoffTimeDialog
            currentKickoffTime={bet.kickoffTime}
            onClose={() => setEditKickoffDialogOpen(false)}
            onUpdate={handleUpdateKickoff}
          />
        )}
      </div>
    </div>
  );
};

export default BetCard;
