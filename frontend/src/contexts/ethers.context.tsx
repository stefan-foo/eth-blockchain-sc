import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BaseContract, BrowserProvider, Contract, ethers } from "ethers";
import { GameBetFactory } from "../core/typechain-types";
import { gameBetFactory } from "../constants";

interface EthersStateContextI {
  account: string | null;
  provider: BrowserProvider | null;
  balance: bigint | null;
  factoryContract: GameBetFactory | null;
}

interface EthersStateProviderProps {
  children: ReactNode;
}

const EthersStateContext = createContext<EthersStateContextI>(
  {} as EthersStateContextI
);

export function useEthersContext() {
  const context = useContext(EthersStateContext);
  if (!context)
    throw new Error("useEthersState must be used within EthersProvider");

  return context;
}

export function EthersStateProvider({ children }: EthersStateProviderProps) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);
  const [factoryContract, setFactoryContract] = useState<GameBetFactory | null>(
    null
  );

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    window.ethereum
      .send("eth_requestAccounts", [])
      .then(async ({ result }: { result: string[] }) => {
        if (result?.length > 0) {
          const account = result[0];
          setBalance(await provider.getBalance(account));
          setAccount(account);
        }
      });

    window.ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length > 0) {
        const account = accounts[0];
        setBalance(await provider.getBalance(account));
        setAccount(account);
      } else {
        setAccount(null);
        setBalance(null);
      }
    });

    setProvider(provider);
  }, []);

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

  return (
    <EthersStateContext.Provider
      value={{ account, provider, balance, factoryContract }}
    >
      {children}
    </EthersStateContext.Provider>
  );
}
