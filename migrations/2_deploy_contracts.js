var Crowdsale = artifacts.require("Crowdsale");
var PreSale = artifacts.require("PreSale");

module.exports = function(deployer) {
  deployer.deploy(Crowdsale);
  deployer.deploy(PreSale);
};
