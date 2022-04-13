// container questions
var containerQuestionsEl = document.getElementById('question-container');
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById('end-container')
var containerScoreEl = document.getElementById('score-banner')
var formInitials = document.getElementById('initials-forms')
var containerHighScoresEl = document.getElementById('high-score-container')
var ViewHighScoreEl = document.getElementById('view-high-score')
var listHighScoreEl = document.getElementById('high-score-list')
var correctEl = document.getElementById('correct')
var wrongEl = document.getElementById('wrong')

// buttons
var btnStartEl = document.querySelector('#start-game');
var btnGoBackEl = document.querySelector('#go-back')
var btnClearScoreEl = document.querySelector('#clear-high-scores')

// question, answers element
var questionEl = document.getElementById('question')
var answerbuttonsEl = document.getElementById('answer-buttons')
var timerEl = document.querySelector('#timer');
var score = 0;
var timeleft; 
var gameover
timerEl.innerText = 0;

// score array
var HighScores = [];

//assign array details for questions
var arrayShuffledQuestions
var QuestionIndex = 0

// Array for quiz questions
var questions = [
  { q:'What does var stand for in javascript?',
    a: '2.variables',
    choices:[{choice:'1.valuables'}, {choice: '2.variables'}, {choice: '3. videos'}]
  },
  { q: 'What do you need after every line in Javascript?',
    a: '1.semi-colon;',
    choices:[{choice:'1.semi-colon;'}, {choice: '2.smiley-face :-)'}, {choice: '3.period.'}]
  },
  { q: 'Which of the following is not an Javascript object?',
    a: '4.Bodies',
    choices: [{choice:'1.booleans'},{choice:'2.numbers'}, {choice:'3.arrays'}, {choice:'4.bodies'}]
  },
  { q: 'Does a website save data in localStorage?',
    a: '1.yes',
    choices:[{choice:'1.yes'}, {choice:'2.no'},]
  },
];

// if go back button hit on high score page
var renderStartPage = function () {
  containerHighScoresEl.classList.add('hide')
  containerHighScoresEl.classList.remove('show')
  containerStartEl.classList.remove('hide')
  containerStartEl.classList.add('show')
  containerScoreEl.removeChild(containerScoreEl.lastChild)
  QuestionIndex = 0
  gameover = ''
  timerEl.textContent = 0
  score = 0

  if (correctEl.className = 'show'){
      correctEl.classList.remove('show');
      correctEl.classList.add('hide');
  }
  if (wrongEl.className = "show") {
      wrongEl.classList.remove('show');
      wrongEl.classList.add('hide');
  }
}

// timer for game. Starts at 30
var setTime = function () {
  timeleft = 30;

  var timercheck = setInterval(function(){
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover){
      clearInterval(timercheck)
    }
    if(timeleft<0){
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
    }
  },1000)
}

var startGame = function(){
  //show and hide start and quiz screen
  containerStartEl.classList.add("hide");
  containerStartEl.classList.remove("show");
  containerQuestionsEl.classList.remove("hide");
  containerQuestionsEl.classList.add("show");

  //shuffle questions
  arrayShuffledQuestions = questions.sort(()=> Math.random() - 0.5)
  setTime()
  setQuestion()
}
// set question for quiz
var setQuestion = function() {
    resetAnswers ()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}
//remove answer buttons
var resetAnswers = function() {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
};

//display questions
var displayQuestion = function(index){
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement("button")
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener('click', answerCheck)
    answerbuttonsEl.appendChild(answerbutton)

  }
};

// display YES!! Correct on screen
var answerCorrect = function () {
  if (correctEl.className = 'hide') {
    correctEl.classList.remove('hide')
    correctEl.classList.add('banner')
    wrongEl.classList.remove('banner')
    wrongEl.classList.add('hide')
  }
}

// display NO!!! Wrong on screen
var answerWrong = function() {
  if (wrongEl.className = 'hide') {
    wrongEl.classList.remove('hide')
    wrongEl.classList.add('banner')
    correctEl.classList.remove('banner')
    correctEl.classList.add('hide')
  }
}

// check if answer is correct
var answerCheck = function(event) {
  var selectedanswer = event.target
    if(arrayShuffledQuestions[QuestionIndex].a == selectedanswer.innerText){
      answerCorrect()
      score = score + 7
    }
    else{ 
      answerWrong ()
      score = score - 1;
      timeleft = timeleft - 3;

    };
    // go to next question if there are more questions left
    QuestionIndex++
    if (arrayShuffledQuestions.length > QuestionIndex + 1){
      setQuestion()
    }
    else{
      gameover = 'true';
      showScore();
    }
}

// display final score at end of game
var showScore = function() {
  containerQuestionsEl.classList.add('hide');
  containerEndEl.classList.remove('hide');
  containerEndEl.classList.add('show');

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("your final score is" + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}

// high score values
var createHighScore = function(event) {
  event.preventDefault()
  var initials = document.querySelector('#initials').value;
  if (!initials) {
    alert("Enter your initials!");
    return;
  }
  formInitials.reset();

  var HighScore = {
    initials: initials,
    score: score
  }
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});

//clear visible list to resort
while (listHighScoreEl.firstChild) {
   listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
  var highscoreEl = document.createElement("li");
  highscoreEl.ClassName = "high-score";
  highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
  listHighScoreEl.appendChild(highscoreEl);
}

  saveHighScore();
  displayHighScores();
}
// save scores
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
}
//load values/scores
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
  if (!LoadedHighScores){
    return false;
  }
  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a,b)=> {return b.score-a.score})

  for (var i= 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.innerText = LoadedHighScores[i]. initials + " - " + LoadedHighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);
  }
}
var displayHighScores = function() {

  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameover = "true"

  if (containerEndEl.className = "show") {
    containerEndEl.classList.remove("show");
    containerEndEl.classList.add("hide");
  }
  if (containerStartEl.className = "show") {
    containerStartEl.classList.remove("show");
    containerStartEl.classList.add("hide");
    }
    
if (containerQuestionEl.className = "show") {
    containerQuestionEl.classList.remove("show");
    containerQuestionEl.classList.add("hide");
    }

if (correctEl.className = "show") {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
}

if (wrongEl.className = "show") {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
    }
}
// clear scores
var clearScores = function () {
  HighScores = [];

  while(listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
  localStorage.clear(HighScores);
}

loadHighScore()

// start click start game
btnStartEl.addEventListener("click", startGame)
// submit button 
formInitials.addEventListener("submit", createHighScore)
// view high scores when clicked
ViewHighScoreEl.addEventListener("click", displayHighScores)
//back
btnGoBackEl.addEventListener("click", renderStartPage)
// clear scores btn
btnClearScoreEl.addEventListener("click", clearScores)
