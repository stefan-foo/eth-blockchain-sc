import gameBetFactoryJson from "./core/contracts/GameBetFactory.sol/GameBetFactory.json";
import contractName from "./core/contracts/GameBetFactory.sol/GameBetFactory.json";
import gameBetJson from "./core/contracts/GameBet.sol/GameBet.json";

export const gameBetFactory = {
  abi: gameBetFactoryJson.abi,
  contractName: contractName,
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

export const gameBet = {
  abi: gameBetJson.abi,
  contractName: gameBetFactory.contractName,
};
