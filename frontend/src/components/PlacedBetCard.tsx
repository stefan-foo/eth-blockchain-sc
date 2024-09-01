import React, { useState } from "react";
import { BetPick } from "../core/model/BetPick";
import RatingDialog from "./RatingDialog";
import { ethers } from "ethers";
import { Outcome } from "../core/types/Outcome";

interface PlacedBetCardProps {
  betPick: BetPick;
  onClaim: (betAddress: string) => void;
}

const PlacedBetCard: React.FC<PlacedBetCardProps> = ({ betPick, onClaim }) => {
  const { bet, outcome, amount, claimed } = betPick;
  const [isRatingDialogOpen, setRatingDialogOpen] = useState(false);

  const handleClaim = () => {
    if (!claimed && bet.isResolved) {
      onClaim(bet.address);
    }
  };

  const handleRate = () => {
    setRatingDialogOpen(true);
  };

  const formattedAmount = ethers.formatEther(BigInt(amount));
  const formattedKickoffTime = bet.kickoffTime.toLocaleString();

  const getTeamStyle = (teamOutcome: boolean) => {
    if (!bet.isResolved) return "text-black";
    return teamOutcome ? "text-green-500 font-bold" : "text-red-500 font-bold";
  };

  const homeTeamStyle = getTeamStyle(outcome === Outcome.HOME);
  const awayTeamStyle = getTeamStyle(outcome === Outcome.AWAY);

  const getBetText = () => {
    return bet.outcome === outcome
      ? `Bet on ${
          outcome === Outcome.HOME ? "Home" : "Away"
        } ${formattedAmount} ETH`
      : `Bet on ${
          outcome === Outcome.HOME ? "Away" : "Home"
        } ${formattedAmount} ETH`;
  };

  return (
    <div className="border p-2 mb-2 shadow-sm bg-white rounded-sm text-sm">
      {/* Kickoff Time */}
      <div className="text-gray-500 text-xs mb-1">{formattedKickoffTime}</div>

      {/* Teams Display */}
      <div className="flex justify-between items-center mb-1">
        <span className={homeTeamStyle}>{bet.homeTeam}</span>
        <span className="text-gray-400">vs.</span>
        <span className={awayTeamStyle}>{bet.awayTeam}</span>
      </div>

      {/* Bet Details */}
      <div className="text-gray-600 text-xs mb-2">{getBetText()}</div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2">
        {bet.isResolved && !claimed && (
          <button
            onClick={handleClaim}
            className="bg-green-500 text-white px-3 py-1 rounded-sm text-xs"
          >
            Claim
          </button>
        )}
        <button
          onClick={handleRate}
          className="bg-blue-500 text-white rounded-md px-3 py-1 text-xs"
        >
          Rate
        </button>
      </div>

      {isRatingDialogOpen && (
        <RatingDialog
          onClose={() => setRatingDialogOpen(false)}
          betAddress={bet.address}
        />
      )}
    </div>
  );
};

export default PlacedBetCard;
