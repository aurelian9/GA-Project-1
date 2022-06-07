"use strict";
document.addEventListener("DOMContentLoaded", () => {
  //write for loop to make tetris field grid.
  // for loop + create Element, <div> 200x squares, 20 y, 10 x
  // wrap the 200divs in one div tag and give it a class of "grid"
  // <h3></h3> for score, give span id="score"
  // <button id="start-button">start/pause</button>

  //Creating + Simple styling the GRID

  const startGame = document.createElement("button");
  startGame.id = "start-button";
  startGame.innerText = "Start";
  document.body.append(startGame); //addEventListener

  const scoreKeep = document.createElement("h3");
  scoreKeep.innerText = "Score:";
  document.body.append(scoreKeep);

  const scoreVal = document.createElement("span");
  scoreVal.innerHTML = 0; //hardcoded placeholder for now 1000hrs
  scoreVal.id = "score";
  scoreKeep.append(scoreVal);

  const div1 = document.createElement("div");
  document.body.append(div1);
  div1.className = "tet-grid";

  for (let i = 0; i <= 210; i++) {
    const squares = document.createElement("div");
    if (i >= 200) {
      squares.classList.add("stop-here");
    }
    div1.append(squares);
  }

  // for (let i = 0; i < 10; i++) {
  //     const voidSqs = document.createElement("div");
  //     voidSqs.className = "stop-here";
  //     div1.appendChild(voidSqs);
  // };

  //Creating TETROMINOS
  //Starting with block and line tetrinos
  //For each tetrino: 4 for its rotated states
  //

  let sqArr = Array.from(document.querySelectorAll(".tet-grid div"));
  const w = 10; //width of the grid, tetromino matrix is a 4x4 but only clearly reflectd in the I shape.

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

  let currentPos = 4; // Math.floor(Math.random() * w); //position, mid for now, tetromino shape split if random
  let currentRot = Math.floor(Math.random() * 4); //rotation through 4 indices
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

  function moveLeft() {
    if (!touchLeftEnd()) {
      tetroGone();
      currentPos -= 1;
      tetroSpawn();
    }
  }

  function moveRight() {
    if (!touchRightEnd()) {
      tetroGone();
      currentPos += 1;
      tetroSpawn();
    }
  }

  function moveDown() {
    tetroGone();
    currentPos += w;
    tetroSpawn();
  }

  function rotate() {
    tetroGone();
    currentRot++;
    if (currentRot === currentSpawn.length) {
      //if the current rotation gets to 4, bring it back to 0
      currentRot = 0;
    }
    currentSpawn = tetroMinos[randoTetro][currentRot];
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
  });

  function tetOnIce() {
    if (
      currentSpawn.some((index) =>
        sqArr[currentPos + index + w].classList.contains("stop-here")
      )
    ) {
      currentSpawn.forEach((index) =>
        sqArr[currentPos + index].classList.add("stop-here")
      );
    }
  }

  // function touchIce(potentialPosition) {
  //   return currentSpawn.some(index => sqArr[potentialPosition + index].classList.contains("frozen-tet"))
  // }

  function tetroTravel() {
    tetroGone();
    currentPos += w;
    tetroSpawn();
    tetOnIce();
  }

  // let timerId = setInterval(tetroTravel, 250);
});
