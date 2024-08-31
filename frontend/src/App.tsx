import React, { useCallback, useEffect, useState } from "react";
import { BaseContract, Contract, ethers } from "ethers";
import NoWalletDetected from "./components/NoWalletDetected";
import NoReferenceToFactoryContract from "./components/NoReferenceToFactoryContract";
import { gameBet, gameBetFactory } from "./constants";
import { GameBet, GameBetFactory } from "./core/typechain-types";
import { getGameBets } from "./core/lib/gamebet-chain-util";
import { GameBetInfo } from "./core/model/game-bet-info";
import { compareAddresses } from "./core/lib/blockchain-util";

function App() {
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [factoryContract, setFactoryContract] =
    useState<GameBetFactory | null>();
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [kickoffTime, setKickoffTime] = useState<string>("");
  const [account, setAccount] = useState<string | null>(null);
  const [contractsInfo, setContractsInfo] = useState<GameBetInfo[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    window.ethereum
      .send("eth_requestAccounts", [])
      .then(({ result }: { result: string[] }) => {
        if (result?.length > 0) {
          setAccount(result[0]);
        }
      });

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    });

    setProvider(provider);
  }, []);

  const refreshGameBets = useCallback(async () => {
    if (!provider || !factoryContract) return;
    const bets = await getGameBets(provider, factoryContract);
    setContractsInfo(bets);
  }, [provider, factoryContract]);

  useEffect(() => {
    refreshGameBets();
  }, [refreshGameBets]);

  useEffect(() => {
    async function initializeFactory() {
      if (!provider) return setFactoryContract(null);

      const contract = new Contract(
        gameBetFactory.address,
        gameBetFactory.abi,
        await provider.getSigner()
      ) as BaseContract as GameBetFactory;

      setFactoryContract(contract);
    }

    initializeFactory();
  }, [provider]);

  useEffect(() => {
    factoryContract?.on(
      factoryContract.getEvent("GameBetCreated"),
      refreshGameBets
    );
  }, [factoryContract, refreshGameBets]);

  const handleCreateGameBet = useCallback(async () => {
    if (factoryContract && homeTeam && awayTeam && kickoffTime) {
      setLoading(true);
      try {
        const kickoffDate = new Date(kickoffTime);
        const kickoffTimestamp = Math.floor(kickoffDate.getTime() / 1000);

        const tx = await factoryContract.createGameBet(
          homeTeam,
          awayTeam,
          kickoffTimestamp
        );

        const result = await tx.wait();
        setAccount(result?.from ?? "");
      } catch (error) {
        console.error("Error creating game bet:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [factoryContract, homeTeam, awayTeam, kickoffTime]);

  const handlePlaceBet = useCallback(
    async (betAddress: string, outcome: number) => {
      if (provider && account) {
        const gameBetContract = new ethers.Contract(
          betAddress,
          gameBet.abi,
          await provider.getSigner()
        ) as BaseContract as GameBet;

        try {
          const tx = await gameBetContract.placeBet(outcome, {
            value: ethers.parseEther("0.1"),
          });
          await tx.wait();

          console.log("Bet placed successfully");
        } catch (error) {
          console.error("Error placing bet:", error);
        }
      }
    },
    [provider, account]
  );

  if (!window.ethereum) {
    return <NoWalletDetected />;
  }

  if (!factoryContract) {
    return <NoReferenceToFactoryContract />;
  }

  return (
    <div className="App">
      <h2>Create a Game Bet</h2>
      <input
        type="text"
        placeholder="Home Team"
        value={homeTeam}
        onChange={(e) => setHomeTeam(e.target.value)}
      />
      <input
        type="text"
        placeholder="Away Team"
        value={awayTeam}
        onChange={(e) => setAwayTeam(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Kickoff Time"
        value={kickoffTime}
        onChange={(e) => setKickoffTime(e.target.value)}
      />
      <button onClick={handleCreateGameBet} disabled={loading}>
        {loading ? "Creating..." : "Create Game Bet"}
      </button>
      <h2>Deployed Game Bets</h2>
      <ul>
        {contractsInfo
          ?.filter((b) => !compareAddresses(b.organizer, account))
          .map((bet) => (
            <li key={bet.address}>
              {bet.home} vs {bet.away} at {bet.kickoffTime.toLocaleString()}
              {bet.finished ? " (Finished)" : " (Ongoing)"}
              <button onClick={() => handlePlaceBet(bet.address, 1)}>
                Bet on Home
              </button>
              <button onClick={() => handlePlaceBet(bet.address, 2)}>
                Bet on Away
              </button>
              amount: <input type="number" />
            </li>
          ))}
      </ul>
      <h2>Your Created Game Bets</h2>
      <ul>
        {contractsInfo
          ?.filter((b) => compareAddresses(b.organizer, account))
          .map((bet) => (
            <li key={bet.address}>
              {bet.home} vs {bet.away} at {bet.kickoffTime.toLocaleString()}
              {bet.finished ? " (Finished)" : " (Ongoing)"}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
