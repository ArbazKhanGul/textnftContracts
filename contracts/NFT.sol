//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Verifier.sol";

contract NFT is ERC721URIStorage,Verifier {

    //auto-increment field for each token
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _totalSupply;
    mapping(uint256 => address) private _creator;
    mapping(uint256 => uint256) private _copyright;
    address payable private immutable  owner;
    address immutable contractAddress;


    event Creation(address indexed owner_address,uint indexed tokenId,string tokenURI,bool copyright);
    event ApprovalMarketplace(uint tokenId);


    constructor(address marketplaceAddress) ERC721("GoldenWords NFT", "GWN"){
       contractAddress = marketplaceAddress;
       owner =payable(msg.sender);
    }


    function createToken(string calldata tokenURI,bool copyrightStatus,uint tokenIdCopyrights,uint nonce,bytes calldata signature) public payable  {
        //set a new token id for the token to be minted

           _tokenIds.increment();
           uint256 newItemId = _tokenIds.current();

          if(copyrightStatus){

            require(verify(owner,tokenIdCopyrights,nonce,signature),"Invalid sign message");

            uniqueNonce[nonce] =true;
            _copyright[newItemId]=tokenIdCopyrights;
          }
          else{
            _copyright[newItemId]=0;
          }


        _mint(msg.sender, newItemId); //mint the token
        _setTokenURI(newItemId, tokenURI); //generate the URI
        _creator[newItemId] = msg.sender;
        setApprovalForAll(contractAddress,true); //grant transaction permission to marketplace
        _totalSupply.increment();
        emit Creation(msg.sender,newItemId,tokenURI,copyrightStatus);

    }

    function creatorOf(uint tokenId) public view returns(address){
        address creator = _creator[tokenId];
        require(creator != address(0), "ERC721: invalid token ID");
        return creator;
    }


    function copyOf(uint tokenId) public view returns(uint res){
        res = _copyright[tokenId];
     }


    function totalSupply() public view returns(uint){
        return _totalSupply.current();
    }

    modifier onlyOwner {
      require(msg.sender == owner,"Not an owner");
      _;
   }

   function checkFeeAmount() public view returns(uint){
    return address(this).balance;
   }

   function getFee() public onlyOwner{
   owner.transfer(address(this).balance);
   }

    function approveMarketplace(uint tokenId) public {
        approve(contractAddress,tokenId);
        emit ApprovalMarketplace(tokenId);
    }

}