function tictactoe() {
  const gameboard = (() => {
    // ARRAY REPRESENTING THE GAME DISPLAY
    let table = ["", "", "", "", "", "", "", "", ""];

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
      const playerOneChoice = prompt(
        "Player 1 : Choose a position between 0 and 8"
      );
      const playerTwoChoice = prompt(
        "Player 2 : Choose a position between 0 and 8"
      );

      gameboard.addSymbol(playerOneChoice, player1.symbol);
      gameboard.addSymbol(playerTwoChoice, player2.symbol);
    };

    function finishRound() {}

    function endGame() {}

    return {
      playGame,
    };
  })();

  gameController.playGame();
}

tictactoe();
