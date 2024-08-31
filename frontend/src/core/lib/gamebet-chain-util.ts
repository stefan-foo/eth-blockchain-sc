import { BaseContract, ethers, Provider } from "ethers";
import { gameBet } from "../../constants";
import { GameBetInfo } from "../model/game-bet-info";
import { GameBet, GameBetFactory } from "../typechain-types";

export async function getGameBets(
  provider: Provider,
  contract: GameBetFactory
): Promise<GameBetInfo[]> {
  const gameBets = await contract.getPossibleBets();

  return await Promise.all(
    gameBets.map(async (address) => {
      const gameBetContract = new ethers.Contract(
        address,
        gameBet.abi,
        provider
      ) as BaseContract as GameBet;
      const a = gameBetContract.getContractDetails();
      const [home, away, kickoffTime, result, organizer] = await Promise.all([
        gameBetContract.home(),
        gameBetContract.away(),
        gameBetContract.kickoffTime(),
        gameBetContract.result(),
        gameBetContract.organizer(),
      ]);
      console.log(kickoffTime);
      return {
        home,
        away,
        kickoffTime: new Date(Number(kickoffTime)),
        finished: false,
        organizer,
        address,
      };
    })
  );
}
