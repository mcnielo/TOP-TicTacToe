const gameStatus = document.getElementById("gameInfo");
const cells = document.querySelectorAll(".cell");
const xButton = document.getElementById("player1");
const oButton = document.getElementById("player2");
const boardGlow = document.querySelector(".board");

const symbolImages = {
  X: "assets/pixelart-x.png", // Replace with the actual path to your "X" image
  O: "assets/pixilart-0.png", // Replace with the actual path to your "O" image
};

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
    } else {
      gameStatus.textContent = "Spot is already taken! Pick another spot.";
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

  const checkWinner = (players) => {
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
        const winner = players.find((player) => player.symbol === flatBoard[a]);
        return winner.symbol;
      }
    }

    if (flatBoard.every((cell) => cell !== "")) {
      return "Tie";
    }
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
    gameStatus.textContent = `${currentPlayer.name}'s turn`;
  };

  const switchPlayer = () => {
    if (gameOver) return;
    currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    if (currentPlayer.symbol == "X") {
      boardGlow.style.boxShadow = "10px 10px 100px #74C19B";
    } else {
      boardGlow.style.boxShadow = "10px 10px 100px #F65403";
    }
    gameStatus.textContent = `${currentPlayer.symbol}'s turn`;
  };

  const makeMove = (index) => {
    if (gameOver) return;
    gameBoard.markSpot(index, currentPlayer.symbol);
    const winner = gameBoard.checkWinner(players);

    if (winner && winner !== "Tie") {
      gameOver = true;
      gameStatus.textContent = `${winner} wins!`;
    } else {
      switchPlayer();
    }
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    gameOver = false;
    boardGlow.style.boxShadow = "10px 10px 1000px #949627";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("taken");
    });
    gameStatus.textContent = "Choose your symbol";
  };

  return { startGame, makeMove, resetGame };
})();

// Create players
xButton.addEventListener("click", () => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  gameController.resetGame();
  boardGlow.style.boxShadow = "10px 10px 100px #74C19B";
  gameController.startGame(player1, player2);
});
oButton.addEventListener("click", () => {
  const player1 = Player("Player 1", "O");
  const player2 = Player("Player 2", "X");
  gameController.resetGame();
  boardGlow.style.boxShadow = "10px 10px 100px #F65403";
  gameController.startGame(player1, player2);
});

// // Start a new game
// const startButton = document.getElementById("start");
// startButton.addEventListener("click", () => {});

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const cellIndex = e.target.dataset.index;

    // Prevent duplicate moves in a cell
    if (!e.target.querySelector("img") && !gameController.gameOver) {
      // Make the move
      gameController.makeMove(cellIndex);

      // Get the current symbol for the player
      const currentSymbol =
        gameBoard.board[Math.floor(cellIndex / 3)][cellIndex % 3];

      // Create and add the image to the cell
      const img = document.createElement("img");
      img.src = symbolImages[currentSymbol];
      img.alt = currentSymbol;
      img.classList.add("player-symbol"); // Add a class for styling if needed
      e.target.appendChild(img);

      // Add a "taken" class to visually disable the cell
      e.target.classList.add("taken");
    }
  });
});

const restartButton = document.getElementById("reset");
restartButton.addEventListener("click", () => {
  gameController.resetGame();
});
