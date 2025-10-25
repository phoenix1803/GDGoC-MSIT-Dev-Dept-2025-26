import express from "express"
import bodyParser from "body-parser"

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

const quizData = [
  {
    "id": 1,
    "question": "What is the capital city of Japan?",
    "options": {
      "a": "Seoul",
      "b": "Beijing",
      "c": "Tokyo",
      "d": "Bangkok"
    },
    "answer": "c"
  },
  {
    "id": 2,
    "question": "What is the largest land animal?",
    "options": {
      "a": "Giraffe",
      "b": "African Elephant",
      "c": "Blue Whale",
      "d": "Rhinoceros"
    },
    "answer": "b"
  },
  {
    "id": 3,
    "question": "Which gas do plants primarily absorb from the atmosphere for photosynthesis?",
    "options": {
      "a": "Oxygen",
      "b": "Nitrogen",
      "c": "Carbon Dioxide",
      "d": "Methane"
    },
    "answer": "c"
  },
  {
    "id": 4,
    "question": "Who painted the Mona Lisa?",
    "options": {
      "a": "Vincent van Gogh",
      "b": "Pablo Picasso",
      "c": "Leonardo da Vinci",
      "d": "Claude Monet"
    },
    "answer": "c"
  },
  {
    "id": 5,
    "question": "What is the square root of 64?",
    "options": {
      "a": "6",
      "b": "7",
      "c": "8",
      "d": "9"
    },
    "answer": "c"
  },
  {
    "id": 6,
    "question": "In which country is the Great Barrier Reef located?",
    "options": {
      "a": "Brazil",
      "b": "Australia",
      "c": "Mexico",
      "d": "South Africa"
    },
    "answer": "b"
  },
  {
    "id": 7,
    "question": "What is the currency of the United Kingdom?",
    "options": {
      "a": "Euro",
      "b": "Dollar",
      "c": "Yen",
      "d": "Pound Sterling"
    },
    "answer": "d"
  },
  {
    "id": 8,
    "question": "What is the freezing point of water in Celsius?",
    "options": {
      "a": "100 °C",
      "b": "0 °C",
      "c": "32 °C",
      "d": "-10 °C"
    },
    "answer": "b"
  },
  {
    "id": 9,
    "question": "Which famous scientist developed the theory of relativity?",
    "options": {
      "a": "Isaac Newton",
      "b": "Galileo Galilei",
      "c": "Albert Einstein",
      "d": "Nikola Tesla"
    },
    "answer": "c"
  },
  {
    "id": 10,
    "question": "The study of earthquakes is called:",
    "options": {
      "a": "Geology",
      "b": "Seismology",
      "c": "Meteorology",
      "d": "Ecology"
    },
    "answer": "b"
  }
];

let score = 0;
let questionNumber = 0;

app.get("/", (req, res)=>{
    res.render("index.ejs", {question: quizData[questionNumber]})
})

app.post("/", (req, res)=>{
    const userAnswer = req.body.userAnswer;
    const currentQuestion = quizData[questionNumber];

    if (userAnswer === currentQuestion.answer) {
        score++;
        console.log("Correct! Current Score:", score);
    } else {
        console.log("Incorrect. Current Score:", score);
    }
    questionNumber++;
    if (questionNumber < quizData.length) {
        res.render("index.ejs", { question: quizData[questionNumber] });
    } else {
        res.render("score.ejs", { finalScore: score, totalQuestions: quizData.length });
        questionNumber = 0;
        score = 0;
    }
});

app.post("/reset",(req, res)=>{
    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`Server Running on Por: ${PORT}`)
})