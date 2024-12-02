// Player Factory
const Player = (name, symbol) => {
  return { name, symbol };
};

// Game Board Factory
const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const markSpot = (index, player) => {
    let boardRow = Math.floor(index / 3);
    let boardCol = index % 3;
    if (board[boardRow][boardCol] === "") {
      board[boardRow][boardCol] = player;
      console.log("success!");
    } else {
      console.log("Spot is already taken! Pick another spot.");
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
    console.log("Board has been reset:", board);
  };

  const checkWinner = () => {
    const flatBoard = board.flat();

    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombo) {
      if (
        flatBoard[a] !== "" &&
        flatBoard[a] === flatBoard[b] &&
        flatBoard[a] === flatBoard[c]
      ) {
        console.log(`winner is ${flatBoard[a]}`);
        return flatBoard[a];
      }
    }

    if (flatBoard.every((cell) => cell !== "")) {
      console.log("It's a TIE!");
      return "Tie";
    }
    console.log("No winner yet!");
    return null;
  };

  return { board, markSpot, resetBoard, checkWinner };
})();

// Game Controller Factor
const gameController = (() => {
  let currentPlayer;
  let players;
  let gameOver = false;

  const startGame = (player1, player2) => {
    players = [player1, player2];
    currentPlayer = players[0];
    gameOver = false;
    console.log(`${currentPlayer.name}'s turn`);
  };

  const switchPlayer = () => {
    if (gameOver) return;
    currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    console.log(`${currentPlayer.name}'s turn`);
  };

  const makeMove = (index) => {
    if (gameOver) return;
    gameBoard.markSpot(index, currentPlayer.symbol);
    const winner = gameBoard.checkWinner();

    if (winner) {
      gameOver = true;
      console.log(`${winner} wins!`);
    } else if (winner == "Tie") {
      gameOver = true;
      console.log("It's a tie!");
    } else {
      switchPlayer();
    }
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    gameOver = false;
    console.log("Game has been reset!");
  };

  return { startGame, makeMove, resetGame };
})();

// Create players
const player1 = Player("Alice", "X");
const player2 = Player("Bob", "O");

// Start a new game
gameController.startGame(player1, player2);

// Print the board after starting the game
console.log("Game started:");
console.log(gameBoard.board); // Logs the board array

// Players take turns
gameController.makeMove(0); // Player 1 (X) moves at index 0
console.log("After Player 1's move:");
console.log(gameBoard.board.map((row) => [...row])); // Logs the board snapshot

gameController.makeMove(1); // Player 2 (O) moves at index 1
console.log("After Player 2's move:");
console.log(gameBoard.board.map((row) => [...row])); // Logs the board snapshot

// Reset the game
gameController.resetGame();
console.log("Game has been reset:");
console.log(gameBoard.board.map((row) => [...row])); // Logs the reset board
