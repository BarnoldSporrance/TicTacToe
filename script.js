const model = {
 // holds current baord state
  gameArrayFunction: (function() {
    const gameArray =["X","O","X","X","X","O","X","O","X"];
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
  })(), // end player factory function
alert: function(){alert("this is player one:" + this.players.playerOne)}
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
  let displayPlayerOne = document.getElementById("playerOne").innerText = controller.players.playerOne;
  let displayPlayerTwo = document.getElementById("playerTwo").innerText = controller.players.playerTwo;

})()
} // end view object

