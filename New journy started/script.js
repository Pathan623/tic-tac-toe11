// script.js
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let isGameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3 , 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();

    if (player1Name === '' || player2Name === '') {
        alert("Please enter names for both players.");
        return;
    }

    currentPlayer = player1Name;
    isGameActive = true;
    statusDisplay.innerHTML = `${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `<span class="winner-text" style="font-weight: bold;">${currentPlayer}</span> has won!`; 
        triggerConfetti(); 
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerHTML = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1Input.value.trim() ? player2Input.value.trim() : player1Input.value.trim();
    statusDisplay.innerHTML = `${currentPlayer}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = false;
    currentPlayer = '';
    statusDisplay.innerHTML = '';
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winner'); 
    });
    player1Input.value = '';
    player2Input.value = '';
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            y: 0.6
        }
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', () => {
    resetGame();
    startGame();
});

// Start game on pressing Enter
document.addEventListener('DOMContentLoaded', () => {
    player1Input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            startGame();
        }
    });
    player2Input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            startGame();
        }
    });

    // Clear placeholder on input
    player1Input.addEventListener('input', function() {
        if (this.value) { 
            this.placeholder = ''; 
        }
    });

    player2Input.addEventListener('input', function() {
        if (this.value) { 
            this.placeholder = ''; 
        }
    });
});