const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".gameinfo");
const newgameBtn = document.querySelector(".btn");


let currentplayer= "X";
let gameGrid=["", "", "", "", "", "", "", "", ""];

const winningpositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// function to initialize the game
function initGame() {
     currentplayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // ui pe empty kro
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        // green color remove kro
       box.className =`box box${index + 1}`;

    });
    newgameBtn.classList.remove("active");
    gameinfo.innerText = `current player - ${currentplayer}`;

}
initGame();

function swapTurn() {
    if(currentplayer === "X") {
        currentplayer = "O";
    }
    else{
        currentplayer = "X";
    }
    // ui update
    gameinfo.innerText = `current player - ${currentplayer}`;
}
function checkGameOver() {
    let answer = "";
    winningpositions.forEach((position) => {
        // all 3 boxes should be not empty in value
        if (
            (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="" )
            && (gameGrid[position[0]]=== gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
        
        // check if winner is x
        if(gameGrid[position[0]] === "X")
           answer = "X";
    else  
           answer = "0";

    // disable pointer events
         boxes.forEach((box) => {
            box.style.pointerEvents = "none";
         })

    // now we know x/o is winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        }

    });
// it means we have a winner
    if(answer !== "")
        gameinfo.innerText = `winner player - ${answer}`;
        newgameBtn.classList.add("active");
        return;
    }
    // check for draw
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });
    //board is filled, game is tie
    if(fillCount === 9) {
        gameinfo.innerText = "Game is Tie";
        newgameBtn.classList.add("active");
    }


function handleclick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gameGrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        // swap kero turn kro
        swapTurn();
        // check for win 
        checkGameOver(); 

        
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleclick(index);
    })
});
newgameBtn.addEventListener("click", initGame);