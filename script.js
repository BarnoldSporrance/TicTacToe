const model = {

 // holds current board state
  gameArrayFunction: (function() {
    const gameArray =[" "," "," "," "," "," "," "," "," "];
    return{
      gameArray
    }
  })(),

  // applying the game logic
  gameLogic: (function(){
  let winner = "none";
  const logicVar = model.gameArrayFunction.gameArray;

  if (logicVar[0]=== "x" && logicVar[1] === "x" && logicVar[2] === "x"){
    //alert ("player one wins");
    winner = controller.players.playerOne;
    
    console.log("winner from within game logic function:" + winner);
  }
  
 return {winner}
 // access with "model.gameLogic().winner"
  })
  

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

  //display winner message
  displayWinner: (function(winner){
    const champ = winner;
    alert(champ);
   // console.log(model.gameLogic().winner);
   // alert(model.gameLogic().winner);
  })
 




} // end view object


