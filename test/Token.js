const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Token contract', ()=>{

    const decimalPlaces = 18;
 
    let Token_JOHNMOCHI,token_jomo,owner,addr1,addr2
    beforeEach( async()=>{
        //Token.sol 
        Token_JOHNMOCHI=await ethers.getContractFactory('Token');
        token_jomo=await Token_JOHNMOCHI.deploy();

        // Get account from blockchain
        [owner,addr1,addr2,_]= await ethers.getSigners();

    });
    describe('Deployment', ()=>{

        it ("Test#1-Set the right owner",async()=>{

            expect(await token_jomo.owner()).to.equal(owner.address);

        });

        it("Test#2-Check balance of owner and total supply",async()=>{
           
           const owner_Balance= await token_jomo.balanceOf(owner.address);
           const total_Supply=await token_jomo.totalSupply()
           expect(total_Supply).to.equal(owner_Balance);

        });
    }) ;

    describe('Transaction',()=>{
        const amount_test=100
        const amount_to_addr1=100
        const amount_to_addr2=50

        it("Test#3-Transfare amont",async()=>{
            // transfer from token to address1

            await token_jomo.transfer(addr1.address,amount_test)
            const addr1Bal=await token_jomo.balanceOf(addr1.address)
            expect(addr1Bal).to.equal(amount_test)
  
            // transfer from address1 to address2
            await token_jomo.connect(addr1).transfer(addr2.address,amount_test)
            const addr2Bal=await token_jomo.balanceOf(addr2.address)
            expect(addr2Bal).to.equal(amount_test)
            
            // get balance after transfer money to address2
            const addr1Bal_2=await token_jomo.balanceOf(addr1.address)
            expect(addr1Bal_2).to.equal(0)
        })
             
           // adrees1 transfer all amont to address2 so there isn't enough money to deposite back to Token
        // Test Error
        //    it("Test#4-fail because of not enough tokens",async()=>{
        //     const initBalanceOwner=await token_jomo.balanceOf(owner.address);
        //     // fail to transfer
        //     await expect(token_jomo.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens")
        //     expect( await token_jomo.balanceOf(owner.address)).to.equal(initBalanceOwner)
        //   })

          
        it("Test#5-update balances after transfer",async()=>{
            const initBalanceOwner=await token_jomo.balanceOf(owner.address);
            // transfer amount to address1 and address2
 
            await token_jomo.transfer(addr1.address,amount_to_addr1);
            await token_jomo.transfer(addr2.address,amount_to_addr2);
 
            const finalOwnerBalance=await token_jomo.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initBalanceOwner-(amount_to_addr1+amount_to_addr2))
 
            const addr1_Balance=await token_jomo.balanceOf(addr1.address);
            expect(addr1_Balance).to.equal(amount_to_addr1)
 
            const addr2_Balance=await token_jomo.balanceOf(addr2.address);
            expect(addr2_Balance).to.equal(amount_to_addr2)
 
 
         })

    })


});
