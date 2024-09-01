import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MatchFactoryModule = buildModule("GameBetFactoryModule", (m) => {
  const matchFactory = m.contract("GameBetFactory");

  return { matchFactory };
});

export default MatchFactoryModule;
