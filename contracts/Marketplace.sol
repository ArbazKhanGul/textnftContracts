// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//  prevents re-entrancy attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./NFT.sol";
// import "hardhat/console.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds; //total number of items ever created
    // Counters.Counter private _itemsSold; //total number of items sold

    address payable owner; //owner of the smart contract
    address nftContractAddress;

    // people have to pay to puy their NFT on this marketplace
    // uint256 listingPrice = 0.025 ether;

    constructor(){
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        uint256 tokenId;
        address payable seller; //person selling the nft
        address payable creator;
        address owner; //owner of the nft
        uint256 price;
        string status;
    }

    //a way to access values of the MarketItem struct above by passing an integer ID
    mapping(uint256 => MarketItem) private idMarketItem;
    mapping(uint256 => uint256) private selling_price;

    //log message (when Item is created)
    event MarketItemCreated (
        uint indexed itemId,
        uint256 indexed tokenId,
        address  seller,
        address  creator,
        address owner,
        uint256 price,
        string status
    );


    //log message (when Item is sold)
    event MarketItemSold (
        uint indexed itemId,
        uint256 indexed tokenId,
        address  seller,
        address  creator,
        address owner,
        uint256 creatorProfit,
        uint256 sellerProfit,
        uint256 sellingPrice
    );


    event MarketItemCancel (
        uint indexed itemId,
        string status
    );



  modifier onlyOwner {
      require(msg.sender == owner,"Not an owner");
      _;
   }

/// @notice function to get listingprice
    function getNFTContractAddress() public view returns (address){
        return nftContractAddress;
    }

    function setNFTContractAddress(address nftaddress) public onlyOwner {
             nftContractAddress =nftaddress;
    }

   function getMarketItem(uint256 id) public view returns(MarketItem memory)
   {
    return idMarketItem[id];
   }

   function adminBalance() public view returns(uint){
    return address(this).balance;
   }

   function transferFee() public onlyOwner{
       owner.transfer(address(this).balance);
   }

    /// @notice function to create market item

    function createMarketItem(
        uint256 tokenId,
        uint256 price) public nonReentrant{
         require(price > 0, "Price must be above zero");

         _itemIds.increment(); //add 1 to the total number of items ever created
         uint256 itemId = _itemIds.current();

        address payable creator= payable(NFT(nftContractAddress).creatorOf(tokenId));

         idMarketItem[itemId] = MarketItem(
             itemId,
             tokenId,
             payable(msg.sender), //address of the seller putting the nft up for sale
             creator,
             address(0), //no owner yet (set owner to empty address)
             price,
             "available"
        );

               //transfer ownership of the nft to the contract itself
               NFT(nftContractAddress).transferFrom(msg.sender, address(this), tokenId);

            //log this transaction
        emit MarketItemCreated(
             itemId,
             tokenId,
             msg.sender,
             creator,
             owner,
             price,
             "available");
        }




    /// @notice function to cancel market item that is created
    function cancelMarketItem(
        uint256 itemId) public nonReentrant{


         MarketItem storage marketItem = idMarketItem[itemId];
         require(marketItem.seller == msg.sender, "You are not owner of this nft");

        //transfer ownership of the nft back to the seller
        NFT(nftContractAddress).transferFrom(address(this),msg.sender,marketItem.tokenId);
        marketItem.status = "cancel";

        //log this transaction
        emit MarketItemCancel(
             marketItem.itemId,
             "cancel");
        }







    /// @notice function to create a sale
    function createMarketSale(
            uint256 itemId
            ) public payable nonReentrant{

                uint256 price = idMarketItem[itemId].price;
                uint tokenId = idMarketItem[itemId].tokenId; 

                // console.log("Market item price is",price);

                require(msg.value == price, "Please submit the asking price in order to complete purchase");

                uint256 previous_token_price=selling_price[tokenId];

                // console.log("Previous token price is",previous_token_price);


                uint256 creator_profit;
                uint256 seller_profit;

                 if(previous_token_price > 0)
                 {
                  int256 profit=int256(price) - int256(previous_token_price);

                    // console.logInt(profit);
                        if(profit > 0)
                        {
                            //    console.log("Profit calculate inside if");
                            creator_profit=uint(profit / 10);
                            seller_profit=uint((profit * 8 ) / 10);
                        }
                        else{
                            previous_token_price=price;
                        }

                 }
                 else {
                        seller_profit=(price * 9 ) / 10;
                 }

           //pay the seller the amount
        //    console.log("~ file: Marketplace.sol:181 ~ seller_profit", seller_profit);
        //    console.log("~ file: Marketplace.sol:181 ~ previous_token_price", previous_token_price);

           idMarketItem[itemId].seller.transfer(previous_token_price + seller_profit);

           if(creator_profit > 0){
            idMarketItem[itemId].creator.transfer(creator_profit);
           }

             //transfer ownership of the nft from the contract itself to the buyer
            NFT(nftContractAddress).transferFrom(address(this),msg.sender, tokenId);

            selling_price[tokenId]=price;
            idMarketItem[itemId].owner = payable(msg.sender); //mark buyer as new owner
            idMarketItem[itemId].status = "sold"; //mark that it has been sold


         emit MarketItemSold (
               itemId,
               tokenId,
                idMarketItem[itemId].seller,
                idMarketItem[itemId].creator,
                msg.sender,
                creator_profit,
                previous_token_price + seller_profit,
                price
            );

            // emit MarketItemCreated(
            //  itemId,
            //  tokenId,
            //  idMarketItem[itemId].seller,
            //  idMarketItem[itemId].creator,
            //  msg.sender,
            //  price,
            //  "sold");

        }

        }























//         /// @notice function to create a sale
//     function createMarketSale(
//             address nftContract,
//             uint256 itemId
//             ) public payable nonReentrant{
//                 uint price = idMarketItem[itemId].price;
//                 uint tokenId = idMarketItem[itemId].tokenId;

//                 require(msg.value == price, "Please submit the asking price in order to complete purchase");

//            //pay the seller the amount
//            idMarketItem[itemId].seller.transfer(msg.value);

//              //transfer ownership of the nft from the contract itself to the buyer
//             IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

//             idMarketItem[itemId].owner = payable(msg.sender); //mark buyer as new owner
//             idMarketItem[itemId].sold = true; //mark that it has been sold
//             _itemsSold.increment(); //increment the total number of Items sold by 1
//             payable(owner).transfer(listingPrice); //pay owner of contract the listing price
//         }


//         /// @notice total number of items unsold on our platform
//         function fetchMarketItems() public view returns (MarketItem[] memory){
//             uint itemCount = _itemIds.current(); //total number of items ever created
//             //total number of items that are unsold = total items ever created - total items ever sold
//             uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
//             uint currentIndex = 0;

//             MarketItem[] memory items =  new MarketItem[](unsoldItemCount);

//             //loop through all items ever created
//             for(uint i = 0; i < itemCount; i++){

//                 //get only unsold item
//                 //check if the item has not been sold
//                 //by checking if the owner field is empty
//                 if(idMarketItem[i+1].owner == address(0)){
//                     //yes, this item has never been sold
//                     uint currentId = idMarketItem[i + 1].itemId;
//                     MarketItem storage currentItem = idMarketItem[currentId];
//                     items[currentIndex] = currentItem;
//                     currentIndex += 1;

//                 }
//             }
//             return items; //return array of all unsold items
//         }

//         /// @notice fetch list of NFTS owned/bought by this user
//         function fetchMyNFTs() public view returns (MarketItem[] memory){
//             //get total number of items ever created
//             uint totalItemCount = _itemIds.current();

//             uint itemCount = 0;
//             uint currentIndex = 0;


//             for(uint i = 0; i < totalItemCount; i++){
//                 //get only the items that this user has bought/is the owner
//                 if(idMarketItem[i+1].owner == msg.sender){
//                     itemCount += 1; //total length
//                 }
//             }

//             MarketItem[] memory items = new MarketItem[](itemCount);
//             for(uint i = 0; i < totalItemCount; i++){
//                if(idMarketItem[i+1].owner == msg.sender){
//                    uint currentId = idMarketItem[i+1].itemId;
//                    MarketItem storage currentItem = idMarketItem[currentId];
//                    items[currentIndex] = currentItem;
//                    currentIndex += 1;
//                }
//             }
//             return items;

//         }


//          /// @notice fetch list of NFTS owned/bought by this user
//         function fetchItemsCreated() public view returns (MarketItem[] memory){
//             //get total number of items ever created
//             uint totalItemCount = _itemIds.current();

//             uint itemCount = 0;
//             uint currentIndex = 0;


//             for(uint i = 0; i < totalItemCount; i++){
//                 //get only the items that this user has bought/is the owner
//                 if(idMarketItem[i+1].seller == msg.sender){
//                     itemCount += 1; //total length
//                 }
//             }

//             MarketItem[] memory items = new MarketItem[](itemCount);
//             for(uint i = 0; i < totalItemCount; i++){
//                if(idMarketItem[i+1].seller == msg.sender){
//                    uint currentId = idMarketItem[i+1].itemId;
//                    MarketItem storage currentItem = idMarketItem[currentId];
//                    items[currentIndex] = currentItem;
//                    currentIndex += 1;
//                }
//             }
//             return items;

//         }
