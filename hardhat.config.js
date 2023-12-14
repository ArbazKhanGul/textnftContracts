require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200 // Adjust the number of runs as needed
    }},
  paths: {
    // artifacts: "./src/backend/artifacts",
    // sources: "./src/backend/contracts",
    // cache: "./src/backend/cache",
    // tests: "./src/backend/test"
  },
};

