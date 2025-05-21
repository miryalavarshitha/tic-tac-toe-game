const board = document.getElementById('board');
    const gameStatus = document.getElementById('gameStatus');
    let currentPlayer = 'X';
    let cells = [];
    let gameActive = true;

    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function createBoard() {
      board.innerHTML = '';
      cells = [];
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
      }
    }

    function handleCellClick(index) {
      if (!gameActive || cells[index].textContent !== '') return;

      cells[index].textContent = currentPlayer;
      if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        a();
        endGame();
        return;
      }

      if (cells.every(cell => cell.textContent !== '')) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
        a();
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin() {
      return winningCombos.some(combo => {
        return combo.every(index => cells[index].textContent === currentPlayer);
      });
    }

    function endGame() {
      gameActive = false;
      cells.forEach(cell => cell.classList.add('disabled'));
    }
    function a(){
        alert("Game Over!!");
    }
    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;
      gameStatus.textContent = `Player ${currentPlayer}'s turn`;
      createBoard();
    }

    // Initialize game
    createBoard();