const { ethers } = require("hardhat")
const fs=require('fs')

async function main(){
  const [deployer_owner]=await ethers.getSigners()
  console.log("Deployong contracts with the account "+deployer_owner.address)

  const balance=await deployer_owner.getBalance()
  console.log("Account balance "+balance.toString())
  
  const Token=await ethers.getContractFactory('Token')
  const token_jomo=await Token.deploy();
  console.log("Token balance "+token_jomo.address)
  
  // build abi file for the next calling
  const data={
      address: token_jomo.address,
      abi:JSON.parse( token_jomo.interface.format('json'))
  }
  fs.writeFileSync('frontend/src/Token.json',JSON.stringify(data))

}

main()
.then( ()=>process.exit(0))
.catch( (error)=>{
     console.error(errpr)
     process.exit(1)
}
)