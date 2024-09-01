import React, { useCallback, useEffect, useState } from "react";
import { BaseContract, ethers } from "ethers";
import { GameBet } from "./core/typechain-types";
import NoWalletDetected from "./components/NoWalletDetected";
import NoReferenceToFactoryContract from "./components/NoReferenceToFactoryContract";
import { useEthersContext } from "./contexts/ethers.context";
import CreateBet from "./components/CreateBet";
import BetCard from "./components/BetCard";
import { BetInfo } from "./core/model/BetInfo";
import { gameBet } from "./constants";
import { Outcome } from "./core/types/Outcome";
import Header from "./components/Header";
import Tabs from "./components/Tabs";

function App() {
  const { account, provider, factoryContract } = useEthersContext();
  const [openBets, setOpenBets] = useState<BetInfo[]>([]);
  const [resolvedBets, setResolvedBets] = useState<BetInfo[]>([]);

  const fetchBets = useCallback(async () => {
    if (factoryContract) {
      const openBetsAddresses = await factoryContract.getOpenBets();
      const resolvedBetsAddresses = await factoryContract.getResolvedBets();

      const fetchBetDetails = async (
        betAddresses: string[],
        sortAscending: boolean
      ): Promise<BetInfo[]> => {
        const bets: BetInfo[] = [];
        for (const address of betAddresses) {
          const gameBetContract = new ethers.Contract(
            address,
            gameBet.abi,
            provider
          ) as BaseContract as GameBet;
          const [
            homeTeam,
            awayTeam,
            kickoffTime,
            organizer,
            outcome,
            totalPool,
            totalBetHome,
            totalBetAway,
            numOfBettors,
          ] = await gameBetContract.getContractDetails();

          bets.push({
            address,
            homeTeam,
            awayTeam,
            kickoffTime: new Date(Number(kickoffTime) * 1000),
            totalBetHome: Number(totalBetHome),
            totalBetAway: Number(totalBetAway),
            isResolved: Number(outcome) !== Outcome.OPEN,
            outcome: Number(outcome) as Outcome,
            organizer,
            totalPool: Number(totalPool),
            numOfBettors: Number(numOfBettors),
          });
        }

        if (sortAscending)
          bets.sort(
            (a, b) => a.kickoffTime.getTime() - b.kickoffTime.getTime()
          );
        else
          bets.sort(
            (a, b) => b.kickoffTime.getTime() - a.kickoffTime.getTime()
          );

        return bets;
      };

      setOpenBets(await fetchBetDetails(openBetsAddresses, true));
      setResolvedBets(await fetchBetDetails(resolvedBetsAddresses, false));
    }
  }, [factoryContract, provider]);

  useEffect(() => {
    fetchBets();
  }, [fetchBets]);

  const handlePlaceBet = useCallback(
    async (betAddress: string, outcome: Outcome, amount: string) => {
      if (provider && account) {
        const gameBetContract = new ethers.Contract(
          betAddress,
          gameBet.abi,
          await provider.getSigner()
        ) as BaseContract as GameBet;

        try {
          const tx = await gameBetContract.placeBet(outcome, {
            value: ethers.parseEther(amount),
          });
          await tx.wait();
          alert("Bet placed successfully");
          fetchBets();
        } catch (error) {
          console.error("Error placing bet:", error);
        }
      }
    },
    [provider, account, fetchBets]
  );

  if (!window.ethereum) {
    return <NoWalletDetected />;
  }

  if (!factoryContract) {
    return <NoReferenceToFactoryContract />;
  }

  const tabs = [
    {
      label: "Upcoming",
      content: (
        <div>
          {openBets.map((bet) => (
            <BetCard bet={bet} onPlaceBet={handlePlaceBet} />
          ))}
        </div>
      ),
    },
    {
      label: "Finished",
      content: (
        <div>
          {resolvedBets.map((bet) => (
            <BetCard bet={bet} onPlaceBet={handlePlaceBet} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <Tabs tabs={tabs} />
        <CreateBet />
      </div>
    </div>
  );
}

export default App;
