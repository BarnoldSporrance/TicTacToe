const model = {
 // holds current baord state
  gameArrayFunction: (function() {
    const gameArray =["0","O","X","X","X","O","X","O","X"];
    return{
      gameArray
    }
  })()
} // end model object






const controller = {
  //factory function to create players
  players: (function() {
    const playerOne = prompt("Enter the name for player one");
    const playerTwo = prompt("Enter the name for player two");
    return {
     playerOne, playerTwo
  };
  })() // end player factory function

  //

}; // end controller object






const view = {
  // populate the board with currently positioned Xs and Os
  displayBoard: (function(){
  for (i=0; i<=8;i++){
    let cell = document.getElementById(i);
    cell.innerText = model.gameArrayFunction.gameArray[i];
    }
  })(), // end populate the on-page grid loop

  //dipslay the player names on the board
  displayPlayerNames:(function(){
  let displayPlayerOne = document.getElementById("playerOne").innerText = "Player 1: " + controller.players.playerOne;
  let displayPlayerTwo = document.getElementById("playerTwo").innerText = "Player 2: " + controller.players.playerTwo;
})()
} // end view object

// next, push this into the array.
//also, figure out how to make sure any ID gets pushed
// and put it in anevent listener
let banana = document.getElementById("0").innerText = ("hi");