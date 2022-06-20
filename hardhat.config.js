/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-waffle');


module.exports = {
  solidity: "0.8.0",
  
  networks: {
    rinkeby: {
      url:process.env.INFURA_URL,
      accounts:["0x"+process.env.PRIVATE_KEY]
    }
  }

};
