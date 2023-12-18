const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS=3;

const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8,
}

const SYMBOLS_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2,

}


// 1. Deposit some money


const deposit = ()=>{

    while(true) {

        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount); // converting the string to float value
    
        if(isNaN(numberDepositAmount)|| numberDepositAmount <= 0){
            console.log("Please enter a valid amount");
        
        }else{
            return numberDepositAmount; // breaks the loop and returns the number
        }
    }
   

}



// 2. Determine number of lines to bet on

const getNumberOfLines=()=>{

    while(true) {

        const numberOfLines = prompt("Enter a number of lines to bet on (1-3): ");
        const numberNumberOfLines = parseFloat(numberOfLines); // converting the string to float value
    
        if(isNaN(numberNumberOfLines)|| numberNumberOfLines <= 0 || numberNumberOfLines>=3){
            console.log("Please enter a valid amount");
        
        }else{
            return numberNumberOfLines; // breaks the loop and returns the number
        }
    }

}

// 3. Collect a bet amount

const getBet =(balance,lines)=>{
    while(true) {

        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet); // converting the string to float value
    
        if(isNaN(numberBet)|| numberBet <= 0 || numberBet> balance*lines){
            console.log("Invalid bet amount try again");
        
        }else{
            return numberBet; // breaks the loop and returns the number
        }
    }
}

// 4. Spin the slot machine
const spin=()=>{

    const symbols=[];

    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];

    for(let i=0; i<COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;

}


// 5. check if the user won
const transpos=(reels)=>{
    const rows=[];

    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows=(rows)=>{
    for(const row of rows){
        let rowString =   "A|B|C|";
        for(const [i,symbol] of rows.entries()){
            rowString += symbol;
            if(i!= row.length-1){
                rowString += " | ";
            }
        }

        console.log(rowString);
    }

}


// 6. Give the user their winnings
const getWinnings=(rows,bet,lines)=>{
    let winnings=0;
    for( let row=0;row<lines;row++){
        const symbols = rows[row].split(",");
        let allSame = true;


        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            
            }
        }

        if(allSame){
            winnings += bet*SYMBOLS_VALUES[symbols[0]];
        
        }
    }

    return winnings;
}

// 7. play again
const game = ()=>{
    let balance = deposit();

    while(true){
        console.log("You have a Balance of: $ "+balance.toString());
        const numberOfLines= getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance-=bet*numberOfLines;
        const reels=spin();
        const rows = transpos(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        balance+=winnings;
        console.log("You won, $"+winnings.toString());

        if(balance<=0){
            console.log("You are out of money");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n)");

        if(playAgain!="y")break;
    }

  
}

game();


