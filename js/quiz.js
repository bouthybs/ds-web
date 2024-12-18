const questions = [
  {
    question: "What is Goku's Saiyan form called?",
    options: ["Ultra Instinct", "Super Saiyan", "Kaio-ken"],
    answer: "Super Saiyan",
    imageSrc: "https://via.placeholder.com/600x300?text=Goku+Super+Saiyan"
  },
  {
    question: "What is the formula for kinetic energy?",
    options: ["mv", "1/2 mv^2", "ma"],
    answer: "1/2 mv^2",
    imageSrc: "https://via.placeholder.com/600x300?text=Kinetic+Energy+Formula"
  },
  {
    question: "Which anime features a Shinigami?",
    options: ["Naruto", "Death Note", "Bleach"],
    answer: "Death Note",
    imageSrc: "https://via.placeholder.com/600x300?text=Death+Note+Shinigami"
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s"],
    answer: "300,000 km/s",
    imageSrc: "https://via.placeholder.com/600x300?text=Speed+of+Light"
  },
  {
    question: "Who created One Piece?",
    options: ["Eiichiro Oda", "Masashi Kishimoto", "Hajime Isayama"],
    answer: "Eiichiro Oda",
    imageSrc: "https://via.placeholder.com/600x300?text=One+Piece+Creator"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2"],
    answer: "H2O",
    imageSrc: "https://via.placeholder.com/600x300?text=Chemical+Formula+for+Water"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    imageSrc: "https://via.placeholder.com/600x300?text=Red+Planet"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe"],
    answer: "Blue Whale",
    imageSrc: "https://via.placeholder.com/600x300?text=Largest+Mammal"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen"],
    answer: "William Shakespeare",
    imageSrc: "https://via.placeholder.com/600x300?text=Romeo+and+Juliet+Author"
  },
  {
    question: "What is the capital city of France?",
    options: ["Paris", "London", "Berlin"],
    answer: "Paris",
    imageSrc: "https://via.placeholder.com/600x300?text=Capital+of+France"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Récupération des éléments par ID
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const scoreModal = document.getElementById("score-modal");
const scoreFeedback = document.getElementById("score-feedback");
const correctAnswersList = document.getElementById("correct-answers-list");
const restartBtn = document.getElementById("restart-btn");
const answerGrid = document.getElementById("answer-grid");
const quizImage = document.getElementById("quiz-image");
const progressBar = document.getElementById("progress-bar");

// Fonction pour afficher une question
function showQuestion(index) {
  const question = questions[index];

  quizImage.src = question.imageSrc;
  questionContainer.innerHTML = `<h2>${index + 1}. ${question.question}</h2>`;

  // Créer les options
  answerGrid.innerHTML = question.options
    .map((option, i) => {
      return `<label>
                <input type="radio" id="option${i}" name="answer" value="${option}">
                ${option}
              </label>`;
    })
    .join("");
}

// Mettre à jour la barre de progression
function updateProgressBar() {
  const progress = ((currentQuestionIndex / questions.length) * 100).toFixed(0);
  progressBar.style.width = `${progress}%`;
}

// Afficher le score final
function showScore() {
  const percentage = ((score / questions.length) * 100).toFixed(0);
  document.getElementById("score-display").innerText = `${percentage}%`;

  if (percentage >= 80) {
    scoreFeedback.innerText = "Excellent work! 🎉";
    scoreFeedback.style.color = "#4caf50";
  } else if (percentage >= 50) {
    scoreFeedback.innerText = "Good job, but you can do better! 👍";
    scoreFeedback.style.color = "#ffc107";
  } else {
    scoreFeedback.innerText = "Keep practicing! 💪";
    scoreFeedback.style.color = "#f44336";
  }

  correctAnswersList.innerHTML = questions
    .map((q, i) => `<li>${i + 1}. ${q.question} - <b>Correct Answer:</b> ${q.answer}</li>`)
    .join("");

  scoreModal.style.display = "flex";
}

// Redémarrer le quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  scoreModal.style.display = "none";
  showQuestion(currentQuestionIndex);
  updateProgressBar();
}

// Bouton Suivant
nextBtn.addEventListener("click", () => {
  const answers = document.getElementsByName("answer");
  let selectedAnswer = null;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      selectedAnswer = answers[i].value;
      break;
    }
  }

  if (selectedAnswer) {
    userAnswers.push(selectedAnswer);
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      score++;
    }
    currentQuestionIndex++;
    updateProgressBar();

    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showScore();
    }
  } else {
    alert("Please select an answer!");
  }
});

// Bouton Redémarrer
restartBtn.addEventListener("click", restartQuiz);

// Initialiser le quiz
showQuestion(currentQuestionIndex);
updateProgressBar();
