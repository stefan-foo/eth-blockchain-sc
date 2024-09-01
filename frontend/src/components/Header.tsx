import React from "react";
import { ethers } from "ethers";
import { useEthersContext } from "../contexts/ethers.context";

const Header: React.FC = () => {
  const { account, balance } = useEthersContext();

  const formatBalance = (balance: bigint | null) => {
    if (balance === null) return "N/A";
    return ethers.formatEther(balance) + " ETH";
  };

  return (
    <header className="bg-gray-800 text-white p-2 flex justify-between items-center shadow-md fixed h-14 w-full">
      <h1 className="text-xl font-bold">dGameBet</h1>
      <div className="flex flex-col items-end">
        <div className="text-sm">
          <span className="font-semibold">Address:</span>{" "}
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Not Connected"}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Balance:</span>{" "}
          {formatBalance(balance)}
        </div>
      </div>
    </header>
  );
};

export default Header;
