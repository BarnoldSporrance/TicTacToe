const model = {
 // holds current board state  -IIFE in order to keep Tds from reading"undefined" as default
  gameArrayFunction: (function() {
    let gameArray =[" "," "," "," "," "," "," "," "," "];
    return{
      gameArray
    }
  })(),

  // applying the game logic
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
 // playerOneButton.classList.add('pressed');
  for (i=0; i<cells.length;i++){ 
    
    cells[i].addEventListener('click', function(event) {
    let cellID = event.target.id;
    model.getEntry(cellID)
    })  // end event listener
  } // end for
})(),// end getCellId

playerTicker: "x",


getEntry: (function(cellID){
   let PlayerOneNamePlace = document.getElementById("playerOneNamePlace");
   let PlayerTwoNamePlace = document.getElementById("playerTwoNamePlace");

  

    model.gameArrayFunction.gameArray.splice(cellID, 1, model.playerTicker);
    
    view.displayBoard();
    model.gameLogic();
    console.log('x: player one --' + model.gameArrayFunction.gameArray);

    if (model.playerTicker === "x"){
     PlayerOneNamePlace.classList.remove("pressed");
     PlayerTwoNamePlace.classList.add("pressed");

      console.log(PlayerOneNamePlace);
      console.log(PlayerTwoNamePlace);
      
      model.playerTicker="o";

      
    
      
    } else if (model.playerTicker === "o"){
      model.playerTicker = "x";
   
  
    }

    if (model.gameLogic().winner !=="none"){
    
      view.displayWinner();
      
            } else if (model.gameLogic().winner === "none") {
              if(controller.getGameMode.gameMode ==="twoPlayer"){  
          
              } else if (controller.getGameMode.gameMode ==="onePlayer"){
                model.computerPlayerShot();
              } 
          }
          return{PlayerTwoNamePlace, PlayerOneNamePlace}
  }), // end getEntry

computerPlayerShot: (function(){
   let randomCounter = Math.floor(Math.random() * 9);
   if (model.gameArrayFunction.gameArray[randomCounter] == " ") {
   
    model.gameArrayFunction.gameArray.splice(randomCounter, 1, "o");
    model.playerTicker = "x";
    


    model.gameLogic();

    if (model.gameLogic().winner !=="none"){
    
      view.displayWinner();
    
    }
    view.displayBoard();
   
  } else if (model.gameArrayFunction.gameArray[randomCounter] !== " ") {
    for (i=0;i<model.gameArrayFunction.gameArray.length; i++){
      if (model.gameArrayFunction.gameArray[i] === " "){
   //   console.log("It's already taken at position: " + randomCounter + ". But let's try again!");
      model.computerPlayerShot();
    } else if (model.gameArrayFunction.gameArray[i] !== " ") {
    
    
       console.log("all full!");
   } // end if
  } // end for
 } // end else if
}), // end computerPlayerShot
} // end model object


const controller = {

  getGameMode: (function(){
   let gameMode='';
    const playerOneSelector =  document.getElementById("onePlayerButton");
    const playerTwoSelector = document.getElementById("twoPlayerButton");

    playerOneSelector.addEventListener('click', ()=> {
      playerOneSelector.classList.add('pressed');
      playerTwoSelector.classList.add('noClicks');
      playerTwoSelector.classList.remove('pressed');

      controller.getGameMode.gameMode = 'onePlayer';

      view.initialView.formWrapper.style.display = "block";

      view.initialView.playerTwoNameEntry.style.display = "none";
     view.initialView.playerTwoNameEntryLabel.style.display = "none";


      view.initialView.gameSelectBoard.style.display = "none";
      view.initialView.promptBox.innerText = "enter P1 name";  
    });

    playerTwoSelector.addEventListener('click', ()=> {
      playerTwoSelector.classList.add('pressed');
      playerOneSelector.classList.add('noClicks');
      playerOneSelector.classList.remove('pressed');

      controller.getGameMode.gameMode = 'twoPlayer';

      view.initialView.formWrapper.style.display = "block";

      view.initialView.gameSelectBoard.style.display = "none";
      view.initialView.promptBox.innerText = "enter player names";  

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
  alert("And the winner is " + model.gameLogic().winner);
  console.log("And the winner is " + model.gameLogic().winner);
  view.displayBoard();

  }), // end displayWinner

displayPlayerNames: (function(playerOneName,playerTwoName){
  let playerOneNamePrint = document.getElementById("playerOneNamePlace");
  playerOneNamePrint.innerText = playerOneName.value;
  playerOneNamePrint.classList.add("pressed");


  let playerTwoNamePrint = document.getElementById("playerTwoNamePlace");
  
  if (controller.getGameMode.gameMode === "twoPlayer"){
  playerTwoNamePrint.innerText = playerTwoName.value;
  } else if (controller.getGameMode.gameMode === "onePlayer") {
    playerTwoNamePrint.innerText = "Computer";
  }
  return{playerOneNamePrint, playerTwoNamePrint}
}),

initialView: (function(){

  let formWrapper = document.getElementById("formWrapper");
  formWrapper.style.display="none";

  

  let playerNameBoard = document.getElementById("playerNameBoard");
  playerNameBoard.style.display = "none";

  let promptBox = document.getElementById("promptBox");
  promptBox.innerText = "choose game"

  let gameSelectBoard = document.getElementById("gameSelectBoard");
  
  let playerTwoNameEntry = document.getElementById("playerTwoNameEntry");
  let playerTwoNameEntryLabel = document.getElementById("playerTwoNameEntryLabel");

  return{formWrapper,promptBox, gameSelectBoard, playerTwoNameEntry, playerTwoNameEntryLabel, playerNameBoard}
})()

} // end view object



