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
    const playerOneSection = document.querySelector(".player1-section");
    const playerTwoSection = document.querySelector(".player2-section");

    // CREATING PLAYERS 1 & 2
    function createPlayer(name, symbol, score) {
      return {
        name: name,
        symbol: symbol,
        score: score,
      };
    }

    let player1 = createPlayer(null, "X", 0);
    let player2 = createPlayer(null, "O", 0);

    const playerDisplay = (() => {
      const validButton = document.querySelector("button");

      validButton.addEventListener("click", () => {
        const playerOneInput = document.querySelector("#player1");
        const playerTwoInput = document.querySelector("#player2");
        player1.name = playerOneInput.value;
        player2.name = playerTwoInput.value;
        playerOneSection.innerHTML = `<p>${player1.name} : ${player1.score}</p>`;
        playerTwoSection.innerHTML = `<p>${player2.name} : ${player2.score}</p>`;
        [playerOneSection, playerTwoSection].forEach((section) => {
          section.style.cssText = "color: rgb(211, 219, 212); font-size: 24px;";
        });
      });
    })();

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
        items.forEach((item, index) => {
          item.addEventListener("click", () => {
            if (item.textContent !== "") return;
            let itemClicked = index;
            if (isPlayerOneTurn) {
              // ADD "X" ON THE DISPLAY
              item.textContent = "X";

              // SEND X TO THE ARRAY TABLE
              gameboard.addSymbol(itemClicked, "X");
              console.table(gameboard.table);
              // SWAP THE PLAYER 2
              isPlayerOneTurn = !isPlayerOneTurn;

              // CHECK IF THERE IS A WINNING COMBINATION FOR P1
              for (let value of winningCombinations) {
                if (
                  gameboard.table[value[0]] === "X" &&
                  gameboard.table[value[1]] === "X" &&
                  gameboard.table[value[2]] === "X"
                ) {
                  player1.score++;
                  console.log("PLAYER 1 WIN");
                  isGameOver = true;
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
                  player2.score++;
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
            if (isGameOver === true) {
              playerOneSection.innerHTML = `<p>${player1.name} : ${player1.score}</p>`;
              playerTwoSection.innerHTML = `<p>${player2.name} : ${player2.score}</p>`;
            }
          });
        });
      })();
    };

    return {
      playerDisplay,
      playGame,
    };
  })();

  gameController.playGame();
}

tictactoe();
