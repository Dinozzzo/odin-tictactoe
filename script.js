function tictactoe() {
  const gameboard = (() => {
    // ARRAY REPRESENTING THE GAME DISPLAY
    let table = [null, null, null, null, null, null, null, null, null];

    // PLACE THE SYMBOL IN A SPECIFIC POSITION
    const addSymbol = (pos, symbol) => {
      table[pos] = symbol;
      console.table(table);
    };
    return { table, addSymbol };
  })();

  const gameController = (() => {
    // CREATING PLAYERS 1 & 2
    function createPlayer(name, symbol, score) {
      return {
        name: name,
        symbol: symbol,
        score: score,
      };
    }
    let player1 = createPlayer("Player 1", "X", 0);
    let player2 = createPlayer("Player 2", "O", 0);

    // HOW THE GAME WILL BE PLAYED
    const playGame = () => {
      // DIFFERENT WINNING COMBINATIONS
      let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      let isGameOver = false;

      const dom = (() => {
        let isPlayerOneTurn = true;
        const items = document.querySelectorAll(".item");
        items.forEach((item) => {
          item.addEventListener("click", () => {
            let itemClicked = item;
            if (isPlayerOneTurn) {
              // ADD "X" ON THE DISPLAY
              item.textContent = "X";

              // SEND X TO THE ARRAY TABLE
              gameboard.addSymbol(itemClicked, "X");

              // SWAP THE PLAYER 2
              isPlayerOneTurn = !isPlayerOneTurn;

              // CHECK IF THERE IS A WINNING COMBINATION FOR P1
              for (let value of winningCombinations) {
                if (
                  gameboard.table[value[0]] === "X" &&
                  gameboard.table[value[1]] === "X" &&
                  gameboard.table[value[2]] === "X"
                ) {
                  isGameOver = true;
                  console.log("PLAYER 1 WIN");
                }
              }

              // STOP THE GAME IF TIE
              if (isGameOver === false && !gameboard.table.includes(null)) {
                isGameOver = true;
                console.log("THE GAME IS A TIE");
              }
            } else {
              // ADD "O" ON THE DISPLAY
              item.textContent = "O";

              // SEND O TO THE ARRAY TABLE
              gameboard.addSymbol(itemClicked, "O");

              // SWAP TO PLAYER 1
              isPlayerOneTurn = !isPlayerOneTurn;

              // CHECK IF THERE IS A WINNING COMBINATION FOR P2
              for (let value of winningCombinations) {
                if (
                  gameboard.table[value[0]] === "O" &&
                  gameboard.table[value[1]] === "O" &&
                  gameboard.table[value[2]] === "O"
                ) {
                  console.log("PLAYER 2 WIN");
                  isGameOver = true;
                }
              }

              // STOP THE GAME IF TIE
              if (isGameOver === false && !gameboard.table.includes(null)) {
                isGameOver = true;
                console.log("THE GAME IS A TIE");
              }
            }
          });
        });
      })();
    };

    return {
      playGame,
    };
  })();

  gameController.playGame();
}

tictactoe();
