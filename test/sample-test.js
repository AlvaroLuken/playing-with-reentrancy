const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Re-Entrancy Tester", function () {
  let attackContract, etherStoreContract;
  const provider = waffle.provider;

  beforeEach("deploy contracts first", async () => {
    const EtherStore = await ethers.getContractFactory("EtherStore");
    etherStoreContract = await EtherStore.deploy({
      value: ethers.utils.parseUnits("100", "ether"),
    });
    await etherStoreContract.deployed();

    const Attack = await ethers.getContractFactory("Attack");
    attackContract = await Attack.deploy(etherStoreContract.address);
    await attackContract.deployed();
  });

  it("should deploy EtherStore with 100 ether", async function () {
    const etherStoreBalance = await provider.getBalance(etherStoreContract.address);
    expect(etherStoreBalance).to.equal(ethers.utils.parseUnits("100", "ether"));
  });

  it("store a pointer of EtherStore address in Attack contract", async function () {
    expect(await attackContract.etherStore()).to.equal(etherStoreContract.address);
  });

  describe("Launch Attack", function () {
    beforeEach("will attack from separate signer and log balance", async () => {
      let signer1 = await provider.getSigner(1);
      let signer1Address = await signer1.getAddress();
      let signer1Balance = await provider.getBalance(signer1Address);
      
      await attackContract.connect(signer1).attack({
        value: ethers.utils.parseUnits("1", "ether")
      });
    });

    describe("After Attack", function () {
      it("should drain EtherStore balance to 0", async function () {
        expect(await provider.getBalance(etherStoreContract.address)).to.equal(0);
      });

      it("should increment Attack Contract's balance to 101 ether", async function () {
        expect(await provider.getBalance(attackContract.address)).to.equal(ethers.utils.parseUnits("101", "ether"));
        console.log(await provider.getBalance(attackContract.address));
      });
    });
  });
});
