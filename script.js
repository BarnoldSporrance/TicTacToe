const model = {
  gameArrayFunction: (function() {
    let gameArray =[" "," "," "," "," "," "," "," "," "];
    return{
      gameArray
    }
  })(),

  gameLogic: function(){
  let winner = "none";
  const logicVar = model.gameArrayFunction.gameArray;

  if (logicVar[0]=== "x" && logicVar[1] === "x" && logicVar[2] === "x" || logicVar[3]=== "x" && logicVar[4] === "x" && logicVar[5] === "x" || logicVar[6]=== "x" && logicVar[7] === "x" && logicVar[8] === "x" || logicVar[0]=== "x" && logicVar[4] === "x" && logicVar[8] === "x" || logicVar[2]=== "x" && logicVar[4] === "x" && logicVar[6] === "x" || logicVar[0]=== "x" && logicVar[3] === "x" && logicVar[6] === "x"|| logicVar[1]=== "x" && logicVar[4] === "x" && logicVar[7] === "x" || logicVar[2]=== "x" && logicVar[5] === "x" && logicVar[8] === "x"){
    winner = "x";
  } else if (logicVar[0]=== "o" && logicVar[1] === "o" && logicVar[2] === "o" || logicVar[3]=== "o" && logicVar[4] === "o" && logicVar[5] === "o" || logicVar[6]=== "o" && logicVar[7] === "o" && logicVar[8] === "o" || logicVar[0]=== "o" && logicVar[4] === "o" && logicVar[8] === "o" || logicVar[2]=== "o" && logicVar[4] === "o" && logicVar[6] === "o" || logicVar[0]=== "o" && logicVar[3] === "o" && logicVar[6] === "o"|| logicVar[1]=== "o" && logicVar[4] === "o" && logicVar[7] === "o" || logicVar[2]=== "o" && logicVar[5] === "o" && logicVar[8] === "o"){
    winner ='o';
  }
 return {winner}
  },// end game logic

getCellId: (function(){
  const cells = document.querySelectorAll(".cell");
  for (i=0; i<cells.length;i++){ 
    cells[i].addEventListener('click', function(event) {
    let cellID = event.target.id;
    model.getEntry(cellID)
    })  // end event listener
  } // end for
  return {cells}
})(),// end getCellId

playerTicker: "x",

drawLogic: (function(array){
  let count = 0;
 // let unplayableCells  = document.querySelectorAll(".cell");
 for (i=0; i<=array.length; i++){
   if (array[i] !== " ") {
     count++;
     console.log("count: " + count);
     if (count==10){
      view.initialView.promptBox.innerText = "It's a draw";
      controller.makeUnplayable();
     }
   }
 }
}),

getEntry: (function(cellID){
   let PlayerOneNamePlace = document.getElementById("playerOneNamePlace");
   let PlayerTwoNamePlace = document.getElementById("playerTwoNamePlace");
   if (model.gameArrayFunction.gameArray[cellID] !== " "){
     alert("Nope! Can't have that. Try again.");
   } else {
    model.gameArrayFunction.gameArray.splice(cellID, 1, model.playerTicker);
    view.displayBoard();
    model.gameLogic();
    model.drawLogic(model.gameArrayFunction.gameArray);
   
    if (model.playerTicker === "x"){
     PlayerOneNamePlace.classList.remove("pressed");
     PlayerTwoNamePlace.classList.add("pressed");
     model.playerTicker="o";
      
    } else if (model.playerTicker === "o"){
      model.playerTicker = "x";
      PlayerOneNamePlace.classList.add("pressed");
      PlayerTwoNamePlace.classList.remove("pressed");
    }
    if (model.gameLogic().winner !=="none"){
      view.displayWinner();
      controller.makeUnplayable();
      } else if (model.gameLogic().winner === "none") {
        if(controller.getGameMode.gameMode ==="twoPlayer"){  
          } else if (controller.getGameMode.gameMode ==="onePlayer"){
            model.computerPlayerShot();
            } 
        }
        return{PlayerTwoNamePlace, PlayerOneNamePlace}
        } // end inital check              
  }), // end getEntry

computerPlayerShot: (function(){
   let randomCounter = Math.floor(Math.random() * 9);
   if (model.gameArrayFunction.gameArray[randomCounter] == " ") {
     model.gameArrayFunction.gameArray.splice(randomCounter, 1, "o");
     model.playerTicker = "x";
     let computerShotPlayerOne = document.getElementById("playerOneNamePlace");
     computerShotPlayerOne.classList.add("pressed");

    let computerShotPlayerTwo = document.getElementById("playerTwoNamePlace");
    computerShotPlayerTwo.classList.remove("pressed");

    model.gameLogic();
    model.drawLogic(model.gameArrayFunction.gameArray);

    if (model.gameLogic().winner !=="none"){
      view.displayWinner();
      controller.makeUnplayable();
      }
    view.displayBoard();
    } else if (model.gameArrayFunction.gameArray[randomCounter] !== " ") {
        for (i=0;i<model.gameArrayFunction.gameArray.length; i++){
          if (model.gameArrayFunction.gameArray[i] === " "){
          model.computerPlayerShot();
          } 
        } // end for
      } // end else if
}), // end computerPlayerShot
} // end model object

const controller = {
  makeUnplayable:(function(){
    let unplayableCells  = document.querySelectorAll(".cell");
    for (i=0; i<unplayableCells.length; i++) {
        
      unplayableCells[i].classList.add("avoid-clicks");
      view.initialView.resetButtInitial.classList.add("resetEmphasis");
      view.initialView.playerNameBoard.classList.add("avoid-clicks")
    }
  }),

  getGameMode: (function(){
   let gameMode='';
    const playerOneSelector =  document.getElementById("onePlayerButton");
    const playerTwoSelector = document.getElementById("twoPlayerButton");

    playerOneSelector.addEventListener('click', ()=> {
      playerOneSelector.classList.add('pressed');
      playerTwoSelector.classList.remove('pressed');
      controller.getGameMode.gameMode = 'onePlayer';
      view.initialView.formWrapper.style.display = "block";
      view.initialView.playerTwoNameEntry.style.display = "none";
      view.initialView.playerTwoNameEntryLabel.style.display = "none";
      view.initialView.gameSelectBoard.style.display = "none";
      view.initialView.promptBox.innerText = "enter P1 name";  
      view.initialView.resetButtInitial.style.display = "block";
    });

    playerTwoSelector.addEventListener('click', ()=> {
      playerTwoSelector.classList.add('pressed');
      playerOneSelector.classList.add('noClicks');
      playerOneSelector.classList.remove('pressed');
      controller.getGameMode.gameMode = 'twoPlayer';
      view.initialView.formWrapper.style.display = "block";
      view.initialView.gameSelectBoard.style.display = "none";
      view.initialView.promptBox.innerText = "enter player names";  
      view.initialView.resetButtInitial.style.display = "block";
    });
   return{gameMode}
  })(),

getPLayerNames: (function(){
 let playerOneName = document.getElementById("playerOneNameEntry");
 let playerTwoName = document.getElementById("playerTwoNameEntry");
 let submitButton = document.getElementById("submitButton");

 submitButton.addEventListener("click", function(){
   view.displayPlayerNames(playerOneName,playerTwoName);
   view.initialView.formWrapper.style.display = "none";
   view.initialView.promptBox.innerText = "FIGHT!";
   view.initialView.playerNameBoard.style.display = "flex";
 })
return{playerOneName,playerTwoName}
})(),

resetGame: (function(){
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", function(){
    location.reload();
    return false;
  });
})()
} // end controller

const view = {
  // populate the board with currently positioned Xs and Os
  displayBoard: (function(){
   // let cells = document.querySelectorAll(".cell");;
  for (i=0; i<model.gameArrayFunction.gameArray.length;i++){
    let cell = document.getElementById(i);
  //  console.log("cell: " + cell);
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

  displayWinner: (function(){  
    if (model.gameLogic().winner === "x"){
      view.initialView.promptBox.innerText = controller.getPLayerNames.playerOneName.value + " wins!";
    } else if (model.gameLogic().winner === "o" && controller.getGameMode.gameMode === "twoPlayer") {
      view.initialView.promptBox.innerText = controller.getPLayerNames.playerTwoName.value + " wins!";
      } else if (model.gameLogic().winner === "o" && controller.getGameMode.gameMode === "onePlayer") {
      view.initialView.promptBox.innerText = "Computer wins!";
    }
  view.displayBoard();
  }), // end displayWinner

displayPlayerNames: (function(playerOneName,playerTwoName){
  let playerOneNamePrint = document.getElementById("playerOneNamePlace");
  playerOneNamePrint.innerText = playerOneName.value;
  let playerTwoNamePrint = document.getElementById("playerTwoNamePlace");
  
  if (controller.getGameMode.gameMode === "twoPlayer"){
    playerTwoNamePrint.innerText = playerTwoName.value;
    } else if (controller.getGameMode.gameMode === "onePlayer") {
      playerTwoNamePrint.innerText = "Computer";
    }
  return{playerOneNamePrint, playerTwoNamePrint}
}),

initialView: (function(){
  let PlayerOneNamePlaceInit = document.getElementById("playerOneNamePlace");
  PlayerOneNamePlaceInit.classList.add("pressed");
  let formWrapper = document.getElementById("formWrapper");
  formWrapper.style.display="none";
  let playerNameBoard = document.getElementById("playerNameBoard");
  playerNameBoard.style.display = "none";
  let promptBox = document.getElementById("promptBox");
  promptBox.innerText = "choose game"
  let gameSelectBoard = document.getElementById("gameSelectBoard");
  let playerTwoNameEntry = document.getElementById("playerTwoNameEntry");
  let playerTwoNameEntryLabel = document.getElementById("playerTwoNameEntryLabel");
  let resetButtInitial = document.getElementById("resetButton");
  resetButtInitial.style.display = "none";
  
  return{formWrapper,promptBox, gameSelectBoard, playerTwoNameEntry, playerTwoNameEntryLabel, playerNameBoard, resetButtInitial}
})()
} // end view object



