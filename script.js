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

  if (logicVar[0]=== "x" && logicVar[1] === "x" && logicVar[2] === "x" || logicVar[3]=== "x" && logicVar[4] === "x" && logicVar[5] === "x" || logicVar[6]=== "x" && logicVar[7] === "x" && logicVar[8] === "x" || logicVar[0]=== "x" && logicVar[4] === "x" && logicVar[8] === "x" || logicVar[2]=== "x" && logicVar[4] === "x" && logicVar[6] === "x" || logicVar[0]=== "x" && logicVar[3] === "x" && logicVar[6] === "x"|| logicVar[1]=== "x" && logicVar[4] === "x" && logicVar[7] === "x" || logicVar[2]=== "x" && logicVar[5] === "x" && logicVar[8] === "x"){
    controller.getEntry.playerSelector = "x";
    winner = controller.getEntry.playerSelector;
    
  } else if (logicVar[0]=== "o" && logicVar[1] === "o" && logicVar[2] === "o" || logicVar[3]=== "o" && logicVar[4] === "o" && logicVar[5] === "o" || logicVar[6]=== "o" && logicVar[7] === "o" && logicVar[8] === "o" || logicVar[0]=== "o" && logicVar[4] === "o" && logicVar[8] === "o" || logicVar[2]=== "o" && logicVar[4] === "o" && logicVar[6] === "o" || logicVar[0]=== "o" && logicVar[3] === "o" && logicVar[6] === "o"|| logicVar[1]=== "o" && logicVar[4] === "o" && logicVar[7] === "o" || logicVar[2]=== "o" && logicVar[5] === "o" && logicVar[8] === "o"){
    controller.getEntry.playerSelector = "o";
    winner = controller.getEntry.playerSelector;
    
  }
 return {winner}
  },// end game logic
} // end model object


const controller = {

  getGameMode: (function(){
    const playerOneButton =  document.getElementById("playerOneButton");
    const playerTwoButton = document.getElementById("PlayerTwoButton");

    playerOneButton.addEventListener('click', ()=> {
       
    }) // end event listener click
    return {
      playerOneButton, playerTwoButton
    }
  }),

  getEntry: (function(){
    //get input from player and send to model array
    const cells = document.querySelectorAll(".cell");

    let playerSelector = "x";
    playerOneButton.classList.add('pressed');
    for (var i=0; i<=8; i++){
      cells[i].addEventListener('click', function(event) {
       
      let cellID = event.target.id;
      if (playerSelector === "x") {
        
      model.gameArrayFunction.gameArray.splice(cellID, 1, playerSelector);
      playerOneButton.classList.remove('pressed');
      playerSelector ="o";
      playerTwoButton.classList.add('pressed');
      } else if (playerSelector ==="o") {
        playerTwoButton.classList.remove('pressed');
        model.gameArrayFunction.gameArray.splice(cellID, 1, playerSelector);
        playerOneButton.classList.add('pressed');
        playerSelector ="x";
      }
      view.displayBoard();

        if (model.gameLogic().winner !=="none"){
         
        view.displayWinner(model.gameLogic().winner);
        }
     
      }); // end event listener
    } // end for 
  return{ playerSelector}

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

  mouseOverEffect:(function(){
    const focusedSquare = document.querySelectorAll('.cell');
    focusedSquare.forEach((div) =>{
      div.addEventListener('mouseover',()=> {
       
        div.classList.add('mousedOver');
      }); // end event listener 'mouseover'
    }); // end 'for each' 
  })(), // end mouseOverEffect

  mouseOutEffect:(function(){
    const unfocusedSquare = document.querySelectorAll('.cell');
    unfocusedSquare.forEach((div) =>{
      div.addEventListener('mouseout',()=> {
        div.classList.remove('mousedOver')
   
      }); // end event listener 'mouseout'
    }); // end 'for each' 
  })(), // end mouseOutEffect

  displayWinner: (function(winner){
 
  
 // model.gameArrayFunction.gameArray = [" "," "," "," "," "," "," "," "," "];
  view.displayBoard();
  alert("And the winner is " + winner);
  })
} // end view object

view.displayBoard();


