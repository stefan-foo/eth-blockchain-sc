import gameBetFactoryJson from "./core/contracts/GameBetFactory.sol/GameBetFactory.json";
import contractName from "./core/contracts/GameBetFactory.sol/GameBetFactory.json";
import gameBetJson from "./core/contracts/GameBet.sol/GameBet.json";

export const gameBetFactory = {
  abi: gameBetFactoryJson.abi,
  contractName: contractName,
  address: () => process.env.REACT_APP_GAME_BET_FACTORY_ADDRESS,
};

export const gameBet = {
  abi: gameBetJson.abi,
  contractName: gameBetFactory.contractName,
};
