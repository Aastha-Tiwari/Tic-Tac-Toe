// Accessing all html elements
const game = document.querySelector(".game");
const boxes = document.querySelectorAll(".box");
const turnText = document.querySelector(".turn");
const reset = document.querySelector(".reset");
const turnContainer = document.querySelector(".turn-container");
const result = document.querySelector(".result-container");

// initializing all the variables
let turn = "O";       //To track that initially the Player O starts the game
let filledBoxes = 0;  //To track how many boxes are filled  (helpful for showing the result in case of draw)
let win = false;      //To track whether someone win or not (helpful for showing the result in case of draw)

// Storing winning Patterns in a 2D Array
const winPatterns = [[0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [0,4,8] , [2,4,6]];

//Applying event listener for all the boxes
game.addEventListener("click",(e)=>{
    if(e.target != game){
        if(turn == "O"){
            e.target.innerText = "O";
            turn = "X";
        }
        else if(turn == "X"){
            e.target.innerText = "X";
            turn = "O";
        }
        e.target.disabled = true;
        filledBoxes++;
        turnText.innerText = turn;
        checkWinning();
    }
});

//Function which will be called each time when some box will be clicked to check whether someone win or not
function checkWinning(){
    for(let winPattern of winPatterns){
        if((boxes[winPattern[0]].innerText == "O" && boxes[winPattern[1]].innerText == "O" && boxes[winPattern[2]].innerText == "O") || (boxes[winPattern[0]].innerText == "X" && boxes[winPattern[1]].innerText == "X" && boxes[winPattern[2]].innerText == "X")){
            showWinner(boxes[winPattern[0]].innerText);
            win = true;
        }
    }
    if(filledBoxes == 9 && win == false){
        showDrawResult();
    }
}


function showDrawResult(){
    result.innerText = `Match Draw`;
    disabledBoxes();
}

function showWinner(winnerPlayer){
    result.innerText = `Winner is Player ${winnerPlayer}`;
    disabledBoxes();
}

function disabledBoxes(){
    for(let box of boxes){
        box.disabled = true;
    }
    turnContainer.classList.add("hide");
}

function enableBoxes(){
    for(let box of boxes){
        box.innerText = ""; 
        box.disabled = false;
    }
    result.innerText = "";
}

reset.addEventListener("click",()=>{
    turn = "O";
    turnText.innerText = "O";
    turnContainer.classList.remove("hide");
    filledBoxes = 0;
    win =false;
    enableBoxes();
});

