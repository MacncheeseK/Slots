// 1. Deposit some money 
// 2. determent number of lines to bet on 
// 3. Colllect a bet amount 
// 4. spin the slot meaching
// 5. check if user own
// 6. give the user ther wining 
// 7. play again 

const prompt = require("prompt-sync")();

const deposit = ()=>{
    while(true){
        const depositAmount = prompt("Eneter a  deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if(isNaN(numberDepositAmount)|| numberDepositAmount<=0){
            console.log("Invalid deposit amount please try again.");
        }else{
            return numberDepositAmount;
        }
    }
}

const getNumberOfLines = ()=>{
    while(true){
        const lines = prompt("Eneter number of lines to bet on : ");
        const numberOfLines = parseFloat(lines);
        if(isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines>3){
            console.log("Invalid number of lines please try again.");
        }else{
            return numberOfLines;
        }
    }
}

const getBet= (balnce, lines)=>{
    while(true){
        const bet = prompt("Eneter the be per lines: ");
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet)|| numberBet<=0 || numberBet> balnce /lines){
            console.log("Invalid bet please try again.");
        }else{
            return numberBet;
        }
    }
}


let balnce = deposit();
const numberOfLins = getNumberOfLines();
const bet = getBet(balnce, numberOfLins);