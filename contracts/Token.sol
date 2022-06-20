//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Token {
string public name="My John-Mochi Hardhat Token";
string public symbol= "JOHNMOCHI";
uint public totalSupply=10000;

address public owner;
mapping(address=>uint) balances;

constructor(){
    balances[msg.sender]=totalSupply;
    owner=msg.sender;
}

function transfer(address to,uint amount) public{
    console.log('Sender balance is %s token',balances[msg.sender]);
    console.log('Try to send %s token to %s ',amount,to);

    require(balances[msg.sender]>=amount,'Not enough token');
    balances[msg.sender]-=amount;
    balances[to]+=amount;
}
function balanceOf(address account) public view returns(uint){
    return balances[account];
}

}