const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let register1;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  register1 = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
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
    assert.equal(result[0], accounts[0]);
    assert (result[1] > '1577804232');
    assert.equal(result[2], 'Test1');
  });
  /*
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
*/
});
