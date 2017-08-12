pragma solidity ^0.4.13;

import "./ownership/Ownable.sol";

import "./math/SafeMath.sol";

import "./SimpleCoinToken.sol";

import "./PreSale.sol";


contract Crowdsale is Ownable {
    
    using SafeMath for uint;
    
    address multisig;

    uint restrictedPercent;

    address restricted;

    PreSale public preSale;

    SimpleTokenCoin public token = new SimpleTokenCoin();

    uint start;
    
    uint period;

    uint hardcap;

    uint rate;

    bool isPreSaleMinted = false;

    function Crowdsale() {
      multisig = 0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770;
      restricted = 0xb3eD172CC64839FB0C0Aa06aa129f402e994e7De;
      restrictedPercent = 40;
      rate = 100000000000000000000;
      start = 1500379200;
      period = 28;
      // TODO: premint tokens for pre sale investors
      preSale = PreSale(0xb3eD172CC64839FB0C0Aa06aa129f402e994e7De);
      // mint tokens for preslae
    }

    modifier saleIsOn() {
      require(now > start && now < start + period * 1 days);
      _;
    }
  
    modifier isUnderHardCap() {
      require(multisig.balance <= hardcap);
      _;
    }    

    function mintPreSaleTokens() public onlyOwner() {
      require(!isPreSaleMinted);
      uint totalPreSaleInvestors = preSale.totalInvestors();
      for(uint i=0; i<totalPreSaleInvestors; i++) {
        address investor = preSale.investors(i);
        uint invested = preSale.balanceOf(investor);
        uint tokens = rate.mul(invested).div(1 ether);
        token.mint(investor, tokens);
      }
      isPreSaleMinted = true;
    }

    function finishMinting() public onlyOwner {
      uint issuedTokenSupply = token.totalSupply();
      uint restrictedTokens = issuedTokenSupply.mul(restrictedPercent).div(1 - restrictedPercent);
      token.mint(restricted, restrictedTokens);
      if(!isPreSaleMinted) {
        mintPreSaleTokens();
      }
      token.finishMinting();
    }

    function createTokens() isUnderHardCap saleIsOn payable {
      multisig.transfer(msg.value);
      uint tokens = rate.mul(msg.value).div(1 ether);
      token.mint(msg.sender, tokens);
    }

    function() external payable {
      createTokens();
    }
    
}
