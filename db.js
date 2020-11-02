let riddle = {};
let riddles = [];
let riddlesToDisplay = [];
let riddleNum = -1;
let riddleType = "all";

// Get the riddles from a .json file
fetch ("riddles.json")
  .then (response => response.json ())
  .then (json => {
    riddles = json;
    riddles.forEach (function (riddle,index) {
      riddlesToDisplay [index] = index;
    });

    // Initialize and show the 1st riddle.
    initRiddle ();
});

/****************************************************** */
function initRiddle () {
/****************************************************** */
  riddleNum = -1;
  riddle = getRiddle (1);
  showQuestion (riddle.question);
}

/****************************************************** */
function getRiddle (next) {
/****************************************************** */
  // Return a riddle object.
  // Get next riddle if next is 1; otherwise get previous riddle.
  // Only return riddles in the specified category.
  // Start by building an array of riddles in the selected category
  // if the category isn't "all" and the array isn't set up.
  
  const numRiddles = riddlesToDisplay.length;
 
  if (next) {
    // Get next riddle.
    ++riddleNum;
    // Go back to the 1st riddle in the list if at the end of the list.
    if (riddleNum === numRiddles) {
      riddleNum = 0;
    }
  }
  else {
    // Get previous riddle
    --riddleNum;
    // Go to end of list if riddleNum is -1
    if (riddleNum === -1) {
      riddleNum = numRiddles - 1;
    }
  }
  
  // Get the index of the riddle into the main list.
  const riddleIndex = riddlesToDisplay [riddleNum];

  return (riddles [riddleIndex]);
}

/****************************************************** */
function riddleInCategory (riddleIndex, category) {
/****************************************************** */
  const question = riddles[riddleIndex].question;
  // For now check if the category word is in the question
  return (question.includes (category));
}