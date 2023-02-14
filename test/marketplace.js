
const {expect}=require("chai");


describe("NFT Marketplace Contract",function(){
    let Token;
    let nftContract;
    let marketplace;
    let marketplaceContract;
    let add1;
    let add2;
    let owner;
    let add;

    beforeEach(async function(){  //this code run before every test
         Token=await ethers.getContractFactory("NFT");//contract instance
         marketplace=await ethers.getContractFactory("NFTMarket");
         [owner,add1,add2,...add]=await ethers.getSigners();
         marketplaceContract=await marketplace.deploy();
         nftContract=await Token.deploy(marketplaceContract.address);//deploy contact

    });

//     describe("Check marketITem creation", function(){

//         it("check whether the market item create or not",async function(){

//             await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//             await marketplaceContract.setNFTContractAddress(nftContract.address);
//             let price=ethers.utils.parseEther('1');
//             await marketplaceContract.createMarketItem(1,price)
//                     let a=await marketplaceContract.getMarketItem(2);
//                     console.log("printing result",a);
//     });

//     it("check the current owner of token after market item creation",async function(){
//         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//         await marketplaceContract.setNFTContractAddress(nftContract.address);
//         let price=ethers.utils.parseEther('1');
//         await marketplaceContract.createMarketItem(1,price)
//         expect(await nftContract.ownerOf(1)).to.equal(marketplaceContract.address);
// });

// it("check the current nft contract address",async function(){
//     await marketplaceContract.setNFTContractAddress(nftContract.address);
//     expect(await marketplaceContract.getNFTContractAddress()).to.equal(nftContract.address);
// });

// it("check the that nft contract is set by owner of marketplace only",async function(){
//     await expect (marketplaceContract.connect(add1).setNFTContractAddress(nftContract.address)).to.be.revertedWith("Not an owner");
// });
//     })


// describe("Check marketITem cancel selling", function(){

//         it("check whether the market item selling cancel or not",async function(){

//             await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//             await marketplaceContract.setNFTContractAddress(nftContract.address);
      
//             let price=ethers.utils.parseEther('1');
//             await marketplaceContract.createMarketItem(1,price)
            
//             let a=await marketplaceContract.getMarketItem(1);
//                     console.log("printing result before",a);

//             await marketplaceContract.cancelMarketItem(1)
//                 let b=await marketplaceContract.getMarketItem(1);
//                     console.log("printing result after",b);
//     });



//     it("check whether the ownership transfer back or not",async function(){

//         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//         await marketplaceContract.setNFTContractAddress(nftContract.address);

//         let price=ethers.utils.parseEther('1');
//         await marketplaceContract.createMarketItem(1,price)

//         await marketplaceContract.cancelMarketItem(1)

//         expect(await nftContract.ownerOf(1)).to.equal(owner.address);
// });

// it("check that only seller can cancel the marketitem selling",async function(){

//     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//     await marketplaceContract.setNFTContractAddress(nftContract.address);

//     let price=ethers.utils.parseEther('1');
//     await marketplaceContract.createMarketItem(1,price)

//     await expect (marketplaceContract.connect(add1).cancelMarketItem(1)).to.be.revertedWith("You are not owner of this nft");
// });

//     })

    describe("Check marketITem sale", function(){

    // it("check whether the market item sale is done successfully or not",async function(){

    //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
    //         await marketplaceContract.setNFTContractAddress(nftContract.address);



    //         let price=ethers.utils.parseEther('1');
    //         await marketplaceContract.createMarketItem(1,price)

    //         let seller_balance = await ethers.provider.getBalance(owner.address);
    //         // console.log("🚀 ~ file: marketplace.js:109 ~ it ~ seller_balance", ethers.utils.formatEther(seller_balance))

    //         await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})

    //         //  seller_balance = await ethers.provider.getBalance(owner.address);
    //         // console.log("🚀 ~ file: marketplace.js:109 ~ it ~ seller_balance", ethers.utils.formatEther(seller_balance))
               
    //         let result=BigInt(seller_balance) + BigInt(900000000000000000) ;
    //         console.log("🚀 ~ file: marketplace.js:122 ~ it ~ result", result)

    //         expect(await ethers.provider.getBalance(owner.address)).to.equal(result);
    // });


//     it("check whether the nft ownership transfer or not",async function(){

//         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//         await marketplaceContract.setNFTContractAddress(nftContract.address);



//         let price=ethers.utils.parseEther('1');
//         await marketplaceContract.createMarketItem(1,price)

//         await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})

//         expect(await nftContract.ownerOf(1)).to.equal(add1.address);

// });


// it("check whether the nft again listed or not",async function(){

//     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//     await marketplaceContract.setNFTContractAddress(nftContract.address);



//     let price=ethers.utils.parseEther('1');

//     await marketplaceContract.createMarketItem(1,price)

//     await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})



//     nftContract.connect(add1).approve(marketplaceContract.address,1);



//     await marketplaceContract.connect(add1).createMarketItem(1,ethers.utils.parseEther('2'));

//     let a=await marketplaceContract.getMarketItem(1);
//     console.log("printing market item result 1",a);

//                  a=await marketplaceContract.getMarketItem(2);
//                     console.log("printing market item result 2",a);
//     //   await marketplaceContract.connect(add2).createMarketSale(2,{value: ethers.utils.parseEther("2")})


//     // expect(await ethers.provider.getBalance(owner.address)).to.equal(result);
// });


// it("check the creator balance after two sales and second sale get profit",async function(){

//     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//     await marketplaceContract.setNFTContractAddress(nftContract.address);



//     let price=ethers.utils.parseEther('1');

//     await marketplaceContract.createMarketItem(1,price)

//                  seller_balance = await ethers.provider.getBalance(owner.address);

//     await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})

//     nftContract.connect(add1).approve(marketplaceContract.address,1);



//     await marketplaceContract.connect(add1).createMarketItem(1,ethers.utils.parseEther('3'));


//     await marketplaceContract.connect(add2).createMarketSale(2,{value: ethers.utils.parseEther("3")})

//   let result=BigInt(seller_balance) + BigInt(900000000000000000) + BigInt(200000000000000000);

//     expect(await ethers.provider.getBalance(owner.address)).to.equal(result);
// });

// it("check the creator balance after two sales and second sale get loss",async function(){

//     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//     await marketplaceContract.setNFTContractAddress(nftContract.address);



//     let price=ethers.utils.parseEther('1');

//     await marketplaceContract.createMarketItem(1,price)

//                  seller_balance = await ethers.provider.getBalance(owner.address);

//     await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})

//     nftContract.connect(add1).approve(marketplaceContract.address,1);



//     await marketplaceContract.connect(add1).createMarketItem(1,ethers.utils.parseEther('0.5'));


//     await marketplaceContract.connect(add2).createMarketSale(2,{value: ethers.utils.parseEther("0.5")})

//   let result=BigInt(seller_balance) + BigInt(900000000000000000);

//     expect(await ethers.provider.getBalance(owner.address)).to.equal(result);
// });


// it("check the contract balance after sale loos",async function(){

//     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
//     await marketplaceContract.setNFTContractAddress(nftContract.address);



//     let price=ethers.utils.parseEther('1');

//     await marketplaceContract.createMarketItem(1,price)

//                  seller_balance = await ethers.provider.getBalance(owner.address);

//     await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})

//     nftContract.connect(add1).approve(marketplaceContract.address,1);



//     await marketplaceContract.connect(add1).createMarketItem(1,ethers.utils.parseEther('0.5'));


//     await marketplaceContract.connect(add2).createMarketSale(2,{value: ethers.utils.parseEther("0.5")})

//   let result=BigInt(100000000000000000);

//     expect(await marketplaceContract.adminBalance()).to.equal(result);
// });


it("check the contract balance after sale profit",async function(){

    await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
    await marketplaceContract.setNFTContractAddress(nftContract.address);



    let price=ethers.utils.parseEther('1');

    await marketplaceContract.createMarketItem(1,price)

                 seller_balance = await ethers.provider.getBalance(owner.address);

    await marketplaceContract.connect(add1).createMarketSale(1,{value: ethers.utils.parseEther("1")})

    nftContract.connect(add1).approve(marketplaceContract.address,1);



    await marketplaceContract.connect(add1).createMarketItem(1,ethers.utils.parseEther('3'));


    await marketplaceContract.connect(add2).createMarketSale(2,{value: ethers.utils.parseEther("3")})

  let result=BigInt(100000000000000000)+BigInt(200000000000000000);

    expect(await marketplaceContract.adminBalance()).to.equal(result);
});









    })


    })