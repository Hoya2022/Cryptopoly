//Source: https://icodemag.com/3d-rolling-dice-css-javascript/

//select the classes we require
var cube = document.querySelector('.cube');
var rollBtn = document.querySelector('.rollBtn');
var currentClass = '';

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//our main roll dice function on click
function rollDice() {

  if (typeof g !== 'undefined') {
    if (g.isMoving == true)
      return;
  }
  //genberate a random number between 1 and 6 with out getRandomInt function
  var randNum = getRandomInt(5, 5);
  console.log(randNum)
  //generate a class with the random number between 1 - 6 called showClass
  var showClass = 'show-' + randNum;
  console.log(showClass)

  // if there is a class already selected remove it
  if (currentClass) {
    cube.classList.remove(currentClass);
  }
  // add the new showclass with the generated number
  cube.classList.add(showClass);
  //set the current class to the randomly generated number
  currentClass = showClass;

  if (typeof g !== 'undefined') {
    g.playerList[g.player].updateLocation(randNum);
    // g.switchPlayer();
    g.printGameboard();
  }

  return randNum;
}
// set initial side
rollDice();
// on click eventlistener for the button element
rollBtn.addEventListener("click", rollDice);
