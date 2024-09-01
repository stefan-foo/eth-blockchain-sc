import { Outcome } from "../types/Outcome";

export interface BetInfo {
  address: string;
  homeTeam: string;
  awayTeam: string;
  organizer: string;
  kickoffTime: Date;
  totalBetHome: number;
  totalBetAway: number;
  isResolved: boolean;
  outcome: Outcome;
}
