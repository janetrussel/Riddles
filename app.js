const answer = document.querySelector(".answer");
const giveup = document.querySelector(".giveup");
const next = document.querySelector(".next");
const question = document.querySelector (".question");

let riddle = getRiddle ();

// const style = getComputedStyle (answer);

// Show the answer to the riddle.
/***************************************************************** */
function showAnswer (answerStr) {
/***************************************************************** */
  // Create an array of letters surrounded by span tags.
  let letters = [];
  letters = answerStr.split ('');
 // console.log ("[", letters, "]");

  letters = letters.map((letter) => {
      return `<span class="answer-letter">${letter}</span>`;
  });
  
  //console.log ("letters:  ", letters);
  answer.innerHTML = letters.join ('');
  //console.log ("answer [", answer, "]");

  Array.from(answer.children).forEach((child, i) => {

//  answer.children.forEach ((element) => {
    //console.log ("element [", child, "]");
    setTimeout (function () {
    child.style.visibility = "visible";
    }, i*100);
  }, 0);
  
  //answer.style.visibility = "visible";
};

/****************************************************************** */
function showQuestion (questionStr) {
/****************************************************************** */
  question.textContent = questionStr;
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
  
showQuestion (riddle.question);