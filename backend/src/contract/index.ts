import fs from 'fs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import env from '~/config/env';
import contractABI from './contractCompiled';

const web3 = new Web3(new Web3.providers.HttpProvider(env.BLOCKCHAIN_RPC));

function initContract() {
  const contract: Contract = new web3.eth.Contract(contractABI.abi);

  web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];

    if (env.CONTRACT_ADDRESS) {
      contract.options.address = env.CONTRACT_ADDRESS;
    } else {
      contract
        .deploy({
          data: contractABI.bytecode,
        })
        .send(
          {
            from: web3.eth.defaultAccount,
          },
          (err, transactionHash) => {
            if (err) {
              console.error(err);
            }
            console.log('transactionHash', transactionHash);
          }
        )
        .on('error', function (error) {
          console.error(error);
        })
        .on('receipt', function (receipt) {
          console.info('Deploy Receipt:', receipt); // contains the new contract address
        })
        .then((newContractInstance) => {
          console.log('Contract Address:', newContractInstance.options.address);
          contract.options.address = newContractInstance.options.address;
        });
    }
  });
  return contract;
}
export { web3 };

export default initContract();
