var Crowdsale = artifacts.require("Crowdsale");
var INCToken = artifacts.require("INCToken");
var BigNumber = require('bignumber.js');

contract('Crowdsale', function(accounts) {
 
  //============= first owner, function calls from not owner ====================//


  var newPeriod1 = 7;
  var newBonus1 = 60;

  var newPeriod2 = 7;
  var newBonus2 = 50;

  var newPeriod3 = 7;
  var newBonus3 = 0;

  var newPeriod4 = 21;
  var newBonus4 = 35;

  var newPeriod5 = 41;
  var newBonus5 = 24;

  var newPeriod5c = 413;
  var newBonus5c = 0;

  var newPrice = 1000000;

  it("first owner: should not change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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

  it("first owner: should not paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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

  it("first owner: should not change multisig wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setMultisigWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.multisigWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.multisigWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change bounty wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.bountyTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change founders wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.foundersTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change founders percent", function() {
    var meta;
    var newFoundersTokensPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensPercent(newFoundersTokensPercent, {from: accounts[1]});
    }).then(function() {
      return meta.foundersTokensPercent.call();
    }).then(function(foundersTokensPercent) {
      assert.notEqual(newFoundersTokensPercent, foundersTokensPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersTokensPercent.call().then(function(foundersTokensPercent) {
          assert.notEqual(newFoundersTokensPercent, foundersTokensPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not change bounty percent", function() {
    var meta;
    var newBountyTokensPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensPercent(newBountyTokensPercent, {from: accounts[1]});
    }).then(function() {
      return meta.bountyTokensPercent.call();
    }).then(function(bountyTokensPercent) {
      assert.notEqual(newBountyTokensPercent, bountyTokensPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyTokensPercent.call().then(function(bountyTokensPercent) {
          assert.notEqual(newBountyTokensPercent, bountyTokensPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should not add stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(1, 10, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(0, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(0, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("first owner: should add stage 1", function() {
    var meta;
    var newPeriod = newPeriod1;
    var newBonus = newBonus1;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(1, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod, "stage period wrong");
      assert.equal(stages[1], newBonus, "stage bonus wrong");
    });
  });

  it("first owner: should not remove stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeMilestone(0, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(1, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(1, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("first owner: should not change stage", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newBonus = newBonus5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeMilestone(0, newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestones(0).then(function(stages) {
         assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
         assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
     });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should add stage 2", function() {
    var meta;
    var newPeriod = newPeriod2;
    var newBonus = newBonus2;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(2, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
    });
  });

  it("first owner: should add stage 4", function() {
    var meta;
    var newPeriod = newPeriod4;
    var newBonus = newBonus4;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(3, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  // FIXME: check insert stage params
  it("first owner: should not insert stage", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newBonus = newBonus3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertMilestone(1, newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(3, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(3, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("first owner: should insert stage 3", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newBonus = newBonus3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertMilestone(1, newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(4, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("first owner: should insert stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newBonus = newBonus5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertMilestone(2, newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(5, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5, "stage 5 period wrong");
      assert.equal(stages[1], newBonus5, "stage 5 bonus wrong");
      return meta.milestones(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("first owner: should changes stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newBonus = newBonus5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeMilestone(3, newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(5, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5c, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5c, "stage 5c period wrong");
      assert.equal(stages[1], newBonus5c, "stage 5c bonus wrong");
      return meta.milestones(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 hardcap wrong");
    });
  });

  it("first owner: remove stage 5 from not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newBonus = newBonus5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeMilestone(3, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(4, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  // TODO: should check total values - and another not tests too
  it("first owner: should not clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearMilestones({from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(4, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(4, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("first owner: should clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearMilestones({from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(0, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(0, totalPeriod, "total period not changed");
    });
  });

  // inverse of ownership from 0 to 1 and run all access tests again

  it("first owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[1], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[1], "Owner not changed");
    });
  });

  it("second owner: should not change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[2], {from: accounts[0]});
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

  it("second owner: should not change start date", function() {
    var meta;
    var newStart = 1502463457;
    return Crowdsale.deployed().then(function(instance) {
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

  it("second owner: should not paused", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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
    return Crowdsale.deployed().then(function(instance) {
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

  it("second owner: should not change multisig wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setMultisigWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.multisigWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.multisigWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change bounty wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.bountyTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change founders wallet", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensWallet(accounts[2], {from: accounts[0]});
    }).then(function() {
      return meta.foundersTokensWallet.call();
    }).then(function(wallet) {
      assert.notEqual(accounts[2], wallet, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersTokensWallet.call().then(function(wallet) {
          assert.notEqual(accounts[2], wallet, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change founders percent", function() {
    var meta;
    var newFoundersTokensPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensPercent(newFoundersTokensPercent, {from: accounts[0]});
    }).then(function() {
      return meta.foundersTokensPercent.call();
    }).then(function(foundersTokensPercent) {
      assert.notEqual(newFoundersTokensPercent, foundersTokensPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.foundersTokensPercent.call().then(function(foundersTokensPercent) {
          assert.notEqual(newFoundersTokensPercent, foundersTokensPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not change bounty percent", function() {
    var meta;
    var newBountyTokensPercent = 30;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensPercent(newBountyTokensPercent, {from: accounts[0]});
    }).then(function() {
      return meta.bountyTokensPercent.call();
    }).then(function(bountyTokensPercent) {
      assert.notEqual(newBountyTokensPercent, bountyTokensPercent, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.bountyTokensPercent.call().then(function(bountyTokensPercent) {
          assert.notEqual(newBountyTokensPercent, bountyTokensPercent, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should not add stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(1, 12, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(0, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(0, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("second owner: should add stage 1", function() {
    var meta;
    var newPeriod = newPeriod1;
    var newBonus = newBonus1;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(1, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod, "stage period wrong");
      assert.equal(stages[1], newBonus, "stage bonus wrong");
    });
  });

  it("second owner: should not remove stage", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeMilestone(0, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(1, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(1, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("second owner: should not change stage", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newBonus = newBonus5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeMilestone(0, newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestones(0).then(function(stages) {
         assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
         assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
     });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should add stage 2", function() {
    var meta;
    var newPeriod = newPeriod2;
    var newBonus = newBonus2;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(2, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
    });
  });

  it("second owner: should add stage 4", function() {
    var meta;
    var newPeriod = newPeriod4;
    var newBonus = newBonus4;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(3, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("second owner: should not insert stage", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newBonus = newBonus3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertMilestone(1, newPeriod, newBonus, {from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(3, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(3, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });


  it("second owner: should insert stage 3", function() {
    var meta;
    var newPeriod = newPeriod3;
    var newBonus = newBonus3;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertMilestone(1, newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(4, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("second owner: should insert stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newBonus = newBonus5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.insertMilestone(2, newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(5, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5, "stage 5 period wrong");
      assert.equal(stages[1], newBonus5, "stage 5 bonus wrong");
      return meta.milestones(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("second owner: should changes stage 5 in not right place", function() {
    var meta;
    var newPeriod = newPeriod5c;
    var newBonus = newBonus5c;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.changeMilestone(3, newPeriod, newBonus, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(5, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4 + newPeriod5c, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod5c, "stage 5c period wrong");
      assert.equal(stages[1], newBonus5c, "stage 5c bonus wrong");
      return meta.milestones(4);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("second owner: remove stage 5 from not right place", function() {
    var meta;
    var newPeriod = newPeriod5;
    var newBonus = newBonus5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.removeMilestone(3, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(4, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(newPeriod1 + newPeriod2 + newPeriod3 + newPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], newPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  // TODO: should check total values - and another not tests too
  it("second owner: should not clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearMilestones({from: accounts[0]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.notEqual(4, milestonesCount, "changed");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.milestonesCount().then(function(milestonesCount) {
          assert.equal(4, milestonesCount, "changed");
        });
      } else {
        throw e;
      }
    });
  });

  it("second owner: should clear stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.clearMilestones({from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(0, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(0, totalPeriod, "total period not changed");
    });
  });

  it("second owner: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[0], {from: accounts[1]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], "Owner not changed");
    });
  });


//
// State now cleared - now pass control to second account,
// and configure to minimodel and test it.
//
//  1. Owner wallet = 1
//  2. multisigWallet = 0
//  3. founders wallet = 2
//  4. bounty wallet = 3
//  5. founders percent - 4.5% - in 1000 part - 45
//  6. bounty percent - 0.5% - in 1000 part - 5
//
//  7. investor 1 wallet = 4
//  8. investor 2 wallet = 5
//  9. investor 3 wallet = 6
// 10. investor 4 wallet = 7
// 11. investor 5 wallet = 8
//
  it("ICO 1: should change ownership", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.transferOwnership(accounts[1], {from: accounts[0]});
    }).then(function() {
      return meta.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[1], "Owner not changed");
    });
  });

  // setup all wallets
  it("ICO 1: should set wallet for investments", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setMultisigWallet(accounts[0], {from: accounts[1]});
    }).then(function() {
      return meta.multisigWallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[0], wallet, "not changed");
    });
  });

  it("ICO 1: should set wallet for founders tokens", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensWallet(accounts[2], {from: accounts[1]});
    }).then(function() {
      return meta.foundersTokensWallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[2], wallet, "not changed");
    });
  });

  it("ICO 1: should set wallet for bounty tokens", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensWallet(accounts[3], {from: accounts[1]});
    }).then(function() {
      return meta.bountyTokensWallet.call();
    }).then(function(wallet) {
      assert.equal(accounts[3], wallet, "not changed");
    });
  });

  // setup percents for founders and bounty tokens
  it("ICO 1: should set founders tokens percent", function() {
    var meta;
    var newFoudnersPercent = 45;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setFoundersTokensPercent(newFoudnersPercent, {from: accounts[1]});
    }).then(function() {
      return meta.foundersTokensPercent.call();
    }).then(function(foundersTokensPercent) {
      assert.equal(newFoudnersPercent, foundersTokensPercent, "not changed");
    });
  });

  it("ICO 1: should set bounty percent", function() {
    var meta;
    var newBountyTokensPercent = 5;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setBountyTokensPercent(newBountyTokensPercent, {from: accounts[1]});
    }).then(function() {
      return meta.bountyTokensPercent.call();
    }).then(function(bountyTokensPercent) {
      assert.equal(newBountyTokensPercent, bountyTokensPercent, "not changed");
    });
  });

  //
  // setup miniICO model:
  // stages
  //
  // 1) addMilestone(1,   850 000000000000000000, 1700000000000000);
  // 2) addMilestone(1,  2550 000000000000000000, 2550000000000000);
  // 3) addMilestone(1,  8160 000000000000000000, 2720000000000000);
  // 4) addMilestone(1, 49300 000000000000000000, 3400000000000000);
  // 
  //


  var modelPeriod1 = 1;
  var modelPeriod2 = 1;
  var modelPeriod3 = 1;
  var modelPeriod4 = 1;

  it("ICO 1: should setup stages", function() {
    var meta;
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.addMilestone(modelPeriod1, newBonus1, {from: accounts[1]});
    }).then(function() {
      return meta.addMilestone(modelPeriod2, newBonus2, {from: accounts[1]});
    }).then(function() {
      return meta.addMilestone(modelPeriod3, newBonus3, {from: accounts[1]});
    }).then(function() {
      return meta.addMilestone(modelPeriod4, newBonus4, {from: accounts[1]});
    }).then(function() {
      return meta.milestonesCount();
    }).then(function(milestonesCount) {
      assert.equal(4, milestonesCount, "stages count not changed");
      return meta.totalPeriod.call();
    }).then(function(totalPeriod) {
      assert.equal(modelPeriod1 + modelPeriod2 + modelPeriod3 + modelPeriod4, totalPeriod, "total period not changed");
      return meta.milestones(0);
    }).then(function(stages) {
      assert.equal(stages[0], modelPeriod1, "stage 1 period wrong");
      assert.equal(stages[1], newBonus1, "stage 1 bonus wrong");
      return meta.milestones(1);
    }).then(function(stages) {
      assert.equal(stages[0], modelPeriod2, "stage 2 period wrong");
      assert.equal(stages[1], newBonus2, "stage 2 bonus wrong");
      return meta.milestones(2);
    }).then(function(stages) {
      assert.equal(stages[0], modelPeriod3, "stage 3 period wrong");
      assert.equal(stages[1], newBonus3, "stage 3 bonus wrong");
      return meta.milestones(3);
    }).then(function(stages) {
      assert.equal(stages[0], modelPeriod4, "stage 4 period wrong");
      assert.equal(stages[1], newBonus4, "stage 4 bonus wrong");
    });
  });

  it("ICO 1 - ICO not started: should not invest before start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) + 60*60;
    var invested = web3.toWei(15, 'ether');
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(startDate, start, "invest date not changed");
      return web3.eth.sendTransaction({ from: accounts[4], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.invested.call();
    }).then(function(totalInvested) {
      assert.equal(0, totalInvested, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.invested.call().then(function(totalInvested) {
          assert.equal(0, totalInvested, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  it("ICO 1 - ICO finished: should not invest after ICO finnished", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) - 100*24*60*60;
    var invested = web3.toWei(15, 'ether');
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function() {
      return meta.start.call();
    }).then(function(start) {
      assert.equal(startDate, start, "invest date not changed");
      return web3.eth.sendTransaction({ from: accounts[4], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.invested.call();
    }).then(function(totalInvested) {
      assert.equal(0, totalInvested, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.invested.call().then(function(totalInvested) {
          assert.equal(0, totalInvested, "invested");
        });
      } else {
        throw e;
      }
    });
  });


  it("ICO 1 - ICO started minute ago: should invest returns success", function() {
    var etherMul = new BigNumber(1000000000000000000);
    var meta;
    var metaToken;
    var transferredFDC = 1;
    var transferredFDCInWei = new BigNumber(web3.toWei(transferredFDC, 'ether'));;
    var catched = false;
    var startDate = Math.floor(Date.now()/1000) - 60;
    var investedInEth = 15;
    var investedInWei = new BigNumber(web3.toWei(investedInEth, 'ether'));
    var investedPass1StageInEth = 851;
    var investedPass1StageInWei = new BigNumber(web3.toWei(investedPass1StageInEth, 'ether'));
    var investedPass2StageInEth = 2551;
    var investedPass2StageInWei = new BigNumber(web3.toWei(investedPass2StageInEth, 'ether'));
    var investedPass3StageInEth = 8161;
    var investedPass3StageInWei = new BigNumber(web3.toWei(investedPass3StageInEth, 'ether'));
    var investedPass4StageInEth = 49301;
    var investedPass4StageInWei = new BigNumber(web3.toWei(investedPass4StageInEth, 'ether'));

    var investedAfter_1_2_3_in_Ether = investedInEth + investedPass1StageInEth + investedPass2StageInEth;
    var investedAfter_1_2_3_in_Wgei = new BigNumber(web3.toWei(investedAfter_1_2_3_in_Ether, 'ether'));

    var investedAfter_1_2_3_4_in_Ether = investedInEth + investedPass1StageInEth + investedPass2StageInEth + investedPass3StageInEth;
    var investedAfter_1_2_3_4_in_Wgei = new BigNumber(web3.toWei(investedAfter_1_2_3_4_in_Ether, 'ether'));

    var investedAfter_1_2_3_4_5_in_Ether = investedInEth + investedPass1StageInEth + investedPass2StageInEth + investedPass3StageInEth + investedPass4StageInEth;
    var investedAfter_1_2_3_4_5_in_Wgei = new BigNumber(web3.toWei(investedAfter_1_2_3_4_5_in_Ether, 'ether'));

    var lastDate = startDate + (modelPeriod1 + modelPeriod2 + modelPeriod3 + modelPeriod4)*24*60*60;
    var firstInvestorTokensFDC = investedInWei.dividedToIntegerBy(new BigNumber(newPrice));
    var firstInvestorTokensFDCInWei = firstInvestorTokensFDC.mul(etherMul);
    var investedPass1StageTokensFDC = investedPass1StageInWei.dividedToIntegerBy(new BigNumber(newPrice));
    var investedPass1StageTokensFDCInWei = investedPass1StageTokensFDC.mul(etherMul);
    var investedPass2StageTokensFDC = investedPass2StageInWei.dividedToIntegerBy(new BigNumber(newPrice));
    var investedPass2StageTokensFDCInWei = investedPass2StageTokensFDC.mul(etherMul);
    var investedPass3StageTokensFDC = investedPass3StageInWei.dividedToIntegerBy(new BigNumber(newPrice));
    var investedPass3StageTokensFDCInWei = investedPass3StageTokensFDC.mul(etherMul);
    var investedPass4StageTokensFDC = investedPass4StageInWei.dividedToIntegerBy(new BigNumber(newPrice));
    var investedPass4StageTokensFDCInWei = investedPass4StageTokensFDC.mul(etherMul);
    var lastDateAfterSecondInvestor;
    var lastDateAfterThridInvestor;
    var lastDateAfter4Investor;
    var lastDateAfter5Investor;
    var mBalanceMultisigFDC;
    var mBalanceFoundersFDC;
    var mBalanceBountyFDC;
    var mBalanceInvestorsFDC;

    console.log("1");
    return Crowdsale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function() {
      var hardcap = 100000000000000000000;
      return meta.setHardcap(hardcap, { from: accounts[1], gas: 180000 })
    }).then(function() {
      return meta.token.call();
    }).then(function(token) {
      metaToken = INCToken.at(token);
      return meta.start.call();
    }).then(function(start) {

      console.log("2");
      assert.equal(startDate, start, "invest date not changed");
      return meta.lastSaleDate.call();
    }).then(function(lastSaleDate) {

      console.log("2.1");
      assert.equal(lastDate, lastSaleDate, "invest last sale date");
      return meta.currentMilestone.call();
    }).then(function(stageIndex) {
      console.log("2.2");
      assert.equal(0, stageIndex, "current stage wrong");
      return web3.eth.sendTransaction({ from: accounts[4], to: meta.address, value: investedInWei, gas: 180000 })
    }).then(function() {
      console.log("2.3");
      return meta.invested.call();
    }).then(function(totalInvested) {
      console.log("2.4");
      assert.equal(investedInWei.toString(), totalInvested.toString(), "not invested");
      return metaToken.totalSupply.call();
    }).then(function(totalSupply) {
      console.log("2.5");
      var parsedInvested = web3.toWei(totalSupply, 'ether');
      assert.equal(firstInvestorTokensFDCInWei.toString(), totalSupply.toString(), "not mint right count of tokens");
    // test to pass first stage //

      console.log("2.6");
      lastDateAfterSecondInvestor = Math.floor(Date.now()/1000) + (modelPeriod2 + modelPeriod3 + modelPeriod4)*24*60*60;
      return web3.eth.sendTransaction({ from: accounts[5], to: meta.address, value: investedPass1StageInWei, gas: 180000 })
    }).then(function() {

      console.log("3");
      return meta.invested.call();
    }).then(function(totalInvested) {
      assert.equal(investedInWei.add(investedPass1StageInWei).toString(), totalInvested.toString(), "not invested pass stage 1");
      return metaToken.totalSupply.call();
    }).then(function(totalSupply) {
      assert.equal(firstInvestorTokensFDCInWei.add(investedPass1StageTokensFDCInWei).toString(), totalSupply.toString(), "not mint right count of tokens  pass stage 1");
      return meta.currentMilestone.call();
    }).then(function(stageIndex) {
      assert.equal(1, stageIndex, "current stage wrong after second investor");
      return meta.lastSaleDate.call();
    }).then(function(lastSaleDate) {
      var fixedDate = parseInt(lastSaleDate);
      if(fixedDate > lastDateAfterSecondInvestor) {
	fixedDate--;
      }
      assert.equal(lastDateAfterSecondInvestor, fixedDate, "invest last sale date after second investor");
    // test to pass second stage //
      lastDateAfterThridInvestor = Math.floor(Date.now()/1000) + (modelPeriod3 + modelPeriod4)*24*60*60;
      return web3.eth.sendTransaction({ from: accounts[6], to: meta.address, value: investedPass2StageInWei, gas: 180000 })
    }).then(function() {

      console.log("4");
      return meta.invested.call();
    }).then(function(totalInvested) {
      assert.equal(investedAfter_1_2_3_in_Wgei.toString(), totalInvested.toString(), "not invested pass stage 2");
      return metaToken.totalSupply.call();
    }).then(function(totalSupply) {
      assert.equal(firstInvestorTokensFDCInWei.add(investedPass1StageTokensFDCInWei).add(investedPass2StageTokensFDCInWei).toString(), totalSupply.toString(), "not mint right count of tokens  pass stage 2");
      return meta.currentMilestone.call();
    }).then(function(stageIndex) {
      assert.equal(2, stageIndex, "current stage wrong after thrid investor");
      return meta.lastSaleDate.call();
    }).then(function(lastSaleDate) {
      var fixedDate = parseInt(lastSaleDate);
      if(fixedDate > lastDateAfterThridInvestor) {
	fixedDate--;
      }
      assert.equal(lastDateAfterThridInvestor, fixedDate, "invest last sale date after thrid investor");
    // test to pass 3 stage //
      lastDateAfter4Investor = Math.floor(Date.now()/1000) + (modelPeriod4)*24*60*60;
      return web3.eth.sendTransaction({ from: accounts[7], to: meta.address, value: investedPass3StageInWei, gas: 180000 })
    }).then(function() {

      console.log("5");
      return meta.invested.call();
    }).then(function(totalInvested) {
      assert.equal(investedAfter_1_2_3_4_in_Wgei.toString(), totalInvested.toString(), "not invested pass stage 3");
      return metaToken.totalSupply.call();
    }).then(function(totalSupply) {
      assert.equal(firstInvestorTokensFDCInWei.add(investedPass1StageTokensFDCInWei).add(investedPass2StageTokensFDCInWei).add(investedPass3StageTokensFDCInWei).toString(), totalSupply.toString(), "not mint right count of tokens  pass stage 3");
      return meta.currentMilestone.call();
    }).then(function(stageIndex) {

      console.log("6");
      assert.equal(3, stageIndex, "current stage wrong after 4 investor");
      return meta.lastSaleDate.call();
    }).then(function(lastSaleDate) {
      var fixedDate = parseInt(lastSaleDate);
      if(fixedDate > lastDateAfter4Investor) {
	fixedDate--;
      }
      assert.equal(lastDateAfter4Investor, fixedDate, "invest last sale date after 4 investor");
    // test to pass 4 stage //
      lastDateAfter5Investor = Math.floor(Date.now()/1000);
      return web3.eth.sendTransaction({ from: accounts[8], to: meta.address, value: investedPass4StageInWei, gas: 180000 })
    }).then(function() {
      console.log("7");
      return meta.invested.call();
    }).then(function(totalInvested) {
      console.log("8");
      assert.equal(investedAfter_1_2_3_4_5_in_Wgei.toString(), totalInvested.toString(), "not invested pass stage 4");
      return metaToken.totalSupply.call();
    }).then(function(totalSupply) {
      console.log(totalSupply);
      mBalanceInvestorsFDC = totalSupply;
      assert.equal(firstInvestorTokensFDCInWei.add(investedPass1StageTokensFDCInWei).add(investedPass2StageTokensFDCInWei).add(investedPass3StageTokensFDCInWei).add(investedPass4StageTokensFDCInWei).toString(), totalSupply.toString(), "not mint right count of tokens  pass stage 4");
      return meta.lastSaleDate.call();
    }).then(function(lastSaleDate) {
      var fixedDate = parseInt(lastSaleDate);
      if(fixedDate > lastDateAfter5Investor) {
	fixedDate--;
      }
      assert.equal(lastDateAfter5Investor, fixedDate, "invest last sale date after 5 investor");
    // try to invest - should fail
      return web3.eth.sendTransaction({ from: accounts[9], to: meta.address, value: investedPass4StageInWei, gas: 180000 })
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {

        console.log("9");
        catched = true;
        return true;
      } else {
        throw e;
      }
    }).then(function() {
      assert.equal(true, catched, "not catched");
      catched = false;
      // try to transfer - should fail
      return metaToken.transfer(accounts[8], transferredFDCInWei, { from: accounts[9], gas: 180000 });
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        catched = true;
        console.log("10");
        return true;
      } else {
        throw e;
      }
    }).then(function() {
      assert.equal(true, catched, "not catched");
      catched = false;
      // finish minting try - try from not owner
      return meta.finishMinting({ from: accounts[0], gas: 180000 })
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        console.log("11");
        catched = true;
        return true;
      } else {
        throw e;
      }
    }).then(function() {
      console.log("12");
      assert.equal(true, catched, "not catched when try to finish minting from not owner");
      // finish minting try - it should mint tokens, check balances
      return meta.finishMinting({ from: accounts[1], gas: 180000 })
    }).then(function() {
      console.log("13");
      return metaToken.balanceOf(accounts[0]);
    }).then(function(balance) {
      mBalanceMultisigFDC = balance;
      console.log("14");
      return metaToken.balanceOf(accounts[2]);
    }).then(function(balance) {
      console.log("15");
      mBalanceFoundersFDC = balance;
      return metaToken.balanceOf(accounts[3]);
    }).then(function(balance) {
      console.log("16");
      mBalanceBountyFDC = balance;
      mSummaryMintedFDCAfterICO = mBalanceMultisigFDC.add(mBalanceInvestorsFDC).add(mBalanceFoundersFDC).add(mBalanceBountyFDC);
      mBountyPercentTokens = mSummaryMintedFDCAfterICO.div(new BigNumber(1000)).mul(new BigNumber(5));
      mFoundersPercentTokens = mSummaryMintedFDCAfterICO.div(new BigNumber(1000)).mul(new BigNumber(45));
      assert.equal(mBalanceFoundersFDC.dividedToIntegerBy(1000).toString(), mFoundersPercentTokens.dividedToIntegerBy(1000).toString(), "Fouders tokens wront count");
      assert.equal(mBalanceBountyFDC.dividedToIntegerBy(1000).toString(), mBountyPercentTokens.dividedToIntegerBy(1000).toString(), "Bounty tokens wront count");
      // check balances for 4,5,6,7,8
      return metaToken.balanceOf(accounts[4]);
    }).then(function(balance) {
      assert.equal(firstInvestorTokensFDCInWei.toString(), balance.toString(), "1 investor balance wrong!");
      return metaToken.balanceOf(accounts[5]);
    }).then(function(balance) {
      assert.equal(investedPass1StageTokensFDCInWei.toString(), balance.toString(), "2 investor balance wrong!");
      return metaToken.balanceOf(accounts[6]);
    }).then(function(balance) {
      assert.equal(investedPass2StageTokensFDCInWei, balance.toString(), "3 investor balance wrong!");
      return metaToken.balanceOf(accounts[7]);
    }).then(function(balance) {
      assert.equal(investedPass3StageTokensFDCInWei, balance.toString(), "4 investor balance wrong!");
      return metaToken.balanceOf(accounts[8]);
    }).then(function(balance) {
      assert.equal(investedPass4StageTokensFDCInWei, balance.toString(), "5 investor balance wrong!");
      // check transfer balance after ICO - try to move tokens - moved
      return metaToken.transfer(accounts[7], transferredFDCInWei, { from: accounts[8], gas: 180000 });
    }).then(function(balance) {
      return metaToken.balanceOf(accounts[4]);
    }).then(function(balance) {
      assert.equal(firstInvestorTokensFDCInWei.toString(), balance.toString(), "after transfer: 1 investor balance wrong!");
      return metaToken.balanceOf(accounts[5]);
    }).then(function(balance) {
      assert.equal(investedPass1StageTokensFDCInWei.toString(), balance.toString(), "after transfer: 2 investor balance wrong!");
      return metaToken.balanceOf(accounts[6]);
    }).then(function(balance) {
      assert.equal(investedPass2StageTokensFDCInWei.toString(), balance.toString(), "after transfer: 3 investor balance wrong!");
      return metaToken.balanceOf(accounts[7]);
    }).then(function(balance) {
      var invested7FDC = investedPass3StageTokensFDCInWei.add(transferredFDCInWei);
      assert.equal(balance.toString(), invested7FDC.toString(), "after transfer: 4 investor balance wrong!");
      return metaToken.balanceOf(accounts[8]);
    }).then(function(balance) {
      var invested8FDC = investedPass4StageTokensFDCInWei.sub(transferredFDCInWei)
      assert.equal(balance.toString(), invested8FDC.toString(), "after transfer: 5 investor balance wrong!");
    });

  });

  // try finish minting for not owner!!!
});
