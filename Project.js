// 1. Deposit some money 
// 2. determent number of lines to bet on 
// 3. Colllect a bet amount 
// 4. spin the slot meaching
// 5. check if user own
// 6. give the user ther wining 
// 7. play again 

const prompt = require("prompt-sync")();

const ROWS = 3, COLS =3;

const SYMBOLS_COUNT= {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
}

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
        const lines = prompt("Eneter number of lines to bet on (1-3): ");
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

const spin= ()=> {
    const symbols =[];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i =0; i <count; i++){
            symbols.push(symbol);
        }
    }
     const reels = [];
     for(let i =0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const slectedSymbol=  reelSymbols[randomIndex];
            reels[i].push(slectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
  return reels;
}

const transpose=(reels) =>{
    const rows =[];
    for(let i =0; i< ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRow=(rows)=>{
    for(const row of rows){
        let rowString="";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString+=" | ";
            }
        }
        console.log(rowString);
    }
}

const getWinning = (rows,bet,lines)=>{
    let winning=0;
    for(let row =0; row < lines; row++){
        const symbols = rows[row];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol!= symbols[0] ){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winning +=bet *SYMBOLS_VALUES[symbols[0]];
        }

    }
    return winning;
}

const game=()=>{
    let balnce = deposit();

    while(true){
        console.log("You have a blance of $"+ balnce);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balnce, numberOfLines);
        balnce -= bet*numberOfLines;
        const reels =spin();
        const rows = transpose(reels);
        printRow(rows);
        const winning =getWinning(rows,bet,numberOfLines)
        balnce += winning;
        console.log("You won, $"+ winning.toString());
        if(balnce <=0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain= prompt("Do you want to play again (y/n)");
        if(playAgain != "y" ){
            break;
        }
    }
}

game();
