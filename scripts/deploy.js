// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  //deploy marketplace contract
  const Marketplace=await hre.ethers.getContractFactory("NFTMarket");
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed()
  console.log(
    `market contract  deployed to ${marketplace.address}`
  );

  //deploy nft contract
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(marketplace.address);
  await nft.deployed();
  console.log(
    `NFT contract  deployed to ${nft.address}`
  );

 
  //set nft contract address in marketplace
  await marketplace.setNFTContractAddress(nft.address);

  //check the nft contract that it is set or not
  let res=await marketplace.getNFTContractAddress();
  console.log("🚀 ~ file: deploy.js:22 ~ main ~ res", res)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
