import { Outcome } from "../core/types/Outcome";

export const getOutcomeStyle = (placedOutcome: Outcome, outcome: Outcome) => {
  if (outcome === Outcome.OPEN) return "text-black";
  if (outcome === Outcome.DRAW) return "text-blue-500 font-bold";
  return placedOutcome === outcome
    ? "text-green-500 font-bold"
    : "text-red-500 font-bold";
};
