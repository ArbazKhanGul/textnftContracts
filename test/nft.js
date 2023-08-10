
const { expect } = require("chai");


describe("NFT Contract", function () {
        let Token;
        let nftContract;
        let add1;
        let add2;
        let owner;
        let add;

        beforeEach(async function () {  //this code run before every test
                Token = await ethers.getContractFactory("NFT");//contract instance
                [owner, add1, add2, ...add] = await ethers.getSigners();
                nftContract = await Token.deploy("0xe17FFf2284c75Ff111B4AbCd80f433bFFF5183fb");//deploy contact

        });

        describe("Check Token Creation", function () {

                it("check whether the token created or not", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");
                        // expect(await nftContract.tokenURI(1)).to.be.revertedWith("ERC721: invalid token ID");
                });

                it("check whether the token created or not using copyright", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0xdD2FD4581271e230360230F9337D5c0430Bf44C0","0x9a7e56603d8083c9fc8aafad90f2c7b8599eabfce247ed17a42ccb30a419bacd655d49a90b412c42d8cd634cdd2ebb9c580abf1ad18c9b9318c31b3a3ecf43991c",{
                                value: ethers.utils.parseEther('3'),
                              });
                });

                it("check whether copyright price send to admin or not ", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x0b326f2d8a988876e2211b3ef034c7a5178db96d9ab1d387430a6bec2fa3137c45143f7360179836f53ef5ed769ba7e59103d4121dee5efb275158f0bbc043621b",{
                                value: ethers.utils.parseEther('3'),
                              });
                        const updatedBalance = await ethers.provider.getBalance(add1.address);
                       let eth=ethers.utils.formatEther(updatedBalance);
                       expect(eth).to.equal('10003.0');
                });


                it("check whether copyright price send to admin or not ", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x0b326f2d8a988876e2211b3ef034c7a5178db96d9ab1d387430a6bec2fa3137c45143f7360179836f53ef5ed769ba7e59103d4121dee5efb275158f0bbc043621b",{
                                value: ethers.utils.parseEther('3'),
                              });
                        const updatedBalance = await ethers.provider.getBalance(add1.address);
                       let eth=ethers.utils.formatEther(updatedBalance);
                       expect(eth).to.equal('10006.0');
                });

                it("check whether copyright creator is original owner or not ", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.connect(add1).createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x0b326f2d8a988876e2211b3ef034c7a5178db96d9ab1d387430a6bec2fa3137c45143f7360179836f53ef5ed769ba7e59103d4121dee5efb275158f0bbc043621b",{
                                value: ethers.utils.parseEther('3'),
                              });
                       expect(await nftContract.creatorOf(2)).to.equal(owner.address);
                });


                it("check whether copyright creator is original owner or not ", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.connect(add1).createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x0b326f2d8a988876e2211b3ef034c7a5178db96d9ab1d387430a6bec2fa3137c45143f7360179836f53ef5ed769ba7e59103d4121dee5efb275158f0bbc043621b",{
                                value: ethers.utils.parseEther('3'),
                              });
                       expect(await nftContract.creatorOf(2)).to.equal(owner.address);
                });


                it("check whether copy set or not ", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.connect(add1).createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x0b326f2d8a988876e2211b3ef034c7a5178db96d9ab1d387430a6bec2fa3137c45143f7360179836f53ef5ed769ba7e59103d4121dee5efb275158f0bbc043621b",{
                                value: ethers.utils.parseEther('3'),
                              });

                       expect(await nftContract.copyOf(2)).to.equal(1);
                });


                it("check whether original copy is 0 ", async function () {

                        await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, 0,'0x0000000000000000000000000000000000000000',"0x");

                        await nftContract.connect(add1).createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1,ethers.utils.parseEther('3'),"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x0b326f2d8a988876e2211b3ef034c7a5178db96d9ab1d387430a6bec2fa3137c45143f7360179836f53ef5ed769ba7e59103d4121dee5efb275158f0bbc043621b",{
                                value: ethers.utils.parseEther('3'),
                              });

                       expect(await nftContract.copyOf(1)).to.equal(0);
                });

                // it("check whether the token nonce is use again or not", async function () {

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b");

                //         await expect(nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b")).to.be.revertedWith("Nonce already use");
                // });


                // it("check whether two token use the same copyright or not", async function () {

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 2, "0x7593bed65b739c5726a781a62451e007ff572c3fe51803458fa93921fdae7dae48f8cc0b3f649c7896a889ed60b45c3c8cb24fa6fe2283a920c1304606fab9801b"
                //         );

                // });

                // it("check whether the copyright taken from two different tokens", async function () {

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 2, 2, "0x557b161efd4fc1d510738e0e332bbc2c5f892c78a7e14759b6da161a2189c1147c243d201a339cf10ee5e5a1d8fc56e5ddccc003c24613b15f69be303c8696cb1c"
                //         );

                // });


                // it("check whether the copyright taken from two different tokens cannot use the same nonce", async function () {

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await expect(nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 2, 1, "0x0694b23dcc1b3fbb5c21d1fc0cecb5c7323e0e1c6c4f9d7cb37f5ade80b42180080577f5d08fcc13c0d1c261a80f8bb235036798bde06155cbaffbe22be7fe411c")).to.be.revertedWith("Nonce already use");
                // });


                // it("check whether the copyright set or not", async function () {

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b");

                //        expect(await nftContract.copyOf(2)).to.equal(1);
                // });

                // it("check whether the original token has copyright 0 or not", async function () {

                //   await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", false, 0, 0, "0x");

                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a", true, 1, 1, "0xd7f1d302f6782919fc8a65ad0170f81ae9fac26c7fa69a4f8ea51c69f6f3570757dba17723dd94a66feb403c47134b21112ef235514bfff630a048ffa0e2cfe21b");

                //        expect(await nftContract.copyOf(1)).to.equal(0);
                // });








                //        it("Verify the owner of token",async function(){
                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

                //                 expect(await nftContract.ownerOf(1)).to.equal(owner.address);
                //        });
                //        it("Verify the creator of token",async function(){
                //         await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

                //                 expect(await nftContract.creatorOf(1)).to.equal(owner.address);
                //        });

                //        it("Verify the zero address",async function(){
                //         // await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

                //              await expect (nftContract.creatorOf(1)).to.be.revertedWith("ERC721: invalid token ID");
                //        });
        })


        //     describe("Check Token Name And Symbol", function(){

        //         it("check whther the name of token is set or not",async function(){
        //                     expect(await nftContract.name()).to.equal("GoldenWords NFT");
        //     });

        //     it("check whether the symbol of token is set or not",async function(){
        //         expect(await nftContract.symbol()).to.equal("GWN");
        // });

        //     })



        //     describe("Check Token Creation", function(){

        //     it("check whether the token created or not",async function(){
        //             await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
        //                     expect(await nftContract.tokenURI(1)).to.be.revertedWith("ERC721: invalid token ID");
        //     });

        //    it("Verify the owner of token",async function(){
        //     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

        //             expect(await nftContract.ownerOf(1)).to.equal(owner.address);
        //    });
        //    it("Verify the creator of token",async function(){
        //     await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

        //             expect(await nftContract.creatorOf(1)).to.equal(owner.address);
        //    });

        //    it("Verify the zero address",async function(){
        //     // await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

        //          await expect (nftContract.creatorOf(1)).to.be.revertedWith("ERC721: invalid token ID");
        //    });
        //     })



        //     describe("Verify the total supply", function(){

        //         it("check the total supply of tokens",async function(){
        //                 await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
        //                 await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
        //                 await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
        //                         expect(await nftContract.totalSupply()).to.equal(3);
        //         });


        //     })

        //     describe("Verify the approval for marketplace contract", function(){

        //         it("check the approval",async function(){
        //                 await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

        //                         expect(await nftContract.isApprovedForAll(owner.address,"0xe17FFf2284c75Ff111B4AbCd80f433bFFF5183fb")).to.equal(true);
        //         });


        //     })
        // describe("Transactin",function(){

        //     it("Transfer token from one account to another",async function(){
        //         await hardhatToken.transfer(add1.address,10)

        //         const addrBalance=await hardhatToken.balanceOf(add1.address);

        //         expect(addrBalance).to.equal(10);
        // //         //Transfer 5tokens form addr1 to addr2

        //         await hardhatToken.connect(add1).transfer(add2.address,10);
        //         expect(await hardhatToken.balanceOf(add2.address)).to.equal(10);

        // });

        //     it("Should fail if sender does not have enough tokens",async function(){
        //      const initalOwnerBalance = await hardhatToken.balanceOf(owner.address);
        //      await expect (hardhatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens");

        //      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initalOwnerBalance);
        //     })

        //     it("Should update balances after transaction",async function(){
        //         const initalOwnerBalance =await hardhatToken.balanceOf(owner.address);
        //         await hardhatToken.transfer(add1.address,5);
        //         await hardhatToken.transfer(add2.address,10);

        //         const finalBalance=await hardhatToken.balanceOf(owner.address);

        //         expect(finalBalance).to.equal(initalOwnerBalance-15);
        //     })
        // })

})