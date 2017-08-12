pragma solidity ^0.4.13;

import "./token/MintableToken.sol";

contract SimpleTokenCoin is MintableToken {
    
    string public constant name = "Simple Coint Token";
    
    string public constant symbol = "SCT";
    
    uint32 public constant decimals = 18;
    
}


