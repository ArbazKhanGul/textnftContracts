//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract Verifier {
 

     mapping(uint => bool) public uniqueNonce;



    function verify( address _signer,uint _message, uint _nonce,uint _price,address _copyrightOwner,bytes calldata signature) internal view returns (bool) {
        require(uniqueNonce[_nonce]==false,"Nonce already use");
        bytes32 messageHash = getMessageHash(_message, _nonce,_price,_copyrightOwner);
        //   console.logBytes32(messageHash);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        //   console.logBytes32(ethSignedMessageHash);
        return  recoverSigner(ethSignedMessageHash,signature)==_signer;
    }




    function getMessageHash( uint _message,uint _nonce,uint _price,address _copyrightOwner) internal pure returns (bytes32) {
        // return keccak256(abi.encodePacked(Strings.toString(_message),"_", Strings.toString(_nonce),"_",Strings.toString(_price),"_",_copyrightOwner));
           return keccak256(abi.encodePacked(_message,_nonce,_copyrightOwner,_price));
    }





     function getEthSignedMessageHash( bytes32 _messageHash ) internal pure returns (bytes32) {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }





    function recoverSigner( bytes32 _ethSignedMessageHash,bytes memory _signature) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }




    function splitSignature(   bytes memory sig ) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");
            assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
               }}

}