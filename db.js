const riddles = [
  {question: "Why did the chicken cross the road?",
  answer: "To get to the other side!"},
  {question: "Why did the Chicken cross the road?",
  answer: "To practice social distancing!"},
  {question: "Why did the horse cross the road?",
  answer: "To get to the other NEIGH-bourhood!"}
];
let riddleNum = -1;

function getRiddle () {

  //  riddles.forEach ((riddle, i) => {
  //  console.log (`riddle [${i}] ${riddle.question}: ${riddle.answer}`);
  //}, 0);
  ++riddleNum;
  if (riddleNum === riddles.length)
  {
    riddleNum = 0;
  }
  return (riddles [riddleNum]);
}