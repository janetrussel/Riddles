const answer = document.querySelector(".answer");
const giveup = document.querySelector(".giveup");
const next = document.querySelector(".next");
const question = document.querySelector (".question");
const laugh = document.querySelector ("audio");

// Show the answer to the riddle.
/***************************************************************** */
function showAnswer (answerStr) {
/***************************************************************** */
  // Create an array of letters surrounded by span tags.
  let letters = [];
  letters = answerStr.split ('');

  letters = letters.map((letter) => {
    return `<span class="answer-letter">${letter}</span>`;
  });
  
  //console.log ("letters:  ", letters);
  answer.innerHTML = letters.join ('');

  // Add a delay in between each letter in the answer; play laugh at the end
  const numElements = answer.childElementCount;
  Array.from(answer.children).forEach((child, i) => {
    setTimeout (function () {
      child.style.visibility = "visible";
      
      // Check if this is the last child; after the end of the riddle
      // play the audio file (laugh).
      if (i+1 === numElements)
      {
        laugh.play ();
      }
    }, i*75);
  }, 0)
};

/****************************************************************** */
function showQuestion (questionStr) {
/****************************************************************** */
  question.textContent = questionStr;
  // Place a character in the answer string -even though it's hidden.
  // so that the chalkboard stays a fixed size and the height doesn't
  // decrease and increase as the answer disappears.
  answer.textContent = "-";
}

/****************************************************************** */
// Add an event listenter to the I give up button
giveup.addEventListener ('click', () => {
/****************************************************************** */
  // Show the answer
  showAnswer (riddle.answer);
});

/****************************************************************** */
// Add an event listenter to the Next button
next.addEventListener ('click', () => {
/****************************************************************** */
    // Show the answer
    answer.textContent="";
    riddle = getRiddle ();
    showQuestion (riddle.question);
});