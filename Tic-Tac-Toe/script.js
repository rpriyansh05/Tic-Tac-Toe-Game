let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            showResultScreen(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (isBoardFull()) {
            showResultScreen('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function updateBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = gameBoard[i];
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function showResultScreen(message) {
    const resultScreen = document.getElementById('result-screen');
    const resultText = document.getElementById('result-text');
    resultText.innerText = message;
    resultScreen.style.display = 'flex';
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    updateBoard();
    hideResultScreen();
}

function hideResultScreen() {
    document.getElementById('result-screen').style.display = 'none';
}

// Initial setup
updateBoard();
document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
