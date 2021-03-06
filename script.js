const gameboard =(function() {
  const gameArray =["1","2","3","4","5","6","7","8","9"];
  
  for (i=0; i<=8;i++){
    let cell = document.getElementById(i);
    cell.innerText = gameArray[i];
  }

})();