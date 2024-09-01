import React, { useCallback, useEffect, useState } from "react";
import { BaseContract, ethers } from "ethers";
import { GameBet } from "./core/typechain-types";
import NoWalletDetected from "./components/NoWalletDetected";
import NoReferenceToFactoryContract from "./components/NoReferenceToFactoryContract";
import { useEthersContext } from "./contexts/ethers.context";
import CreateBet from "./components/CreateBet";
import BetCard from "./components/BetCard";
import { BetInfo } from "./core/model/BetInfo";
import { gameBet, gameBetFactory } from "./constants";
import { Outcome } from "./core/types/Outcome";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { BetPick } from "./core/model/BetPick";
import PlacedBetCard from "./components/PlacedBetCard";

function App() {
  const { account, provider, factoryContract } = useEthersContext();
  const [openBets, setOpenBets] = useState<BetInfo[]>([]);
  const [resolvedBets, setResolvedBets] = useState<BetInfo[]>([]);
  const [placedBets, setPlacedBets] = useState<BetPick[]>([]);

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
          totalBetHome,
          totalBetAway,
        ] = await Promise.all([
          gameBetContract.home(),
          gameBetContract.away(),
          gameBetContract.kickOffTime(),
          gameBetContract.organizer(),
          gameBetContract.result(),
          gameBetContract.totalBetHome(),
          gameBetContract.totalBetAway(),
        ]);

        const ratings = await factoryContract.organizerRatings(
          ethers.getAddress(organizer)
        );

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
          ratingCount: Number(ratings.ratingCount ?? 0n),
          averageRating:
            Number(ratings.totalRatings ?? 0n) /
            Number(ratings.ratingCount === 0n ?? 1n),
        });
      }

      if (sortAscending) {
        bets.sort((a, b) => a.kickoffTime.getTime() - b.kickoffTime.getTime());
      } else {
        bets.sort((a, b) => b.kickoffTime.getTime() - a.kickoffTime.getTime());
      }

      return bets;
    };

    setOpenBets(await fetchBetDetails(openBetsAddresses, true));
    setResolvedBets(await fetchBetDetails(resolvedBetsAddresses, false));
  }, [factoryContract, provider]);

  useEffect(() => {
    if (!account) return;

    const filterPlacedBets = async (bets: BetInfo[]) => {
      const placedBets: BetPick[] = [];
      for (const bet of bets) {
        const gameBetContract = new ethers.Contract(
          bet.address,
          gameBet.abi,
          provider
        ) as BaseContract as GameBet;

        const pick = await gameBetContract.bets(ethers.getAddress(account));
        if (pick.amount === 0n) continue;

        placedBets.push({
          bet: { ...bet },
          amount: Number(pick.amount),
          claimed: pick.hasClaimed,
          outcome: Number(pick.team),
        });
      }
      setPlacedBets(placedBets);
    };

    filterPlacedBets([...openBets, ...resolvedBets]);
  }, [openBets, resolvedBets, account, provider]);

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

  const handlePlaceBet = async (
    betAddress: string,
    outcome: Outcome,
    amount: string
  ) => {
    if (!provider || !account) {
      return;
    }

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
    } catch (error: any) {
      alert(error.reason ?? "Unknown error");
    }
  };

  const handleClaim = async (betAddress: string) => {
    if (!provider || !account) {
      return;
    }

    const gameBetContract = new ethers.Contract(
      betAddress,
      gameBet.abi,
      await provider.getSigner()
    ) as BaseContract as GameBet;

    try {
      const tx = await gameBetContract.claimPayout();
      await tx.wait();
      alert("Claimed successfully");
      fetchBets();
    } catch (error: any) {
      alert(error.reason ?? "Unknown error");
    }
  };

  const handleResolveBet = async (betAddress: string, outcome: Outcome) => {
    if (!provider || !account) return;

    const gameBetContract = new ethers.Contract(
      betAddress,
      gameBet.abi,
      await provider.getSigner()
    ) as BaseContract as GameBet;

    try {
      const tx = await gameBetContract.resolve(outcome);
      await tx.wait();
      alert("Bet resolved");
    } catch (error: any) {
      alert(error.reason ?? "Unknown error");
    }
  };

  const handleNewRating = async (betAddress: string, rating: number) => {
    if (!provider || !account) return;

    const gameBetContract = new ethers.Contract(
      betAddress,
      gameBet.abi,
      await provider.getSigner()
    ) as BaseContract as GameBet;

    try {
      const tx = await gameBetContract.rateOrganizer(rating);
      await tx.wait();
      alert("Organizer rated");
    } catch (error: any) {
      alert(error.reason ?? "Unknown error");
    }
  };

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
            <BetCard
              key={bet.address}
              bet={bet}
              onPlaceBet={handlePlaceBet}
              onResolveBet={handleResolveBet}
              onUpdateKickoff={null}
            />
          ))}
        </div>
      ),
    },
    {
      label: "Finished",
      content: (
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {resolvedBets.map((bet) => (
            <BetCard
              key={bet.address}
              bet={bet}
              onPlaceBet={handlePlaceBet}
              onResolveBet={null}
              onUpdateKickoff={null}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <Header />
      <div className="h-full w-full flex">
        <div className="p-4 w-2/5 bg-gray-100 border-r">
          <CreateBet />
        </div>
        <div className="w-3/5 p-4 bg-white h-full">
          <Tabs tabs={tabs} />
        </div>
        <div className="w-2/5 p-4 overflow-y-auto bg-gray-50 border-l">
          Placed Bets
          {placedBets.map((betPick) => (
            <PlacedBetCard
              key={betPick.bet.address}
              betPick={betPick}
              onClaim={handleClaim}
              onRatingConfirmed={handleNewRating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
