const questions = [
    {
        question: "Would you rather...",
        option1: "Have the ability to fly",
        option2: "Have the ability to become invisible"
    },
    {
        question: "Would you rather...",
        option1: "Always be 10 minutes late",
        option2: "Always be 20 minutes early"
    },
    {
        question: "Would you rather...",
        option1: "Have unlimited pizza for life",
        option2: "Have unlimited tacos for life"
    },
    {
        question: "Would you rather...",
        option1: "Live in a world without music",
        option2: "Live in a world without movies"
    },
    {
        question: "Would you rather...",
        option1: "Be able to speak all languages",
        option2: "Be able to talk to animals"
    },
    {
        question: "Would you rather...",
        option1: "Travel to the past",
        option2: "Travel to the future"
    },
    {
        question: "Would you rather...",
        option1: "Have super strength",
        option2: "Have super speed"
    },
    {
        question: "Would you rather...",
        option1: "Never have to sleep",
        option2: "Never have to eat"
    },
    {
        question: "Would you rather...",
        option1: "Live on the beach",
        option2: "Live in the mountains"
    },
    {
        question: "Would you rather...",
        option1: "Read minds",
        option2: "See the future"
    },

    {
        question: "Would you rather...",
        option1: "Have the ability to teleport anywhere",
        option2: "Have the ability to read minds"
    },
    {
        question: "Would you rather...",
        option1: "Live without internet for a year",
        option2: "Live without your phone for a year"
    },
    {
        question: "Would you rather...",
        option1: "Always have to sing instead of speak",
        option2: "Always have to dance everywhere you go"
    },
    {
        question: "Would you rather...",
        option1: "Be able to control fire",
        option2: "Be able to control water"
    },
    {
        question: "Would you rather...",
        option1: "Have a rewind button for your life",
        option2: "Have a pause button for your life"
    },
    {
        question: "Would you rather...",
        option1: "Always be too hot",
        option2: "Always be too cold"
    },
    {
        question: "Would you rather...",
        option1: "Have unlimited money",
        option2: "Have unlimited free time"
    },
    {
        question: "Would you rather...",
        option1: "Be famous on social media",
        option2: "Be famous in real life"
    },
    {
        question: "Would you rather...",
        option1: "Live in a world of permanent daylight",
        option2: "Live in a world of permanent nighttime"
    },
    {
        question: "Would you rather...",
        option1: "Have a personal chef",
        option2: "Have a personal driver"
    },
    {
        question: "Would you rather...",
        option1: "Be able to breathe underwater",
        option2: "Be able to survive in space"
    },
    {
        question: "Would you rather...",
        option1: "Have the ability to time travel",
        option2: "Have the ability to shapeshift"
    },
    {
        question: "Would you rather...",
        option1: "Live in a mansion in the city",
        option2: "Live in a cozy cabin in the woods"
    },
    {
        question: "Would you rather...",
        option1: "Have a photographic memory",
        option2: "Have the ability to forget anything you want"
    },
    {
        question: "Would you rather...",
        option1: "Always win at board games",
        option2: "Always win at video games"
    },
    {
        question: "Would you rather...",
        option1: "Have dinner with your favorite celebrity",
        option2: "Have dinner with a historical figure"
    },
    {
        question: "Would you rather...",
        option1: "Be able to play every musical instrument",
        option2: "Be able to speak every language fluently"
    },
    {
        question: "Would you rather...",
        option1: "Have a dragon as a pet",
        option2: "Have a unicorn as a pet"
    },
    {
        question: "Would you rather...",
        option1: "Live in a treehouse",
        option2: "Live on a houseboat"
    },
    {
        question: "Would you rather...",
        option1: "Have super intelligence",
        option2: "Have super creativity"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let gameFinished = false;

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById('question').textContent = q.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = `
        <div class="option" onclick="vote(1)">
            <div class="option-text">${q.option1}</div>
        </div>
        <div class="option" onclick="vote(2)">
            <div class="option-text">${q.option2}</div>
        </div>
    `;

    document.querySelector('.stats').style.display = 'block';
    document.getElementById('questionsAnswered').textContent = currentQuestionIndex + 1 + ' of ' + questions.length;
}

function vote(option) {
    if (gameFinished) return;

    const q = questions[currentQuestionIndex];
    const selectedAnswer = option === 1 ? q.option1 : q.option2;
    
    userAnswers.push({
        question: q.question,
        option1: q.option1,
        option2: q.option2,
        selectedOption: option,
        selectedAnswer: selectedAnswer
    });

    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    gameFinished = true;
    
    document.getElementById('question').textContent = "🎉 Game Completed! Here are your choices:";
    
    let resultsHTML = '';
    userAnswers.forEach((answer, index) => {
        resultsHTML += `
            <div class="result-item">
                <div class="result-number">Question ${index + 1}</div>
                <div class="result-question">${answer.question}</div>
                <div class="result-options">
                    <div class="result-option ${answer.selectedOption === 1 ? 'selected-result' : ''}">
                        ${answer.option1}
                    </div>
                    <div class="result-option ${answer.selectedOption === 2 ? 'selected-result' : ''}">
                        ${answer.option2}
                    </div>
                </div>
            </div>
        `;
    });
    
    document.getElementById('options').innerHTML = resultsHTML;
    
    document.querySelector('.buttons').innerHTML = `
        <button class="next-btn" onclick="restartGame()">Play Again 🔄</button>
    `;
    
    document.querySelector('.stats').innerHTML = `
        <h3>Final Score</h3>
        <p>You answered all <strong>${questions.length}</strong> questions!</p>
    `;
}

function restartGame() {
    currentQuestionIndex = 0;
    userAnswers = [];
    gameFinished = false;
    
    document.querySelector('.buttons').innerHTML = `
        <button class="next-btn" onclick="skipQuestion()">Skip Question →</button>
        <button class="reset-btn" onclick="restartGame()">Restart Game</button>
    `;
    
    loadQuestion();
}

function skipQuestion() {
    if (gameFinished) return;
    currentQuestionIndex++;
    loadQuestion();
}

function nextQuestion() {
    skipQuestion();
}

function resetStats() {
    restartGame();
}

// Initialize when page loads
loadQuestion();