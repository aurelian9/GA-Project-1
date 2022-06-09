"use strict";
document.addEventListener("DOMContentLoaded", () => {
  //Creating + Simple styling the GRID

  const startGame = document.createElement("button");
  startGame.id = "start-button";
  startGame.innerText = "Start";
  document.body.append(startGame);

  const scoreKeep = document.createElement("h3");
  scoreKeep.innerText = "Score:";
  document.body.append(scoreKeep);

  const featureContainer = document.createElement("div");
  featureContainer.className = "toy-box";
  document.body.append(featureContainer);
  featureContainer.append(startGame);

  const featCont2 = document.createElement("div");
  featCont2.className = "toy-box-2";
  document.body.append(featCont2);
  featCont2.append(scoreKeep);

  let scoreVal = document.createElement("span");
  scoreVal.innerHTML = 0; //hardcoded placeholder for now 1000hrs 662022
  scoreVal.id = "score";
  scoreKeep.append(scoreVal);

  const divPrime = document.createElement("div");
  divPrime.className = "container";
  document.body.append(divPrime);

  const div1 = document.createElement("div");
  divPrime.append(div1);
  // document.body.append(div1);
  div1.className = "tet-grid";

  for (let i = 0; i < 210; i++) {
    const squares = document.createElement("div");
    if (i >= 200) {
      squares.classList.add("stop-here");
    }
    div1.append(squares);
  }

  //Creating TETROMINOS
  //Starting with block and line tetrinos
  //For each tetrino: 4 for its rotated states

  let sqArr = Array.from(document.querySelectorAll(".tet-grid div"));
  const w = 10; /*width of the grid, tetromino matrix is a 4x4 but only clearly reflectd in the I shape.
                  IMPORTNAT CONSTANT. NEED TO CHANGE THIS IF MAKING GRID BIGGER (proportionate to new width / 10)*/

  const ohTetro = [
    [0, 1, w, w + 1],
    [0, 1, w, w + 1],
    [0, 1, w, w + 1],
    [0, 1, w, w + 1],
  ];

  const eyeTetro = [
    [1, w + 1, w * 2 + 1, w * 3 + 1],
    [w, w + 1, w + 2, w + 3],
    [1, w + 1, w * 2 + 1, w * 3 + 1],
    [w, w + 1, w + 2, w + 3],
  ];

  const zeeTetro = [
    [w, w + 1, w * 2 + 1, w * 2 + 2],
    [2, w + 1, w + 2, w * 2 + 1],
    [w, w + 1, w * 2 + 1, w * 2 + 2],
    [2, w + 1, w + 2, w * 2 + 1],
  ];

  const esTetro = [
    [w + 1, w + 2, w * 2, w * 2 + 1],
    [0, w, w + 1, w * 2 + 1],
    [w + 1, w + 2, w * 2, w * 2 + 1],
    [0, w, w + 1, w * 2 + 1],
  ];

  const jayTetro = [
    [1, w + 1, w * 2 + 1, w * 2],
    [w, w * 2, w * 2 + 1, w * 2 + 2],
    [1, w + 1, w * 2 + 1, 2],
    [w, w + 1, w + 2, w * 2 + 2],
  ];

  const elTetro = [
    [1, w + 1, w * 2 + 1, w * 2 + 2],
    [w + 2, w * 2, w * 2 + 1, w * 2 + 2],
    [1, 2, w + 2, w * 2 + 2],
    [0, 1, 2, w],
  ];

  const teeTetro = [
    [1, w, w + 1, w + 2],
    [1, w + 1, w + 2, w * 2 + 1],
    [w, w + 1, w + 2, w * 2 + 1],
    [1, w, w + 1, w * 2 + 1],
  ];

  const tetroMinos = [
    ohTetro,
    eyeTetro,
    zeeTetro,
    esTetro,
    jayTetro,
    elTetro,
    teeTetro,
  ];

  //Tetromino spawn

  let currentPos = 4; //Math.floor(Math.random() * w); //position, mid for now, tetromino shape split if random
  let currentRot = Math.floor(Math.random() * 4); //rotation through 4 indices, currently hardcoded
  let randoTetro = Math.floor(Math.random() * tetroMinos.length);
  let currentSpawn = tetroMinos[randoTetro][currentRot];

  function tetroSpawn() {
    currentSpawn.forEach((index) => {
      sqArr[currentPos + index].classList.add("tet-actual");
    });
  }

  function tetroGone() {
    currentSpawn.forEach((index) => {
      sqArr[currentPos + index].classList.remove("tet-actual");
    });
  }

  function touchRightEnd() {
    return currentSpawn.some((index) => (currentPos + index) % w === w - 1); //right hand side are all odd numbers or at least width - 1, (starting from 9)
  }

  function touchLeftEnd() {
    return currentSpawn.some((index) => (currentPos + index) % w === 0); //left hand side are all even numbers
  }

  function stayAway(potentialPos) {
    return currentSpawn.some((index) =>
      sqArr[potentialPos + index].classList.contains("stop-here")
    ); //tetromino collider detector
  }

  function moveLeft() {
    if (!touchLeftEnd() && !stayAway(currentPos - 1)) {
      tetroGone();
      currentPos -= 1;
      tetroSpawn();
    }
  }

  function moveRight() {
    if (!touchRightEnd() && !stayAway(currentPos + 1)) {
      tetroGone();
      currentPos += 1;
      tetroSpawn();
    }
  }

  function moveDown() {
    if (!stayAway(currentPos + w)) {
      tetroGone();
      currentPos += w;
      tetroSpawn();
    }
  }

  // function slamDown() {
  //   if (!stayAway(currentPos + (w * 18)))
  //   tetroGone();
  //   currentPos += (w * 18)
  //   tetroSpawn();
  // } //malfunctioning code, add as last stretch goal

  function moveUp() {
    if (!stayAway(currentPos - w)) {
      tetroGone();
      currentPos -= w;
      tetroSpawn();
    }
  }

  function rotate() {
    const touchLeft = currentSpawn.some(
      (index) => (currentPos + index) % w === 0
    );
    const touchRight = currentSpawn.some(
      (index) => (currentPos + index) % w === w - 1
    );
    if (!(touchLeft | touchRight)) {
      tetroGone();
      currentRot++;
      if (currentRot === currentSpawn.length) {
        //if the current rotation gets to 4, bring it back to 0
        currentRot = 0;
      }
      currentSpawn = tetroMinos[randoTetro][currentRot];
    }
    tetroSpawn();
  }

  document.addEventListener("keydown", function keyDownListener(e) {
    if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowLeft") {
      moveLeft();
    }
    if (e.key === "ArrowUp") {
      rotate();
    } else if (e.key === "ArrowDown") {
      moveDown();
    }
    if (e.key === "w") {
      moveUp();
    } //else if (e.key === "s") {
    // slamDown();
    // }
  });

  let nextRandom = 0;

  function tetOnIce() {
    if (
      currentSpawn.some(
        (index) =>
          sqArr[currentPos + index + w].classList.contains("stop-here") ||
          stayAway(currentPos + w)
      )
    ) {
      currentSpawn.forEach((index) =>
        sqArr[currentPos + index].classList.add("stop-here")
      );

      // create new tetromino and stop the above
      randoTetro = nextRandom;
      nextRandom = Math.floor(Math.random() * tetroMinos.length);
      currentSpawn = tetroMinos[randoTetro][currentRot];
      currentPos = 4;
      tetroSpawn();
      addScore();
      gameOver();
    }
  }

  function tetroTravel() {
    moveDown();
    tetOnIce();
  }

  //Timer, Scoring, Clear Field + Game-Over

  let timerId = null;

  startGame.addEventListener("click", () => {
    tetroSpawn();
    timerId = setInterval(tetroTravel, 700);
  });

  let scoreDisplay = document.querySelector("#score");
  let score = 0;

  function addScore() {
    for (let i = 0; i < 199; i += w) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => sqArr[index].classList.contains("stop-here"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          sqArr[index].classList.remove("stop-here");
          sqArr[index].classList.remove("tet-actual");
          // sqArr[index].style.backgroundColor = ""
        });
        const sqRemoved = sqArr.splice(i, w);
        sqArr = sqRemoved.concat(sqArr);
        sqArr.forEach((cell) => div1.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if(currentSpawn.some(index => sqArr[currentPos + index].classList.contains("stop-here"))) {
      scoreDisplay.innerHTML = 'END'
      alert("GAME-OVER PRESS F5 TO START-OVER") //lazy coding lmao
      clearInterval(timerId)
    } 
  };

//Additional Styling

// const img = document.createElement("img");
// img.src = "GBHF.gif";
// const src = document.getElementById("header");
// src.appendChild(img);
// div1.append(src);





});