let riddle = {};
let riddles = [];
let riddleNum = -1;

// Get the riddles from a .json file
fetch ("riddles.json")
  .then (response => response.json ())
  .then (json => {
    riddles = json;
    // Initialize and show the 1st riddle.
    riddle = getRiddle ();
    showQuestion (riddle.question);
  });

/****************************************************** */
function getRiddle () {
/****************************************************** */
  // Return a riddle object.
  ++riddleNum;
  if (riddleNum === riddles.length)
  {
    riddleNum = 0;
  }
  return (riddles [riddleNum]);
}