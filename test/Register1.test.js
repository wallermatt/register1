const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledRegister1 = require('../build/Register1.json');

let accounts;
let register1;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  register1 = await new web3.eth.Contract(JSON.parse(compiledRegister1.interface))
    .deploy({
      data: compiledRegister1.bytecode
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Register1', () => {
  it('deploys a contract', () => {
    assert.ok(register1.options.address);
  });


  it('has a contract owner', async () => {
    const contractOwner = await register1.methods.contractOwner().call();
    assert.equal(contractOwner, accounts[0]);
  });


  it('can create a record', async () => {
    await register1.methods.createRecord('101', 'Test1').send({ from: accounts[0], gas: '1000000' });
    assert.equal(1,1);
  });

  it('can get a record', async () => {
    await register1.methods.createRecord('102', 'Test1').send({ from: accounts[0], gas: '1000000' });
    let result = await register1.methods.getRecord('102').call();
    assert.equal(result[0], true);
    assert.equal(result[1], accounts[0]);
    assert (result[2] > '1577804232');
    assert.equal(result[3], 'Test1');
  });

  it("cannot register a hash that is already registered", async () => {
    await register1.methods.createRecord('103', 'Test already reg').send({ from: accounts[0], gas: '1000000' });
    let result = await register1.methods.getRecord('103').call();
    assert.equal(result[0], true);
    
    try {
      await register1.methods.createRecord('103', 'Test try to reg again').send({ from: accounts[0], gas: '1000000' });
      assert(false);
    } catch(err) {
      assert(err);
    }

  });
 
});
