var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var player1_ships = new Object();
var player2_ships = new Object();
var player1_guesses = new Object();
var player2_guesses = new Object();
var player1, player2;
var turn;

window.addEventListener('load', battleship, false);

function battleship() {

  setup();

  /*
  if(player1_ships.A3 != undefined) {
    alert("A3 is: ".concat(player1_ships.a3));
  }

  player1_ships.a3 = undefined;
  if(player1_ships.A3 === undefined) {
    alert("hey");
  }
  */

  var winner = 0;
  var test = 0;

  while(winner === 0) {

    //alert("Click OK to begin ".concat(player1).concat("'s turn."));
    turn = 1;
    renderGrids();

    // Clear Screen
    // Use await?

    //alert("Click OK to begin ".concat(player2).concat("'s turn."));
    //turn = 2;
    //renderGrids();

    // max three turns for testing to prevent infinite loop
    test++;
    if(test == 1) {
      winner = 1;
    }
  }

}

function setup() {

  // Regex: https://regex101.com/r/JqgHOZ/1

  //player1 = prompt("Hello, player 1. Enter your name.");
  player1 = "Alice";
  var player1_shipplacement = "B(B6-E6);S(H3-J3);A(A1-A5)";
  //do {
  //  var player1_shipplacement = prompt("Thanks ".concat(player1).concat("! Enter your ship placement in one of the following formats:\nA:A1-A5;B:B6-E6; S:H3-J3\nA(A1-A5); B(B6-E6); S(H3-J3);\nB(B6-E6);S(H3-J3);A(A1-A5)"));
  //} while(player1_shipplacement.match(/([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?/) === null);
  //player2 = prompt("Hello, player 2. Enter your name.");
  player2 = "Bob";
  var player2_shipplacement = "B(B6-E6);S(H3-J3);A(A1-A5)";
  //do {
  //  var player2_shipplacement = prompt("Thanks ".concat(player1).concat("! Enter your ship placement in one of the following formats:\nA:A1-A5;B:B6-E6; S:H3-J3\nA(A1-A5); B(B6-E6); S(H3-J3);\nB(B6-E6);S(H3-J3);A(A1-A5)"));
  //} while(player2_shipplacement.match(/([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?/) === null);
  // If the format is incorrect, do while and give them another chance to enter again
  /*
  A:A1-A5;B:B6-E6; S:H3-J3
  A(A1-A5); B(B6-E6); S(H3-J3);
  B(B6-E6);S(H3-J3);A(A1-A5)
  */

  player1_shipplacement = player1_shipplacement.split(/([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?/);
  addGamePiece(player1_ships, player1_shipplacement[1], player1_shipplacement[2], player1_shipplacement[3]);
  addGamePiece(player1_ships, player1_shipplacement[5], player1_shipplacement[6], player1_shipplacement[7]);
  addGamePiece(player1_ships, player1_shipplacement[9], player1_shipplacement[10], player1_shipplacement[11]);
  console.log(player1_ships);

  player2_shipplacement = player2_shipplacement.split(/([ABS]):?\(?([A-J][1-9]|10)-([A-J][1-9]|10)\)?;? ?/);
  addGamePiece(player2_ships, player2_shipplacement[1], player2_shipplacement[2], player2_shipplacement[3]);
  addGamePiece(player2_ships, player2_shipplacement[5], player2_shipplacement[6], player2_shipplacement[7]);
  addGamePiece(player2_ships, player2_shipplacement[9], player2_shipplacement[10], player2_shipplacement[11]);
  console.log(player2_ships);

}

function addGamePiece(gameBoard, piece, firstSpace, lastSpace) {

  firstSpace = firstSpace.toUpperCase();
  lastSpace = lastSpace.toUpperCase();

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
      gameBoard[colLetter.concat(nextNum)] = piece;
    }

  } else { // Same row (number) = HORIZONTAL PIECE

    var rowNum = firstSpace.charAt(1);
    if(firstSpace.charAt(2) === '0') rowNum = 10;
    var i;
    for(i=0; i<lengthOfPiece; i++) {
      var nextLet = String.fromCharCode(firstSpace.charAt(0).charCodeAt() + i);
      gameBoard[nextLet.concat(rowNum)] = piece;
    }

  }

}

function renderGrids() {

  var ships, guesses, i, j, table, row, cell;

  if(turn === 1) {
    ships = player1_ships;
    guesses = player1_guesses;
  } else if(turn === 2) {
    ships = player2_ships;
    guesses = player2_guesses;
  }

  // Create Enemy Ships Table
  var table = document.createElement("table");
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
      cell.className = "space";
      cell.id = id;
      cell.addEventListener("click", fire);
      cell.className += " clickable";
      row.appendChild(cell);
    }

    table.appendChild(row);

  }


  // Create Your Ships Table
  var table = document.createElement("table");
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
      if(ships[id] != undefined) {
        cell.innerHTML = ships[id];
      }
      row.appendChild(cell);
    }

    table.appendChild(row);

  }

}

function fire() {

  var id = this.id;
  var cell = document.getElementById(id);

  var ships, guesses;
  if(turn === 1) {
    opponentShips = player2_ships;
    guesses = player1_guesses;
  } else if(turn === 2) {
    opponentShips = player1_ships;
    guesses = player2_guesses;
  }

  if(opponentShips[id] != undefined) {
    alert("Hit!");
    guesses[id] = "X";
    cell.className += " hit";
  } else {
    alert("Miss!");
    guesses[id] = "X";
    cell.className += " miss";
  }

  console.log("Fired at " + id);
}
