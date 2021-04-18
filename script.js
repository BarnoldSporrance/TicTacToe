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
    winner = "x";
  } else if (logicVar[0]=== "o" && logicVar[1] === "o" && logicVar[2] === "o" || logicVar[3]=== "o" && logicVar[4] === "o" && logicVar[5] === "o" || logicVar[6]=== "o" && logicVar[7] === "o" && logicVar[8] === "o" || logicVar[0]=== "o" && logicVar[4] === "o" && logicVar[8] === "o" || logicVar[2]=== "o" && logicVar[4] === "o" && logicVar[6] === "o" || logicVar[0]=== "o" && logicVar[3] === "o" && logicVar[6] === "o"|| logicVar[1]=== "o" && logicVar[4] === "o" && logicVar[7] === "o" || logicVar[2]=== "o" && logicVar[5] === "o" && logicVar[8] === "o"){
    winner ='o';
  }
 return {winner}
  },// end game logic


  
getEntry: (function(){

  const cells1 = document.querySelectorAll(".cell");
  playerOneButton.classList.add('pressed');

  let playerTicker = "one";
  

   // for (var i=0; i<=model.gameArrayFunction.gameArray.length-1; i++){


      cells1.forEach(function(cell){


        cell.addEventListener('click', function banana1(event) {
        let cellID1 = event.target.id;
      

    model.gameArrayFunction.gameArray.splice(cellID1, 1, 'x');
    console.log('x: player one --' + model.gameArrayFunction.gameArray);
   // model.getEntry.banana2 = null;
      
      view.displayBoard();
      model.gameLogic();
      
      if (model.gameLogic().winner !=="none"){
        view.displayBoard();
        view.displayWinner();
        view.displayBoard();
        } else {
          if(controller.getGameMode.gameMode ==="twoPlayer"){  
            model.playerTwoShot();
          } else if (controller.getGameMode.gameMode ==="onePlayer"){
            model.computerPlayerShot();
          } 
      }
  }); // end event listener
 // end for
}) // end for each
}), // end playerOne shot

playerTwoShot: (function(){
  playerTwoButton.classList.add('pressed');
  playerOneButton.classList.remove('pressed');

  const cells2 = document.querySelectorAll(".cell");
 
  cells2.forEach(function(box){

  //  for (var i=0; i<=model.gameArrayFunction.gameArray.length-1; i++){
      box.addEventListener('click', function banana2(event) {
      let cellID2 = event.target.id;

      model.gameArrayFunction.gameArray.splice(cellID2, 1, 'o');
      console.log('o: player 2 --' + model.gameArrayFunction.gameArray);
      view.displayBoard();
      model.gameLogic();
    
      if (model.gameLogic().winner !=="none"){
       view.displayBoard();
      view.displayWinner();
     //model.gameArrayFunction.gameArray = [" "," "," "," "," "," "," "," "," "];

        } else if (model.gameArrayFunction.gameArray[i] !== " "){
      model.getEntry();
      playerTwoButton.classList.remove('pressed');
      playerOneButton.classList.add('pressed');
      }
    })  
  }); // end event listener
//} // end for
}), // end playerTwo shot

computerPlayerShot: (function(){
   let randomCounter = Math.floor(Math.random() * 9);
   if (model.gameArrayFunction.gameArray[randomCounter] == " ") {
    console.log("we can place an 'o' at position:" + randomCounter);
    model.gameArrayFunction.gameArray.splice(randomCounter, 1, "o");
    console.log('o: computer' + model.gameArrayFunction.gameArray);
    playerOneButton.classList.add('pressed');
    playerTwoButton.classList.remove('pressed');
    model.gameLogic();
    view.displayBoard();
   
  } else if (model.gameArrayFunction.gameArray[randomCounter] !== " ") {
    for (i=0;i<model.gameArrayFunction.gameArray.length; i++){
      if (model.gameArrayFunction.gameArray[i] === " "){
      console.log("It's already taken at position: " + randomCounter + ". But let's try again!");
      model.computerPlayerShot();
    } else if (model.gameArrayFunction.gameArray[i] !== " ") {
      console.log("all full!");
   } // end if
  } // end for
 } // end else if
}),
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
      model.getEntry();
    });

    playerTwoSelector.addEventListener('click', ()=> {
      playerTwoSelector.classList.add('pressed');
      playerOneSelector.classList.add('noClicks');
      playerOneSelector.classList.remove('pressed');

      controller.getGameMode.gameMode = 'twoPlayer';
      model.getEntry();
    
   });
   return{gameMode}
  })(),
} // end controller

const view = {
  // populate the board with currently positioned Xs and Os
  displayBoard: (function(){
  for (i=0; i<=model.gameArrayFunction.gameArray.length-1;i++){
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

  displayWinner: (function(){
    //view.displayBoard();

  alert("And the winner is " + model.gameLogic().winner);
  console.log("And the winner is " + model.gameLogic().winner);
 model.gameArrayFunction.gameArray = [" "," "," "," "," "," "," "," "," "];
  model.gameLogic.winner ="none";
  

  view.displayBoard();

  }) // end dsiplayWinner
} // end view object


view.displayBoard();
