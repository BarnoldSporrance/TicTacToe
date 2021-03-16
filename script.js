const gameboard =(function() {
  const gameArray =["X","O","X","X","X","O","X","O","X"];
  
  for (i=0; i<=8;i++){
    let cell = document.getElementById(i);
    cell.innerText = gameArray[i];
  }
})();

const players = (function() {
const playerOne = prompt("Enter the name for player one");
const playerTwo = prompt("Enter the name for player two");
return {
   playerOne, playerTwo
};

})();