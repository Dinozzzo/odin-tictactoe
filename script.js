function tictactoe() {
  const gameboard = (() => {
    let table = Array(9).fill(null);
    const addSymbol = (pos, symbol) => {
      table[pos] = symbol;
    };

    return { table, addSymbol };
  })();

  const gameController = (() => {
    const body = document.querySelector("body");
    const playerOneSection = document.querySelector(".player1-section");
    const playerTwoSection = document.querySelector(".player2-section");
    const items = document.querySelectorAll(".item");

    function createPlayer(name, symbol, score) {
      return { name, symbol, score };
    }

    let player1 = createPlayer(null, "X", 0);
    let player2 = createPlayer(null, "O", 0);
    let PlayersValidated = false;

    const validButton = document.querySelector("button");

    validButton.addEventListener("click", () => {
      PlayersValidated = true;
      const playerOneInput = document.querySelector("#player1");
      const playerTwoInput = document.querySelector("#player2");
      player1.name = playerOneInput.value;
      player2.name = playerTwoInput.value;
      playerOneSection.innerHTML = `<p>${player1.name} : ${player1.score}</p>`;
      playerTwoSection.innerHTML = `<p>${player2.name} : ${player2.score}</p>`;
      [playerOneSection, playerTwoSection].forEach((section) => {
        section.style.cssText = "color: rgb(211, 219, 212); font-size: 24px;";
      });
      validButton.style.display = "none";
    });

    // PLAY GAME
    const playGame = () => {
      const winningCombinations = [
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
      let isPlayerOneTurn = true;

      // Add listeners ONCE
      items.forEach((item, index) => {
        item.addEventListener("click", () => {
          if (!PlayersValidated || isGameOver || item.textContent !== "")
            return;

          const itemClicked = index;

          // PLAYER 1 TURN
          if (isPlayerOneTurn) {
            item.textContent = "X";
            gameboard.addSymbol(itemClicked, "X");
          } else {
            item.textContent = "O";
            gameboard.addSymbol(itemClicked, "O");
          }

          // CHECK WINNER
          let currentSymbol = isPlayerOneTurn ? "X" : "O";
          for (let combo of winningCombinations) {
            if (
              gameboard.table[combo[0]] === currentSymbol &&
              gameboard.table[combo[1]] === currentSymbol &&
              gameboard.table[combo[2]] === currentSymbol
            ) {
              if (currentSymbol === "X") player1.score++;
              else player2.score++;

              isGameOver = true;
              showResult(
                currentSymbol === "X"
                  ? `${player1.name} won this round!`
                  : `${player2.name} won this round!`
              );
              updateScore();
              return;
            }
          }

          // CHECK DRAW
          if (!gameboard.table.includes(null)) {
            isGameOver = true;
            showResult("This round is a draw!");
            return;
          }

          // SWAP TURN
          isPlayerOneTurn = !isPlayerOneTurn;
        });
      });

      // UPDATE SCORE DISPLAY
      const updateScore = () => {
        playerOneSection.innerHTML = `<p>${player1.name} : ${player1.score}</p>`;
        playerTwoSection.innerHTML = `<p>${player2.name} : ${player2.score}</p>`;
      };

      // SHOW RESULT OVERLAY
      const showResult = (message) => {
        items.forEach((item) => (item.style.pointerEvents = "none"));

        const resultDisplay = document.createElement("div");
        resultDisplay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: rgb(27, 63, 72);
          font-size: 48px;
          font-weight: bold;
          z-index: 999;
          gap: 50px;`;
        body.appendChild(resultDisplay);

        const resultMessage = document.createElement("p");
        resultMessage.textContent = message;
        resultDisplay.appendChild(resultMessage);

        const reloadButton = document.createElement("button");
        reloadButton.textContent = "Start new round";
        reloadButton.style.cssText = `
          width: 300px;
          height: 75px;
          background-color: rgb(211, 219, 212);
          color: rgb(27, 63, 72);
          border: solid 3px rgb(27, 63, 72);
          font-size: 24px;
          border-radius: 35px;`;
        resultDisplay.appendChild(reloadButton);

        reloadButton.addEventListener("click", () => {
          gameboard.table.fill(null);
          items.forEach((item) => {
            item.textContent = "";
            item.style.pointerEvents = "auto";
          });
          isGameOver = false;
          isPlayerOneTurn = true;
          body.removeChild(resultDisplay);
        });
      };
    };

    return { playGame };
  })();

  gameController.playGame();
}

tictactoe();
