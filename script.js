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

  // THIS CREATES A PLAYER IN GENERAL
  function createPlayer(name, symbol, score) {
    return {
      name: name,
      symbol: symbol,
      score: score,
    };
  }

  const gameController = (() => {
    // CREATING PLAYERS 1 & 2
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

      while (isGameOver === false) {
        // PLAYER 1 ROUND
        const playerOneChoice = prompt(
          "Player 1 : Choose a position between 0 and 8"
        );
        gameboard.addSymbol(playerOneChoice, player1.symbol);

        // CHECKS IF PLAYER 1 WON
        for (let value of winningCombinations) {
          if (
            gameboard.table[value[0]] === "X" &&
            gameboard.table[value[1]] === "X" &&
            gameboard.table[value[2]] === "X"
          ) {
            isGameOver = true;
            console.log("PLAYER 1 WIN");
            break;
          }
        }

        if (isGameOver === true) {
          break;
        }
        // PLAYER 2 ROUND
        const playerTwoChoice = prompt(
          "Player 2 : Choose a position between 0 and 8"
        );
        gameboard.addSymbol(playerTwoChoice, player2.symbol);

        // CHECKS IF PLAYER 2 WON
        for (let value of winningCombinations) {
          if (
            gameboard.table[value[0]] === "O" &&
            gameboard.table[value[1]] === "O" &&
            gameboard.table[value[2]] === "O"
          ) {
            console.log("PLAYER 2 WIN");
            isGameOver = true;
            break;
          }
        }
      }
    };

    return {
      playGame,
    };
  })();

  gameController.playGame();
}

tictactoe();
