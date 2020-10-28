let riddle = {};
let riddles = [];
let riddleNum = -1;

// Get the riddles from a .json file
fetch ("riddles.json")
  .then (response => response.json ())
  .then (json => {
    riddles = json;
    // Initialize and show the 1st riddle.
    riddle = getRiddle (1);
    showQuestion (riddle.question);
  });

/****************************************************** */
function getRiddle (next) {
/****************************************************** */
  // Return a riddle object.
  // Get next riddle if next is 1; otherwise get previous riddle.
  if (next) {
    // Get next riddle.
    ++riddleNum;
    // Circle back to 0 if at the end of the list.
    if (riddleNum === riddles.length) {
      riddleNum = 0;
    }
  }
  else {
    // Get previous riddle
    --riddleNum;
    // Go to end of list if riddleNum is -1
    if (riddleNum === -1) {
      riddleNum = riddles.length - 1;
    }
  }
  
  return (riddles [riddleNum]);
}