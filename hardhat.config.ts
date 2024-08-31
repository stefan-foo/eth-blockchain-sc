import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: {
    // artifacts: "./frontend/src/artifacts",
    // sources: "./frontend/src",
  },
};

export default config;
