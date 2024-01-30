let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'))

const O = "O";
const X = "X";
let currentPlayer = X;
let spaces = Array(9).fill(null);
let turns = 0; 


const gameStart = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e){
    const id = e.target.id;
    if(!spaces[id] && turns < 9){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !== false){
            playerText.innerText = `${currentPlayer} has won!`
            let winning_boxes = playerHasWon();
            winning_boxes.map(box => boxes[box].style.backgroundColor='white');
            return;
        }
        turns++;
        currentPlayer = currentPlayer == X ? O : X;
    }
    if(turns === 9){
        playerText.innerText= `Draw!`
    }
    
}

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningConditions){
        let [a,b,c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart(){
    spaces.fill(null);
    playerText.innerText = 'Tic Tac Toe'
    boxes.forEach(box => {
        box.innerText ='';
        box.style.backgroundColor = ''
    });
    turns=0;
    currentPlayer = X;

}


gameStart();
