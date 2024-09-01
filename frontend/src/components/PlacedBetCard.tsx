import React, { useState } from "react";
import { BetPick } from "../core/model/BetPick";
import RatingDialog from "./RatingDialog";
import { ethers } from "ethers";
import { Outcome } from "../core/types/Outcome";
import { getOutcomeStyle } from "../util/outcome-style.util";

interface PlacedBetCardProps {
  betPick: BetPick;
  onClaim: (betAddress: string) => void;
  onRatingConfirmed: (betAddress: string, rating: number) => void;
}

const PlacedBetCard: React.FC<PlacedBetCardProps> = ({
  betPick,
  onClaim,
  onRatingConfirmed,
}) => {
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

  const homeTeamStyle = getOutcomeStyle(Outcome.HOME, bet.outcome);
  const awayTeamStyle = getOutcomeStyle(Outcome.AWAY, bet.outcome);

  const getBetText = () => {
    return `Bet on ${
      outcome === Outcome.HOME ? "Home" : "Away"
    } ${formattedAmount} ETH`;
  };

  return (
    <div className="border p-2 mb-2 shadow-sm bg-white rounded-sm text-sm">
      <div className="text-gray-500 text-xs mb-1 flex justify-between items-center">
        <div>{formattedKickoffTime}</div>
        <div className="text-xs text-gray-600 flex justify-end gap-1">
          <div className="font-semibold">
            Average Rating:{" "}
            {bet.ratingCount === 0 ? "/" : bet.averageRating.toFixed(1)}
          </div>
          <div className="text-gray-500">
            {" "}
            {`(${bet.ratingCount} ${
              bet.ratingCount === 1 ? " review" : "reviews"
            })`}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-1">
        <span className={homeTeamStyle}>{bet.homeTeam}</span>
        <span className="text-gray-400">vs.</span>
        <span className={awayTeamStyle}>{bet.awayTeam}</span>
      </div>

      <div className="text-gray-600 text-xs mb-2">{getBetText()}</div>

      <div className="flex justify-center space-x-2">
        {bet.isResolved && !claimed && outcome === bet.outcome && (
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
          onConfirm={(rating) => {
            onRatingConfirmed(bet.address, rating);
            setRatingDialogOpen(false);
          }}
          betAddress={bet.address}
        />
      )}
    </div>
  );
};

export default PlacedBetCard;
