// // Gameboard object for my tic tac toe game
// const gameBoard = {
//   board: [
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""],
//   ],

//   markSpot(index, player) {
//     const boardRow = Math.floor(index / 3);
//     const boardCol = index % 3;

//     if (this.board[boardRow][boardCol] === "") {
//       this.board[boardRow][boardCol] = player;
//       console.log("success!");
//     } else {
//       return console.log("Spot is already taken! pick another spot");
//     }
//   },

//   resetBoard() {
//     this.board = [
//       ["", "", ""],
//       ["", "", ""],
//       ["", "", ""],
//     ];
//     console.log("Board has been reset!");
//   },

//   checkWinner() {
//     const flatBoard = this.board.flat();

//     const winningCombo = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (const [a, b, c] of winningCombo) {
//       if (
//         flatBoard[a] !== "" &&
//         flatBoard[a] === flatBoard[b] &&
//         flatBoard[a] === flatBoard[c]
//       ) {
//         console.log(`winner is ${flatBoard[a]}`);
//         return flatBoard[a];
//       }
//     }

//     if (flatBoard.every((cell) => cell !== "")) {
//       console.log("It's a TIE!");
//       return "Tie";
//     }
//     console.log("No winner yet!");
//     return null;
//   },
// };
