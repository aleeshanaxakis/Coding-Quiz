var startQuiz = document.querySelector(".start-quiz");
var timerDisplay = document.getElementById("timer");
var questionContainer = document.getElementById("container");
var questionElement = document.getElementById("question");
var answerButtons = document.querySelectorAll(".answer-choice");
var timerInterval;
var secondsLeft = 75;

var currentQuestionIndex = 0; // To keep track of the current question

// Create an array of questions and their corresponding answers
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "3. parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"],
        correctAnswer: "4. console log"
    }
];

// Start the timer countdown when the user clicks Start Quiz
function updateTimerDisplay() {
    var minutes = Math.floor(secondsLeft / 60);
    var remainingSeconds = secondsLeft % 60;
    var formattedTime = (secondsLeft < 10 ? "00:0" : "00:") + secondsLeft;
    timerDisplay.textContent = formattedTime;
}

startQuiz.addEventListener("click", function () {
    // Disable the Start Quiz button to prevent multiple clicks
    startQuiz.disabled = true;

    // Update the initial timer display
    updateTimerDisplay();

    // Start the countdown timer
    timerInterval = setInterval(function () {
        secondsLeft--;

        if (secondsLeft <= 0) {
            // Stop the timer when it reaches 0
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            alert("Time's up!");
        
            var userInitials = document.getElementById("initials").ariaValueMax;
            var userScore = secondsLeft;

            var userData = {
                initials: userInitials,
                score: userScore
            };

            var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highScores.push(userData);
            highScores.sort(function (a,b) {
                return b.score - a.score;
            });

            highScores = highScores.slice(0, 10);

            localStorage.setItem("highScores", JSON.stringify(highScores));

        } else {
            // Update the timer display
            updateTimerDisplay();
        }
    }, 1000);

// Display the first question when the user clicks Start Quiz
displayQuestion();
});

// Check if the answer is correct
answerButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        var userAnswer = questions[currentQuestionIndex].answers[index];
        var correctAnswer = questions[currentQuestionIndex].correctAnswer;

// If the answer is correct, proceed to the next question
// If the answer is incorrect, penalise their time by deducting 10 seconds
        if (userAnswer === correctAnswer) {
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                clearInterval(timerInterval);
                timerDisplay.textContent = "00:00";
                alert ("Congratulations! You've completed the quiz.");
            }
        } else {
            secondsLeft -= 10;
            if (secondsLeft < 0) {
                secondsLeft = 0;
            }
            updateTimerDisplay();
        }
    });
});

function updateTimerDisplay() {
    var formattedTime = (secondsLeft < 10 ? "00:0" : "00:") + secondsLeft;
    timerDisplay.textContent = formattedTime;
}

function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Populate answer buttons with answer choices
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = currentQuestion.answers[i];
    }
}

// Allow user to navigate to high score page
var viewHighscoresButton = document.querySelector(".view-highscores");
viewHighscoresButton.addEventListener("click", function () {
    window.location.href = "highscores.html";
});