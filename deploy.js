const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledRegister1 = require('./build/Register1.json');

console.log(process.env.WALLET_SEED, process.env.INFURA_ENDP)

const provider = new HDWalletProvider(
	process.env.WALLET_SEED,
	process.env.INFURA_ENDP
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledRegister1.interface)
  )
    .deploy({ data: '0x' + compiledRegister1.bytecode })
    .send({ gas: '100000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

