const model = {

 // holds current board state  -IIFE in order to keep Tds from reading"undefined" as default
  gameArrayFunction: (function() {
    const gameArray =[" "," "," "," "," "," "," "," "," "];
    return{
      gameArray
    }
  })(),

  // applying the game logic
  gameLogic: function(){
  let winner = "none";
  const logicVar = model.gameArrayFunction.gameArray;

  if (logicVar[0]=== "x" && logicVar[1] === "x" && logicVar[2] === "x" || logicVar[3]=== "x" && logicVar[4] === "x" && logicVar[5] === "x" || logicVar[6]=== "x" && logicVar[7] === "x" && logicVar[8] === "x" || logicVar[0]=== "x" && logicVar[4] === "x" && logicVar[8] === "x" || logicVar[2]=== "x" && logicVar[4] === "x" && logicVar[6] === "x"){
    winner = controller.players.playerOne;
  } else if (logicVar[0]=== "o" && logicVar[1] === "o" && logicVar[2] === "o" || logicVar[3]=== "o" && logicVar[4] === "o" && logicVar[5] === "o" || logicVar[6]=== "o" && logicVar[7] === "o" && logicVar[8] === "o" || logicVar[0]=== "o" && logicVar[4] === "o" && logicVar[8] === "o" || logicVar[2]=== "o" && logicVar[4] === "o" && logicVar[6] === "o"){
    winner = controller.players.playerTwo;
  }
 return {winner}
  },// end game Logic
} // end model object


const controller = {
  //factory function to create players
  players: (function() {
    const playerOne = prompt("Enter the name for player one (you're 'X')");
    const playerTwo = prompt("Enter the name for player two(you're 'O')");
    return {
     playerOne, playerTwo
  };
  })(), // end player factory function

  getEntry: (function(){
    //get input from player and send to model array
    const cells = document.getElementsByTagName("td");
    for (var i=0; i<=8; i++){
      cells[i].addEventListener('focusout', function(event) {
      let cellID = event.target.id;
      let cellContent = this.innerText;
      
     // function to check that entry is either an X or O
     const checkInput = (function(){
      if (cellContent === "x"|| cellContent === "X" || cellContent === "o" || cellContent === "O") {
       // console.log("valid input");
        cellContent = cellContent.toLowerCase();
        // send valid inout to model
        model.gameArrayFunction.gameArray.splice(cellID, 1,cellContent);
        view.displayBoard();
        model.gameLogic();
        
        if (model.gameLogic().winner !=="none"){
        view.displayWinner(model.gameLogic().winner);
        }
      } else {
      //  console.log("pure shite input");
        cellContent = ' ';
        view.displayBoard();
        model.gameLogic();
        alert("hey! just the 'x's and 'o's, please.");
      }
     })(); // end check input
      }); // end event listener
    } // end for 
  })() //end get entry function
} // end controller

const view = {
  // populate the board with currently positioned Xs and Os
  displayBoard: (function(){
  for (i=0; i<=8;i++){
    let cell = document.getElementById(i);
    cell.innerText = model.gameArrayFunction.gameArray[i];
    }
  }), // end populate the on-page grid loop

  //dipslay the player names on the board
  displayPlayerNames:(function(){
  let displayPlayerOne = document.getElementById("playerOne").innerText = "Player 1 (x): " + controller.players.playerOne;
  let displayPlayerTwo = document.getElementById("playerTwo").innerText = "Player 2 (o): " + controller.players.playerTwo;
  })(),

  displayWinner: (function(winner){
  alert("And the winner is " + winner);
  })
} // end view object





