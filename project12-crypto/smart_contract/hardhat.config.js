require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig *//**b0117752b31401b38c571fc8a737d*/
module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"goerli",
  networks:{
    goerli:{
    url:'https://eth-goerli.g.alchemy.com/v2/TtbOdXnddzbiPzVbKmHt7iIRXNR394bg',
    accounts:['9c2554d52b652451c7ec7c99c869085ffdb']
  },
}

};
