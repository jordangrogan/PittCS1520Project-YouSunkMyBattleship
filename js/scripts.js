/*
    CS1520 - Assignment 1 - You Sunk My Battleship
    Jordan Grogan
    Tuesday/Thursday 6pm
    Recitation Thursday 7:30pm
*/

var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var shipNames = {A:"Aircraft Carrier", B:"Battleship", S:"Submarine"};
var player1_grid = new Object(); // player 1's grid of their ships
var player2_grid = new Object(); // player 2's grid of their ships
var player1_guesses = new Object(); // player 1's guesses of opponent spaces
var player2_guesses = new Object(); /// player 2's guesses of opponent spaces
var player1_ships = new Object(); // player 1's ship's locations
var player2_ships = new Object(); // player 2's ship's locations
var player1, player2 // player 1 & 2 names
var player1_hits = 0; // hits made by player 1 (for scorekeeping)
var player2_hits = 0; // hits made by player 2 (for scorekeeping)
var turn;

window.addEventListener('load', setup, false);

function newTurn() {
  if(turn === 1) {
    alert("Click OK to begin ".concat(player2).concat("'s turn."));
    turn = 2;
    renderGrids();
  } else {
    alert("Click OK to begin ".concat(player1).concat("'s turn."));
    turn = 1;
    renderGrids();
  }
}

function setup() {

  // Regex: https://regex101.com/r/JqgHOZ/2

  player1 = prompt("Hello, player 1. Enter your name.");
  //player1 = "Alice";
  //var player1_shipplacement = "B(B6-E6);S(H3-J3);A(A1-A5)";
  do {
    var player1_shipplacement = prompt("Thanks, ".concat(player1).concat("! Enter your ship placement in one of the following formats:\nA:A1-A5;B:B6-E6; S:H3-J3\nA(A1-A5); B(B6-E6); S(H3-J3);\nB(B6-E6);S(H3-J3);A(A1-A5)"));
  } while(player1_shipplacement.match(/([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?/) === null);
  player2 = prompt("Hello, player 2. Enter your name.");
  //player2 = "Bob";
  //var player2_shipplacement = "B(B6-E6);S(H3-J3);A(A1-A5)";
  do {
    var player2_shipplacement = prompt("Thanks, ".concat(player2).concat("! Enter your ship placement in one of the following formats:\nA:A1-A5;B:B6-E6; S:H3-J3\nA(A1-A5); B(B6-E6); S(H3-J3);\nB(B6-E6);S(H3-J3);A(A1-A5)"));
  } while(player2_shipplacement.match(/([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?/) === null);
  /*
  A:A1-A5;B:B6-E6; S:H3-J3
  A(A1-A5); B(B6-E6); S(H3-J3);
  B(B6-E6);S(H3-J3);A(A1-A5)
  */

  turn = 1;
  player1_shipplacement = player1_shipplacement.split(/([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?/);
  addGamePiece(player1_shipplacement[1], player1_shipplacement[2], player1_shipplacement[3]);
  addGamePiece(player1_shipplacement[5], player1_shipplacement[6], player1_shipplacement[7]);
  addGamePiece(player1_shipplacement[9], player1_shipplacement[10], player1_shipplacement[11]);
  console.log("Player 1 Grid:");
  console.log(player1_grid);
  console.log("Player 1 Ships:");
  console.log(player1_ships);

  turn = 2;
  player2_shipplacement = player2_shipplacement.split(/([ABS]):?\(?([A-J][1-9]0?)-([A-J][1-9]0?)\)?;? ?/);
  addGamePiece(player2_shipplacement[1], player2_shipplacement[2], player2_shipplacement[3]);
  addGamePiece(player2_shipplacement[5], player2_shipplacement[6], player2_shipplacement[7]);
  addGamePiece(player2_shipplacement[9], player2_shipplacement[10], player2_shipplacement[11]);
  console.log("Player 2 Grid:");
  console.log(player2_grid);
  console.log("Player 2 Ships:");
  console.log(player2_ships);

  newTurn();

}

function addGamePiece(piece, firstSpace, lastSpace) {

  firstSpace = firstSpace.toUpperCase();
  lastSpace = lastSpace.toUpperCase();

  var ships, grid;
  if(turn === 1) {
    grid = player1_grid;
    ships = player1_ships;
  } else if(turn === 2) {
    grid = player2_grid;
    ships = player2_ships;
  }

  /*
  an aircraft carrier (5 spaces long)
  a battleship (4 spaces long)
  a submarine (3 spaces long)
  */
  var lengthOfPiece = 0;
  switch(piece) {
    case "A":
      lengthOfPiece = 5;
      break;
    case "B":
      lengthOfPiece = 4;
      break;
    case "S":
      lengthOfPiece = 3;
      break;
  }

  if(firstSpace.charAt(0) === lastSpace.charAt(0)) { // Same column (letter) = VERTICAL PIECE

    var colLetter = firstSpace.charAt(0);
    var i;
    for(i=0; i<lengthOfPiece; i++) {
      var nextNum = parseInt(firstSpace.charAt(1)) + i;
      grid[colLetter.concat(nextNum)] = piece;
      ships["Ship".concat(piece.concat(i))] = colLetter.concat(nextNum);
    }

  } else { // Same row (number) = HORIZONTAL PIECE

    var rowNum = firstSpace.charAt(1);
    if(firstSpace.charAt(2) === '0') rowNum = 10;
    var i;
    for(i=0; i<lengthOfPiece; i++) {
      var nextLet = String.fromCharCode(firstSpace.charAt(0).charCodeAt() + i);
      grid[nextLet.concat(rowNum)] = piece;
      ships["Ship".concat(piece.concat(i))] = nextLet.concat(rowNum);
    }

  }

}

function renderGrids() {

  var grid, guesses, i, j, table, row, cell;

  if(turn === 1) {
    grid = player1_grid;
    guesses = player1_guesses;
    opponentGuesses = player2_guesses;
  } else if(turn === 2) {
    grid = player2_grid;
    guesses = player2_guesses;
    opponentGuesses = player1_guesses;
  }

  // Create Enemy Ships Table
  var table = document.createElement("table");
  table.id = "enemyShipsGrid";
  document.getElementById("enemyShips").appendChild(table);

  // Create Header Row
  row = document.createElement("tr");
  cell = document.createElement("td");
  row.appendChild(cell);
  for(i=0; i<10; i++) {
    cell = document.createElement("td");
    cell.innerHTML = alpha[i];
    row.appendChild(cell);
  }
  table.appendChild(row);

  // Create Game Rows
  for (i=0; i<10; i++) {
    row = document.createElement("tr");

    cell = document.createElement("td");
    cell.innerHTML = i+1;
    row.appendChild(cell);

    for(j=0; j<10; j++) {
      var id = alpha[j].concat((i+1));
      cell = document.createElement("td");
      cell.classList.add("space");
      if(guesses[id] === "H") {
        cell.classList.add("hit");
      } else if(guesses[id] === "M") {
        cell.classList.add("miss");
      } else {
        cell.classList.add("clickable");
        cell.addEventListener("click", fire);
      }
      cell.id = id;
      row.appendChild(cell);
    }

    table.appendChild(row);

  }


  // Create Your Ships Table
  var table = document.createElement("table");
  table.id = "yourShipsGrid";
  document.getElementById("yourShips").appendChild(table);

  // Create Header Row
  row = document.createElement("tr");
  cell = document.createElement("td");
  row.appendChild(cell);
  for(i=0; i<10; i++) {
    cell = document.createElement("td");
    cell.innerHTML = alpha[i];
    row.appendChild(cell);
  }
  table.appendChild(row);

  // Create Game Rows
  for (i=0; i<10; i++) {
    row = document.createElement("tr");

    cell = document.createElement("td");
    cell.innerHTML = i+1;
    row.appendChild(cell);

    for(j=0; j<10; j++) {
      var id = alpha[j].concat((i+1));
      cell = document.createElement("td");
      cell.className = "space";
      if(opponentGuesses[id] === "H") {
        cell.classList.add("hit");
      } else if(opponentGuesses[id] === "M") {
        cell.classList.add("miss");
      }
      if(grid[id] != undefined) {
        cell.innerHTML = grid[id];
      }
      row.appendChild(cell);
    }

    table.appendChild(row);

  }

}

function fire() {

  var id = this.id;
  var cell = document.getElementById(id);

  console.log("Fired at " + id);

  var opponentGrid, opponentShips, guesses;
  if(turn === 1) {
    opponentGrid = player2_grid;
    opponentShips = player2_ships;
    guesses = player1_guesses;
  } else if(turn === 2) {
    opponentGrid = player1_grid;
    opponentShips = player1_ships;
    guesses = player2_guesses;
  }

  if(opponentGrid[id] != undefined) {
    alert("Hit!");
    if(turn === 1) { player1_hits++; } else { player2_hits++; }
    guesses[id] = "H";
    cell.classList.add("hit");
    cell.classList.remove("clickable");
    cell.removeEventListener("click", fire);
    if(shipSunk(opponentGrid[id].charAt(0), opponentShips, guesses)) {
      alert("You sunk your opponent's ".concat(shipNames[opponentGrid[id].charAt(0)].toLowerCase()).concat("!"));
      if(allShipsSunk(opponentShips, guesses)) {
        gameOver(turn);
      } else {
        clearScreen();
        setTimeout(newTurn, 200);
      }
    } else {
      clearScreen();
      setTimeout(newTurn, 200);
    }
    // Check if this sunk ship
  } else {
    alert("Miss!");
    guesses[id] = "M";
    cell.classList.add("miss");
    cell.classList.remove("clickable");
    cell.removeEventListener("click", fire);
    clearScreen();
    setTimeout(newTurn, 200);
  }

}

function shipSunk(ship, opponentShips, guesses) {

  var lengthOfPiece;
  switch(ship) {
    case "A":
      lengthOfPiece = 5;
      break;
    case "B":
      lengthOfPiece = 4;
      break;
    case "S":
      lengthOfPiece = 3;
      break;
  }

  var sunk = true;
  var i;
  for(i=0; i<lengthOfPiece; i++) {
    if(guesses[opponentShips["Ship".concat(ship.concat(i))]] === undefined) {
      sunk = false;
      break;
    }
  }

  //console.log("Sunk = ".concat(sunk));
  return sunk;

}

function allShipsSunk(opponentShips, guesses) {
  if(shipSunk("A", opponentShips, guesses) && shipSunk("B", opponentShips, guesses) && shipSunk("S", opponentShips, guesses)) {
    return true;
  } else {
    return false;
  }
}

function gameOver(player) {
  //console.log("Player 1 Hits: ".concat(player1_hits));

  var winnerName;
  var score = 24;
  if(player === 1) {
    score -= player2_hits * 2;
    winnerName = player1;
  } else {
    score -= player1_hits * 2;
    winnerName = player2;
  }

  alert("You win! Your score is: ".concat(score))

  var saved;
  if (localStorage.getItem("saved") === null) {
    saved = new Object();
  } else {
    saved = JSON.parse(localStorage.getItem("saved"));
  }

  var i, j;
  for(i=1; i<=10; i++) {
    if(saved[i] === undefined) {
      //console.log("yep");
      saved[i] = {name: winnerName, score: score};
      //console.log(saved[i]["name"]);
      break;
    } else if(saved[i]["score"] < score) {
      // bubble sort down
      for(j=9; j>=i; j--) {
        saved[j+1] = saved[j];
      }
      saved[i] = {name: winnerName, score: score};
      break;
    }
  }

  var top10 = "TOP 10 SCORES:\n";
  for(i=1; i<=10; i++) {
    if(saved[i] != undefined) {
      top10 = top10.concat(i).concat(". ").concat(saved[i]["name"]).concat(": ").concat(saved[i]["score"]).concat("\n");
      console.log(saved[i]["name"].concat(": ").concat(saved[i]["score"]));
    }
  }
  localStorage.setItem("saved", JSON.stringify(saved));
  alert(top10);

}

function clearScreen() {
  document.getElementById("enemyShipsGrid").remove();
  document.getElementById("yourShipsGrid").remove();
}
