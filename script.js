// const board = document.getElementById("board");
// const statusText = document.getElementById("status");
// const resetBtn = document.getElementById("reset");

// let currentPlayer = "X";
// let gameBoard = ["", "", "", "", "", "", "", "", ""];
// let isGameActive = true;
// const vsComputer = true;

// const winConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];

// function createBoard() {
//     board.innerHTML = "";
//     gameBoard.forEach((cell, index) => {
//         const cellDiv = document.createElement("div");
//         cellDiv.classList.add("cell");
//         cellDiv.dataset.index = index;
//         cellDiv.textContent = cell;
//         cellDiv.addEventListener("click", handleCellClick);
//         board.appendChild(cellDiv);
//     });
// }

// function handleCellClick(e) {
//     const index = e.target.dataset.index;
//     if (gameBoard[index] !== "" || !isGameActive) return;

//     gameBoard[index] = currentPlayer;
//     e.target.textContent = currentPlayer;

//     if (checkWinner()) {
//         statusText.textContent = `Player ${currentPlayer} wins!`;
//         isGameActive = false;
//         return;
//     }

//     if (gameBoard.every(cell => cell !== "")) {
//         statusText.textContent = "It's a draw!";
//         isGameActive = false;
//         return;
//     }

//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//     statusText.textContent = `Current Player: ${currentPlayer}`;

//     if (vsComputer && currentPlayer === "O") {
//         setTimeout(computerMove, 500);
//     }
// }

// function computerMove() {
//     if (!isGameActive) return;

//     let emptyIndices = gameBoard
//         .map((val, i) => val === "" ? i : null)
//         .filter(val => val !== null);

//     const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

//     gameBoard[randomIndex] = "O";
//     const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
//     cell.textContent = "O";

//     if (checkWinner()) {
//         statusText.textContent = 'computer wins';
//         isGameActive = false;
//         return;
//     }

//     if (gameBoard.every(cell => cell !== "")) {
//         statusText.textContent = "It's a draw";
//         isGameActive = false;
//         return;
//     }

//     currentPlayer = "X";
//     statusText.textContent = `current Player: ${currentPlayer}`;
// }

// function checkWinner() {
//     return winConditions.some(condition => {
//         const [a, b, c] = condition;
//         return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
//     });
// }

// resetBtn.addEventListener("click", () => {
//     gameBoard = ["", "", "", "", "", "", "", "", ""];
//     currentPlayer = "X";
//     isGameActive = true;
//     statusText.textContent = `Current Player: ${currentPlayer}`;
//     createBoard();
// });

// createBoard();

// Computer Hard Moves

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const statusText = document.querySelector("#status");
const cells = document.querySelectorAll(".cell");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick() {
    const index = this.getAttribute("data-index");
    if (gameBoard[index] !== "" || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    this.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins`;
        isGameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = "O";
    statusText.textContent = `Current Player: ${currentPlayer}`;
    setTimeout(computerMove, 500);
}

function computerMove() {
    if (!isGameActive) return;

    // Try to win
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") {
            gameBoard[i] = "O";
            if (checkWinner()) {
                document.querySelector(`.cell[data-index='${i}']`).textContent = "O";
                statusText.textContent = "Computer wins!";
                isGameActive = false;
                return;
            }
            gameBoard[i] = "";
        }
    }

    // Block player win
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") {
            gameBoard[i] = "X";
            if (checkWinner()) {
                gameBoard[i] = "O";
                document.querySelector(`.cell[data-index='${i}']`).textContent = "O";
                if (checkWinner()) {
                    statusText.textContent = "Computer wins!";
                    isGameActive = false;
                } else {
                    currentPlayer = "X";
                    statusText.textContent = `Current Player: ${currentPlayer}`;
                }
                return;
            }
            gameBoard[i] = "";
        }
    }

    // Random move
    const emptyIndices = gameBoard.map((val, i) => val === "" ? i : null).filter(val => val !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    gameBoard[randomIndex] = "O";
    document.querySelector(`.cell[data-index='${randomIndex}']`).textContent = "O";

    if (checkWinner()) {
        statusText.textContent = "Computer wins!";
        isGameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = "X";
    statusText.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
document.querySelector("#reset").addEventListener("click", resetGame);