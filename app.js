const answer = document.querySelector(".answer");
const question = document.querySelector (".question");
const laugh = document.querySelector ("audio");
const volume = document.querySelector (".volume");
const buttons = document.querySelector (".buttons");
const prev = document.querySelector (".prev");
const next = document.querySelector (".next");
const playAnswer = document.querySelector (".playAnswer");
const riddleTypeSelect = document.querySelector (".riddleTypeSelect");
const categoryImage = document.querySelector (".categoryImage");
const numRiddles = document.querySelector (".numRiddles");

/***************************************************************** */
function displayRiddleCategories () {
/***************************************************************** */
  // ALphabetically sort the riddle categories and insert "all" as the
  // 1st category
  riddleCategories = riddleCategories.sort();
  riddleCategories.unshift ("all");
 
  // Update the display with the options for the dropdown menu.
  let categoryStr = "";
  riddleCategories.forEach (category => {
    categoryStr += 
      `<option value="${category}">${category[0].toUpperCase()}${category.substring(1)}</option_value>`;
  });
  riddleTypeSelect.innerHTML = categoryStr;
};

// Show the answer the riddle.
/***************************************************************** */
function showAnswer (answerStr) {
/***************************************************************** */
  // Create an array of letters surrounded by span tags.
  let letters = [];
  letters = answerStr.split ('');
  
  letters = letters.map((letter) => {
    return `<span class="answer-letter">${letter}</span>`;
  });
  
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
        // Play audio if it's turned on
        if (volume.classList.contains ("volumeOn"))
        {
          laugh.play ();
        }
        // Display the playAudio icon for the play answer.
        playAnswer.style.visibility = "visible";
      }
    }, i*75);
  }, 0)
};

/****************************************************************** */
function showQuestion (questionStr) {
/****************************************************************** */
  question.textContent = `${riddleNum+1}. ${questionStr}`;
  // Place a character in the answer string -even though it's hidden.
  // so that the chalkboard stays a fixed size and the height doesn't
  // decrease and increase as the answer disappears.
  answer.textContent = "-";
  answer.style.visiblity = "visible";

  // Hide the playAudio icon for the answer
  playAnswer.style.visibility = "hidden";

  const numRiddlesToDisplay = riddlesToDisplay.length;
  // If it's the 1st riddle in the list, hide the prev button
  if (!riddleNum) {
    prev.style.display = "none";
  }
  // If it the last riddle in the list or there is only 1 riddle, 
  // hide the next button
  if ((numRiddlesToDisplay === 1) || riddleNum === (numRiddlesToDisplay - 1))
  {
    next.style.display = "none";
  }
  else
  {
    next.style.display = "inline-block";
  }

}

/****************************************************************** */
function playText (textToPlay) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = textToPlay;
  window.speechSynthesis.speak(msg);
}
/****************************************************************** */
// Add an event listeners to the playAudio buttons
//playQuestion.addEventListener ('click', () => {
document.querySelectorAll ('.playAudio').forEach(item => {
  item.addEventListener('click', (e) => {
/****************************************************************** */    //handle click
    if (e.target.name ==="playQuestion") {
      playText (riddle.question);
    }
    else {
      playText (riddle.answer);
    }
  });
});

/****************************************************************** */
const fileExists = async (url) => {
/****************************************************************** */
//  Check if a file exists.
const response = await fetch (url);
return (response.status === 200);
/*  The following synchronous function is deprecated.
  let http = new XMLHttpRequest ();
  http.open ('HEAD', url, false);
  http.send ();
  console.log ("status [", http.status, "]");
  return (http.status === 200);
*/
};
/****************************************************************** */
function displayCategoryImage (category)
/****************************************************************** */
{
  // Display the image that corresponds to the selected category.
  // Look for a file name with the category name and either .png or .jpg
  // If no match is found use the default image all.png.
  const fileNamePrefix = `./images/categories/${riddleType}`;
    
  let jpgImageFile = fileNamePrefix + ".jpg";
  let pngImageFile = fileNamePrefix + ".png";
    
  let defaultImageFileName = "./images/categories/all.png";

    // Look for a jpg file
  fileExists (jpgImageFile)
    .then (data => { 
      if (data) {
        categoryImage.src = jpgImageFile;
      }
      else {
        // Since there is no jpg file; look for a png file
        fileExists (pngImageFile)
        .then (data => {
          if (data) {
            categoryImage.src = pngImageFile;
          }
          else {
            categoryImage.src = defaultImageFileName;
          }
        }).catch (err => categoryImage.src = defaultImageFileName);
      };
    }).catch (err => categoryImage.src = defaultImageFileName);
};

/****************************************************************** */
// Add an event listenter to the riddle Selector
riddleTypeSelect.addEventListener ('change', () => {
/****************************************************************** */
    riddleType = riddleTypeSelect.options[riddleTypeSelect.selectedIndex].value;
    // Only display riddles of the specified category.
    // Build a new array of riddles -include only the index numbers in the list
    // Clear the current array of indices by setting the length to 0.
    riddlesToDisplay.length = 0;
    let i = 0;
    riddles.forEach (function (riddle,index) {
      // Check if the current riddle is in the specified category.
      if ((riddleType === "all") || riddleInCategory (index, riddleType))
      {
        riddlesToDisplay [i] = index;
        i++;
      }
    });
   
    // Display the category image
    displayCategoryImage (riddleType);
    
    // Initialize the riddle
    initRiddle();
});

/****************************************************************** */
// Add an event listenter to the volume button
volume.addEventListener ('click', () => {
/****************************************************************** */
  // Toggle the volume image and class
  if (volume.classList.contains ("volumeOn"))
  {
    // Turn off the volume
    volume.classList.remove ("volumeOn");
    volume.classList.add ("volumeOff");
    volume.src = "images/volumeOff.png";
  }
  else {
    // Turn on the volume
    volume.classList.add ("volumeOn");
    volume.classList.remove ("volumeOff");
    volume.src = "images/volumeOn.png";
  }  
});

/****************************************************************** */
// Add an event listenter to the buttons (GiveUp, Next, (Prev)ious)
buttons.addEventListener ('click', (e) => {
/****************************************************************** */
  const button = e.target.getAttribute("name");
      
  switch (button) {
    case "giveUp": 
      // Show the answer
      // Speak the question
      // var msg = new SpeechSynthesisUtterance();
      // msg.text = riddle.question;
      // window.speechSynthesis.speak(msg);
      showAnswer (riddle.answer); 
      break;
    case "prev": 
      // Show the previous riddle.  Hide the answer.
      // Display the next button.
      next.style.display = "inline-block";
      answer.textContent="";
      riddle = getRiddle (0);
      showQuestion (riddle.question);
      break;
    case "next":  
      // Show the next riddle.  Hide the answer.
      // Once the next button is hit; display the previous button.
      prev.style.display = "inline-block";
      answer.textContent="";
      riddle = getRiddle (1);
      showQuestion (riddle.question);
      break;
  };
});