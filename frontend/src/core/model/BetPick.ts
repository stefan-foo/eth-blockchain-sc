import { Outcome } from "../types/Outcome";
import { BetInfo } from "./BetInfo";

export interface BetPick {
  bet: BetInfo;
  outcome: Outcome;
  amount: number;
  claimed: boolean;
}
