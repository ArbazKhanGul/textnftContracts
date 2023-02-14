
const {expect}=require("chai");


describe("NFT Contract",function(){
    let Token;
    let nftContract;
    let add1;
    let add2;
    let owner;
    let add;
    
    beforeEach(async function(){  //this code run before every test
         Token=await ethers.getContractFactory("NFT");//contract instance
         [owner,add1,add2,...add]=await ethers.getSigners();
         nftContract=await Token.deploy("0xe17FFf2284c75Ff111B4AbCd80f433bFFF5183fb");//deploy contact

    });

    describe("Check Token Name And Symbol", function(){

        it("check whther the name of token is set or not",async function(){
                    expect(await nftContract.name()).to.equal("GoldenWords NFT");
    });

    it("check whether the symbol of token is set or not",async function(){
        expect(await nftContract.symbol()).to.equal("GWN");
});

    })
    


    describe("Check Token Creation", function(){

    it("check whether the token created or not",async function(){
            await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
                    expect(await nftContract.tokenURI(1)).to.be.revertedWith("ERC721: invalid token ID");
    });
   
   it("Verify the owner of token",async function(){
    await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

            expect(await nftContract.ownerOf(1)).to.equal(owner.address);
   });
   it("Verify the creator of token",async function(){
    await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

            expect(await nftContract.creatorOf(1)).to.equal(owner.address);
   });

   it("Verify the zero address",async function(){
    // await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");

         await expect (nftContract.creatorOf(1)).to.be.revertedWith("ERC721: invalid token ID");
   });
    })



    describe("Verify the total supply", function(){

        it("check the total supply of tokens",async function(){
                await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
                await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
                await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
                        expect(await nftContract.totalSupply()).to.equal(3);
        });
 

    })

    describe("Verify the approval for marketplace contract", function(){

        it("check the approval",async function(){
                await nftContract.createToken("0x9451fa6ec5e7630fbad9c1ab23b9bcc4dbee4df0b12d183fd9915918c863437a");
                
                        expect(await nftContract.isApprovedForAll(owner.address,"0xe17FFf2284c75Ff111B4AbCd80f433bFFF5183fb")).to.equal(true);
        });
 
        
    })
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