import mongoose from "mongoose";
import dotenv from "dotenv";
import QuizSet from "../models/QuizSet.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/quiz-app";

// Sample quiz data generator
const generateQuizSets = () => {
  const categories = [
    "Movies",
    "Music",
    "Technology",
    "Medicine",
    "History",
    "Science",
    "Sports",
    "Geography",
    "Literature",
    "General Knowledge",
  ];
  const quizSets = [];

  const sampleQuestions = {
    Movies: [
      {
        questionText: "Who directed the movie 'Inception'?",
        questionType: "mcq",
        options: [
          "Christopher Nolan",
          "Steven Spielberg",
          "James Cameron",
          "Quentin Tarantino",
        ],
        correctAnswer: "Christopher Nolan",
        points: 10,
      },
      {
        questionText: "The Titanic won 11 Academy Awards.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The main character in 'The Matrix' is named ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Neo",
        points: 10,
      },
      {
        questionText: "Which of these movies won Best Picture at the Oscars?",
        questionType: "select-all",
        options: [
          "Parasite",
          "Joker",
          "The Shape of Water",
          "1917",
          "La La Land",
          "Moonlight",
        ],
        correctAnswer: ["Parasite", "The Shape of Water", "Moonlight"],
        points: 10,
      },
      {
        questionText:
          "Which actor played Iron Man in the Marvel Cinematic Universe?",
        questionType: "mcq",
        options: [
          "Chris Evans",
          "Robert Downey Jr.",
          "Chris Hemsworth",
          "Mark Ruffalo",
        ],
        correctAnswer: "Robert Downey Jr.",
        points: 10,
      },
      {
        questionText:
          "The movie 'Avatar' is the highest-grossing film of all time.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The director of 'The Godfather' is Francis Ford ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Coppola",
        points: 10,
      },
      {
        questionText: "Who played Jack Dawson in 'Titanic'?",
        questionType: "mcq",
        options: [
          "Brad Pitt",
          "Leonardo DiCaprio",
          "Tom Cruise",
          "Johnny Depp",
        ],
        correctAnswer: "Leonardo DiCaprio",
        points: 10,
      },
      {
        questionText:
          "The Lord of the Rings trilogy was filmed in New Zealand.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The first Star Wars movie was released in ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "1977",
        points: 10,
      },
    ],
    Music: [
      {
        questionText: "Which band released the album 'Abbey Road'?",
        questionType: "mcq",
        options: [
          "The Beatles",
          "The Rolling Stones",
          "Pink Floyd",
          "Led Zeppelin",
        ],
        correctAnswer: "The Beatles",
        points: 10,
      },
      {
        questionText: "Mozart was a composer from the Romantic era.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 10,
      },
      {
        questionText: "Michael Jackson was known as the King of ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Pop",
        points: 10,
      },
      {
        questionText: "Which of these artists have won a Grammy Award?",
        questionType: "select-all",
        options: [
          "Taylor Swift",
          "Ed Sheeran",
          "Adele",
          "Billie Eilish",
          "All of them",
        ],
        correctAnswer: ["Taylor Swift", "Ed Sheeran", "Adele", "Billie Eilish"],
        points: 10,
      },
      {
        questionText: "Who is known as the 'Queen of Pop'?",
        questionType: "mcq",
        options: ["Madonna", "Whitney Houston", "Mariah Carey", "Celine Dion"],
        correctAnswer: "Madonna",
        points: 10,
      },
      {
        questionText:
          "Beethoven was completely deaf when he composed his 9th Symphony.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "Elvis Presley was born in the state of ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Mississippi",
        points: 10,
      },
      {
        questionText: "Which instrument has 88 keys?",
        questionType: "mcq",
        options: ["Guitar", "Piano", "Violin", "Drums"],
        correctAnswer: "Piano",
        points: 10,
      },
      {
        questionText: "The band Queen's lead singer was Freddie Mercury.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText:
          "The famous music festival held in 1969 was called ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Woodstock",
        points: 10,
      },
    ],
    Technology: [
      {
        questionText: "What does HTML stand for?",
        questionType: "mcq",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
        points: 10,
      },
      {
        questionText: "JavaScript and Java are the same programming language.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 10,
      },
      {
        questionText: "The founder of Microsoft is ______ Gates.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Bill",
        points: 10,
      },
      {
        questionText: "Which of the following are programming languages?",
        questionType: "select-all",
        options: ["Python", "HTML", "JavaScript", "CSS", "Java", "Photoshop"],
        correctAnswer: ["Python", "JavaScript", "Java"],
        points: 10,
      },
      {
        questionText: "Who is the founder of Apple Inc.?",
        questionType: "mcq",
        options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
        correctAnswer: "Steve Jobs",
        points: 10,
      },
      {
        questionText: "The first computer virus was created in 1986.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText:
          "The programming language created by Guido van Rossum is ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Python",
        points: 10,
      },
      {
        questionText: "What does CPU stand for?",
        questionType: "mcq",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Utility",
          "Computer Processing Utility",
        ],
        correctAnswer: "Central Processing Unit",
        points: 10,
      },
      {
        questionText: "Linux is an open-source operating system.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText:
          "The 'www' in a website URL stands for World Wide ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Web",
        points: 10,
      },
    ],
    Medicine: [
      {
        questionText: "What is the largest organ in the human body?",
        questionType: "mcq",
        options: ["Skin", "Liver", "Heart", "Brain"],
        correctAnswer: "Skin",
        points: 10,
      },
      {
        questionText: "Antibiotics are effective against viral infections.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 10,
      },
      {
        questionText: "The study of bones is called ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Osteology",
        points: 10,
      },
      {
        questionText: "Which of these are types of blood cells?",
        questionType: "select-all",
        options: [
          "Red blood cells",
          "White blood cells",
          "Platelets",
          "Neurons",
          "Muscle cells",
        ],
        correctAnswer: ["Red blood cells", "White blood cells", "Platelets"],
        points: 10,
      },
      {
        questionText: "How many bones are in the adult human body?",
        questionType: "mcq",
        options: ["186", "206", "226", "246"],
        correctAnswer: "206",
        points: 10,
      },
      {
        questionText: "The human heart has four chambers.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The medical term for high blood pressure is ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Hypertension",
        points: 10,
      },
      {
        questionText:
          "Which vitamin is produced when skin is exposed to sunlight?",
        questionType: "mcq",
        options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        correctAnswer: "Vitamin D",
        points: 10,
      },
      {
        questionText: "DNA stands for Deoxyribonucleic Acid.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The powerhouse of the cell is the ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Mitochondria",
        points: 10,
      },
    ],
    History: [
      {
        questionText: "In which year did World War II end?",
        questionType: "mcq",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945",
        points: 10,
      },
      {
        questionText: "The Great Wall of China was built in one century.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 10,
      },
      {
        questionText: "Julius Caesar was assassinated in the month of ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "March",
        points: 10,
      },
      {
        questionText: "Which of these were ancient civilizations?",
        questionType: "select-all",
        options: [
          "Egyptian",
          "Roman",
          "Mayan",
          "American",
          "Greek",
          "Canadian",
        ],
        correctAnswer: ["Egyptian", "Roman", "Mayan", "Greek"],
        points: 10,
      },
      {
        questionText: "Who was the first President of the United States?",
        questionType: "mcq",
        options: [
          "Thomas Jefferson",
          "George Washington",
          "Abraham Lincoln",
          "John Adams",
        ],
        correctAnswer: "George Washington",
        points: 10,
      },
      {
        questionText: "The French Revolution began in 1789.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The first man to walk on the moon was Neil ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Armstrong",
        points: 10,
      },
      {
        questionText: "Which empire built Machu Picchu?",
        questionType: "mcq",
        options: ["Aztec", "Inca", "Maya", "Roman"],
        correctAnswer: "Inca",
        points: 10,
      },
      {
        questionText: "The Berlin Wall fell in 1989.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText:
          "Christopher Columbus sailed to the Americas in the year ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "1492",
        points: 10,
      },
    ],
    Science: [
      {
        questionText: "What is the chemical symbol for gold?",
        questionType: "mcq",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au",
        points: 10,
      },
      {
        questionText: "Light travels faster than sound.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The center of an atom is called the ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Nucleus",
        points: 10,
      },
      {
        questionText: "Which of these are states of matter?",
        questionType: "select-all",
        options: ["Solid", "Liquid", "Gas", "Energy", "Plasma", "Force"],
        correctAnswer: ["Solid", "Liquid", "Gas", "Plasma"],
        points: 10,
      },
      {
        questionText: "What is the speed of light?",
        questionType: "mcq",
        options: [
          "299,792 km/s",
          "150,000 km/s",
          "500,000 km/s",
          "1,000,000 km/s",
        ],
        correctAnswer: "299,792 km/s",
        points: 10,
      },
      {
        questionText: "Water boils at 100 degrees Celsius at sea level.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The formula for water is ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "H2O",
        points: 10,
      },
      {
        questionText: "How many planets are in our solar system?",
        questionType: "mcq",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8",
        points: 10,
      },
      {
        questionText:
          "Oxygen is the most abundant element in Earth's atmosphere.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 10,
      },
      {
        questionText: "The study of plants is called ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Botany",
        points: 10,
      },
    ],
    Sports: [
      {
        questionText: "How many players are on a soccer team?",
        questionType: "mcq",
        options: ["9", "10", "11", "12"],
        correctAnswer: "11",
        points: 10,
      },
      {
        questionText: "The Olympics are held every 4 years.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "A perfect score in bowling is ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "300",
        points: 10,
      },
      {
        questionText: "Which of these sports use a ball?",
        questionType: "select-all",
        options: [
          "Basketball",
          "Tennis",
          "Swimming",
          "Football",
          "Golf",
          "Skiing",
        ],
        correctAnswer: ["Basketball", "Tennis", "Football", "Golf"],
        points: 10,
      },
      {
        questionText: "In which sport is the term 'home run' used?",
        questionType: "mcq",
        options: ["Basketball", "Baseball", "Cricket", "Football"],
        correctAnswer: "Baseball",
        points: 10,
      },
      {
        questionText: "A marathon is 26.2 miles long.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText:
          "The Wimbledon tennis tournament is played on ______ courts.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Grass",
        points: 10,
      },
      {
        questionText:
          "How many points is a touchdown worth in American football?",
        questionType: "mcq",
        options: ["3", "6", "7", "10"],
        correctAnswer: "6",
        points: 10,
      },
      {
        questionText: "Michael Jordan played for the Chicago Bulls.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The sport of hockey is played on ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Ice",
        points: 10,
      },
    ],
    Geography: [
      {
        questionText: "What is the capital of France?",
        questionType: "mcq",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
        points: 10,
      },
      {
        questionText: "Australia is both a country and a continent.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The longest river in the world is the ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Nile",
        points: 10,
      },
      {
        questionText: "Which of these countries are in Asia?",
        questionType: "select-all",
        options: ["Japan", "Brazil", "India", "Egypt", "China", "Australia"],
        correctAnswer: ["Japan", "India", "China"],
        points: 10,
      },
      {
        questionText: "What is the largest ocean on Earth?",
        questionType: "mcq",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific",
        points: 10,
      },
      {
        questionText: "Mount Everest is the tallest mountain in the world.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The capital of Japan is ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Tokyo",
        points: 10,
      },
      {
        questionText: "Which desert is the largest in the world?",
        questionType: "mcq",
        options: ["Gobi", "Sahara", "Arabian", "Antarctic"],
        correctAnswer: "Antarctic",
        points: 10,
      },
      {
        questionText: "The Amazon Rainforest is located in South America.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText:
          "The Great Barrier Reef is located off the coast of ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Australia",
        points: 10,
      },
    ],
    Literature: [
      {
        questionText: "Who wrote 'Romeo and Juliet'?",
        questionType: "mcq",
        options: [
          "Charles Dickens",
          "William Shakespeare",
          "Jane Austen",
          "Mark Twain",
        ],
        correctAnswer: "William Shakespeare",
        points: 10,
      },
      {
        questionText: "'1984' was written by George Orwell.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The author of 'Harry Potter' is J.K. ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Rowling",
        points: 10,
      },
      {
        questionText: "Which of these are Shakespeare plays?",
        questionType: "select-all",
        options: [
          "Hamlet",
          "Pride and Prejudice",
          "Macbeth",
          "1984",
          "Othello",
          "The Odyssey",
        ],
        correctAnswer: ["Hamlet", "Macbeth", "Othello"],
        points: 10,
      },
      {
        questionText: "Who wrote 'To Kill a Mockingbird'?",
        questionType: "mcq",
        options: [
          "Harper Lee",
          "Ernest Hemingway",
          "F. Scott Fitzgerald",
          "John Steinbeck",
        ],
        correctAnswer: "Harper Lee",
        points: 10,
      },
      {
        questionText: "The novel 'Moby Dick' is about a white whale.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The epic poem 'The Iliad' was written by ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Homer",
        points: 10,
      },
      {
        questionText: "In which century did Shakespeare live?",
        questionType: "mcq",
        options: ["14th", "15th", "16th", "17th"],
        correctAnswer: "16th",
        points: 10,
      },
      {
        questionText: "The Brothers Grimm collected and published fairy tales.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The author of 'The Great Gatsby' is F. Scott ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Fitzgerald",
        points: 10,
      },
    ],
    "General Knowledge": [
      {
        questionText: "How many continents are there?",
        questionType: "mcq",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
        points: 10,
      },
      {
        questionText: "The Eiffel Tower is located in Paris.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The currency of Japan is the ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Yen",
        points: 10,
      },
      {
        questionText: "Which of these are primary colors?",
        questionType: "select-all",
        options: ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"],
        correctAnswer: ["Red", "Blue", "Yellow"],
        points: 10,
      },
      {
        questionText: "How many days are in a leap year?",
        questionType: "mcq",
        options: ["364", "365", "366", "367"],
        correctAnswer: "366",
        points: 10,
      },
      {
        questionText: "The United Nations was founded in 1945.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The statue of Liberty was a gift from ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "France",
        points: 10,
      },
      {
        questionText: "What is the largest country by land area?",
        questionType: "mcq",
        options: ["Canada", "China", "United States", "Russia"],
        correctAnswer: "Russia",
        points: 10,
      },
      {
        questionText: "Diamonds are made of carbon.",
        questionType: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 10,
      },
      {
        questionText: "The tallest building in the world is the Burj ______.",
        questionType: "fill-blank",
        options: [],
        correctAnswer: "Khalifa",
        points: 10,
      },
    ],
  };

  // Generate 100 sets for each category
  categories.forEach((category) => {
    for (let setNum = 1; setNum <= 100; setNum++) {
      const questions = [];
      const baseQuestions =
        sampleQuestions[category] || sampleQuestions["General Knowledge"];

      // Each set now has exactly 10 unique questions without repetition
      baseQuestions.forEach((baseQuestion) => {
        const question = {
          ...baseQuestion,
          questionText: baseQuestion.questionText.replace(/\[Set \d+\] /, ""), // Remove any existing set prefix
        };
        questions.push(question);
      });

      quizSets.push({
        category,
        setNumber: setNum,
        questions,
        difficulty: setNum <= 33 ? "Easy" : setNum <= 66 ? "Medium" : "Hard",
      });
    }
  });

  return quizSets;
};

// Seed the database
const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await QuizSet.deleteMany({});
    console.log("🗑️  Cleared existing quiz sets");

    // Generate and insert quiz sets
    const quizSets = generateQuizSets();
    await QuizSet.insertMany(quizSets);

    console.log(`✅ Successfully seeded ${quizSets.length} quiz sets!`);
    console.log(
      "📊 Categories:",
      quizSets.map((s) => s.category).filter((v, i, a) => a.indexOf(v) === i)
    );

    await mongoose.connection.close();
    console.log("👋 Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
