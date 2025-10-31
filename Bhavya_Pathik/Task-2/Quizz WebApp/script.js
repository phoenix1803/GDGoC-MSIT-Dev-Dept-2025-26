const startScreen = document.getElementById('startscreen');
const quizScreen = document.getElementById('quizscreen');
const resultScreen = document.getElementById('resultscreen');
const startBtn = document.getElementById('startbtn');
const nextBtn = document.getElementById('nextbtn');
const restartBtn = document.getElementById('restartbtn');

const questionText = document.getElementById('questiontext');
const optionsContainer = document.getElementById('optionscontainer');
const questionCount = document.getElementsByClassName('.questioncount');
const scoreText = document.getElementById('scoretext');

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Text Makeup Language"
    ],
    correctIndex: 2
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python", "PHP"],
    correctIndex: 1
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Vue", "Angular", "Django"],
    correctIndex: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets"
    ],
    correctIndex: 2
  },
  {
    question: "Which tag is used to link an external CSS file?",
    options: ["<script>", "<link>", "<style>", "<css>"],
    correctIndex: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
  startScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.textContent = optionText;
    button.classList.add('optionbtn');
    button.addEventListener('click', () => selectAnswer(button, index));
    optionsContainer.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  optionsContainer.innerHTML = '';
}

function selectAnswer(selectedBtn, index) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.correctIndex;
  const allButtons = optionsContainer.querySelectorAll('button');

  allButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add('correct');
    if (i === index && i !== correctIndex) btn.classList.add('incorrect');
  });

  if (index === correctIndex) score++;
  nextBtn.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hide');
  resultScreen.classList.remove('hide');
  const percentage = ((score / questions.length) * 100).toFixed(1);
  scoreText.textContent = `You scored ${score} out of ${questions.length} (${percentage}%)`;
}

function restartQuiz() {
  resultScreen.classList.add('hide');
  startScreen.classList.remove('hide');
}
