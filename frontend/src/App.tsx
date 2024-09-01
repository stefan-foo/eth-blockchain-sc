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
    if (!factoryContract) return;

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
          placed,
        ] = await gameBetContract.getContractDetails();
        console.log(await gameBetContract.getContractDetails());
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
          placed,
        });
      }

      if (sortAscending)
        bets.sort((a, b) => a.kickoffTime.getTime() - b.kickoffTime.getTime());
      else
        bets.sort((a, b) => b.kickoffTime.getTime() - a.kickoffTime.getTime());

      return bets;
    };

    setOpenBets(await fetchBetDetails(openBetsAddresses, true));
    setResolvedBets(await fetchBetDetails(resolvedBetsAddresses, false));
  }, [factoryContract, provider]);

  useEffect(() => {
    factoryContract?.on(factoryContract.getEvent("GameBetCreated"), fetchBets);
    factoryContract?.on(factoryContract.getEvent("GameBetResolved"), fetchBets);
    return () => {
      factoryContract?.off("GameBetCreated", fetchBets);
      factoryContract?.off("GameBetResolved", fetchBets);
    };
  }, [factoryContract, fetchBets]);

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
        } catch (error: any) {
          alert(error.reason ?? "Unknown error");
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
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {openBets.map((bet) => (
            <BetCard key={bet.address} bet={bet} onPlaceBet={handlePlaceBet} />
          ))}
        </div>
      ),
    },
    {
      label: "Finished",
      content: (
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {resolvedBets.map((bet) => (
            <BetCard key={bet.address} bet={bet} onPlaceBet={handlePlaceBet} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <Header />
      <div className="flex">
        <div className="p-4 w-2/5">
          <CreateBet />
        </div>
        <div className="h-full w-full">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}

export default App;
