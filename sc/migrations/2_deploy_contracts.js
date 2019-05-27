const UnitStampFactory = artifacts.require("UnitStampFactory");

module.exports = function (deployer) {
  deployer.deploy(UnitStampFactory);
};
