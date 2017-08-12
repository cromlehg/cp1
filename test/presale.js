var PreSale = artifacts.require("./PreSale.sol");

contract('PreSale', function(accounts) {
 
  //============= first owner, function calls from not owner ====================//

  it("first owner: should not change ownership", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.notEqual(accounts[0], owner, "Owner changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.owner.call().then(function(owner) {
          assert.notEqual(accounts[2], owner, "Owner changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change start date", function() {
    var meta;
    var newStart = 1502463457;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.notEqual(newStart, start, "Start date changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.start.call().then(function(start) {
          assert.notEqual(newStart, start, "Start date changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change period", function() {
    var meta;
    var newPeriod = 48;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[1]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.notEqual(newPeriod, period, "Period changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.period.call().then(function(period) {
          assert.notEqual(newPeriod, period, "Period changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not paused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.notEqual(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.notEqual(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should paused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "not paused");
    });
  });

  it("first owner: should not paused when paused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      assert.equal(true, false, "paused when paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "paused when paused");
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not unpaused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.equal(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should unpaused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(false, paused, "not unpaused");
    });
  });

  it("first owner: should not unpaused when unpaused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      assert.equal(true, false, "unpaused when unpaused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "unpaused when unpaused");
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change wallet", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "wallet changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.wallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  //============= first owner, function calls from owner ====================//
  // set pause, set unpause tested above

  it("first owner: should set start date", function() {
    var meta;
    var newStart = 1502463457;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[0]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(newStart, start, "Start date not changed");
    });
  });

  it("first owner: should set period", function() {
    var meta;
    var newPeriod = 990;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[0]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.equal(newPeriod, period, "Period not changed");
    });
  });

  it("first owner: should change wallet", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[2], wallet, "Wallet changed");
    });
  });

  it("first owner: should change ownership", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[4], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[4], "Owner not changed");
    });
  });

  //============= second owner, function calls from owner ====================//

  it("second owner: should change ownership", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[1], {from: accounts[4]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[1], "Owner not changed");
    });
  });

  it("second owner: should set start date", function() {
    var meta;
    var newStart = 1502463457;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(newStart, start, "Start date not changed");
    });
  });

  it("second owner: should set period", function() {
    var meta;
    var newPeriod = 999;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[1]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.equal(newPeriod, period, "Period not changed");
    });
  });

  it("second owner: should change wallet", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[0], {from: accounts[1]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[0], wallet, "Wallet changed");
    });
  });


  //============= second owner, function calls not from owner ====================//

  it("second owner: should not change ownership", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.notEqual(accounts[2], owner, "Owner changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.owner.call().then(function(owner) {
          assert.notEqual(accounts[2], owner, "Owner changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change start date", function() {
    var meta;
    var newStart = 1502463498;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[0]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.notEqual(newStart, start, "Start date changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.start.call().then(function(start) {
          assert.notEqual(newStart, start, "Start date changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change period", function() {
    var meta;
    var newPeriod = 95;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[0]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.notEqual(newPeriod, period, "Period changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.period.call().then(function(period) {
          assert.notEqual(newPeriod, period, "Period changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not paused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.notEqual(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.notEqual(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should paused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "not paused");
    });
  });

  it("second owner: should not paused when paused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.pause({from: accounts[1]});
    }).then(function() {
      assert.equal(true, false, "paused when paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "paused when paused");
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not unpaused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[0]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(true, paused, "paused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.paused.call().then(function(paused) {
          assert.equal(true, paused, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should unpaused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      return meta.paused.call();
    }).then(function(paused) {
      assert.equal(false, paused, "not unpaused");
    });
  });

  it("second owner: should not unpaused when unpaused", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.unpause({from: accounts[1]});
    }).then(function() {
      assert.equal(true, false, "unpaused when unpaused");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return assert.equal(true, true, "unpaused when unpaused");
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change wallet", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[1], {from: accounts[0]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[1], wallet, "wallet changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.wallet.call().then(function(wallet) {
          assert.notEqual(accounts[1], wallet, "paused");
        });
      } else {
        throw e;
      }
    });
  });

  //===================== perform test after secodnd owner tests ==================//
  //   account 0 - old owner
  //   account 1 - current owner
  //   account 2 - wallet
  //   start - 0
  //   period - 0
  //   paused = not
  //

  it("perform after second: should set start date to zero", function() {
    var meta;
    var newStart = 0;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(newStart, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(newStart, start, "Start date not changed");
    });
  });

  it("perform after second: should change period to zero", function() {
    var meta;
    var newPeriod = 5;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setPeriod(newPeriod, {from: accounts[1]});
    }).then(function() {
      return meta.period.call();
    }).then(function(period) {
      assert.equal(newPeriod, period, "Period not changed");
    });
  });

  it("perform after second: should change wallet to one", function() {
    var meta;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.wallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[2], wallet, "Wallet changed");
    });
  });


  //==================== investments time tests ========================//
  //
  // owner initialized in customer way - changed to customer after deploy
  // wallet initialized as 2
  // otjer fields initialized in after deploy state
  // detailed:
  //   account 0 - old owner
  //   account 1 - current owner
  //   account 2 - wallet
  //   start - 0 - should change in current tests
  //   period - 5
  //   paused = not
  //
  //   work account - 3
  //

  it("investment time test: should not invest before start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) + 60*60;
    var invested = web3.toWei(15, 'ether');
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      assert.equal(0, total, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.total.call().then(function(total) {
          assert.equal(0, total, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  it("investment time test: should not invest after start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) - 10*24*60*60;
    var invested = web3.toWei(15, 'ether');
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      assert.equal(0, total, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.total.call().then(function(total) {
          assert.equal(0, total, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  //======================= integration test ==========================================//
  //
  // send from account 3 - 15
  // send from account 4 - 40
  // send from account 5 - 65
  //
  it("Integration test during invest time", function() {
    var meta;
    var gasNeeds = 115000;
    var startDate = Math.floor(Date.now()/1000) - 2*24*60*60;
    var invested1 = parseInt(web3.toWei(15, 'ether'));
    var invested2 = parseInt(web3.toWei(40, 'ether'));
    var invested3 = parseInt(web3.toWei(165, 'ether'));
    var walletBalance;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      walletBalance = parseInt(balance);
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested1, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1, total, "wrong total field");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(1, totalInvestors, "wrong investors count");
    }).then(function() {
      return meta.investors.call(0);
    }).then(function(investor) {
      return assert.equal(accounts[3], investor, "wrong investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[3]);
    }).then(function(balance) {
      return assert.equal(invested1, balance, "wrong investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1, balance, "wrong investor balance");
    // 2
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[4], to: meta.address, value: invested2, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2, total, "wrong total field after second invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(2, totalInvestors, "wrong investors count - should be 2");
    }).then(function() {
      return meta.investors.call(1);
    }).then(function(investor) {
      return assert.equal(accounts[4], investor, "wrong second investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[4]);
    }).then(function(balance) {
      return assert.equal(invested2, balance, "wrong second investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1 + invested2, balance, "wrong wallet balance after second investor");
    // 3
    // needs gas?
    /*}).then(function() {
      var moreEther = parseInt(web3.toWei(0.5, 'ether'));
      return web3.eth.sendTransaction({ from: accounts[0], to: accounts[5], value: moreEther});
    }).then(function() {
      var moreEther = parseInt(web3.toWei(0.5, 'ether'));
      return web3.eth.sendTransaction({ from: accounts[1], to: accounts[5], value: moreEther});
    }).then(function() {
      var moreEther = parseInt(web3.toWei(0.5, 'ether'));
      return web3.eth.sendTransaction({ from: accounts[3], to: accounts[5], value: moreEther});*/
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[5], to: meta.address, value: invested3, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2 + invested3, total, "wrong total field after thrid invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(3, totalInvestors, "wrong investors count - should be 3");
    }).then(function() {
      return meta.investors.call(2);
    }).then(function(investor) {
      return assert.equal(accounts[5], investor, "wrong thrid investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[5]);
    }).then(function(balance) {
      return assert.equal(invested3, balance, "wrong thrid investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1 + invested2 + invested3, balance, "wrong wallet balance after thrid investor");
    });

  });

  // twice invested test

});
