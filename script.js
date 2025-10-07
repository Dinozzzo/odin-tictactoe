function tictactoe() {
  const gameboard = (() => {
    // MY ARRAY REPRESENTING THE GAME DISPLAY
    let table = ["", "", "", "", "", "", "", "", ""];

    // PLACE THE SYMBOL IN A SPECIFIC POSITION
    const addSymbol = (pos, symbol) => {
      table[pos] = symbol;
      console.log(table);
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
  } // ADD THIS INSIDE GAMECONTROLLER ??

  const gameController = (() => {
    // CREATING PLAYERS 1 & 2
    let player1 = createPlayer("Dino", "X", 0);
    let player2 = createPlayer("Diah", "O", 0);

    // HOW THE GAME WILL BE PLAYED
    function playGame() {}

    function finishRound() {}

    function endGame() {}
  })();
}
