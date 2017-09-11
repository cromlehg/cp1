pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Crowdsale.sol";

contract TestPreSale {

  function testInitialInvestorsSize() {
    PreSale preSale = PreSale(DeployedAddresses.PreSale());

    uint expected = 0;

    Assert.equal(preSale.totalInvestors(), expected, "Contract should have 0 investors initially");
  }

}

