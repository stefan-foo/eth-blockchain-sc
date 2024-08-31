import gameBetFactoryJson from "./core/contracts/GameBetFactory.sol/GameBetFactory.json";
import contractName from "./core/contracts/GameBetFactory.sol/GameBetFactory.json";
import gameBetJson from "./core/contracts/GameBet.sol/GameBet.json";

export const gameBetFactory = {
  abi: gameBetFactoryJson.abi,
  contractName: contractName,
  address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
};

export const gameBet = {
  abi: gameBetJson.abi,
  contractName: gameBetFactory.contractName,
};
