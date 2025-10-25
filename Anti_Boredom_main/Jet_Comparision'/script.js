let selectedJets = [];
let score = 0;

const jetCards = document.querySelectorAll('.jet-card');
const questionContainer = document.getElementById('question-container');
const scoreboard = document.getElementById('scoreboard');
const endGameDiv = document.getElementById('end-game');
const finalScoreSpan = document.getElementById('final-score');

jetCards.forEach(card => {
  card.addEventListener('click', () => {
    if (!selectedJets.includes(card.dataset.jet)) {
      selectedJets.push(card.dataset.jet);
      card.classList.add('selected');
    }

    if (selectedJets.length === 2) {
      askQuestion(selectedJets);
    }
  });
});

function askQuestion(jets) {
  questionContainer.innerHTML = `
    <p>Which jet is faster: ${jets[0]} or ${jets[1]}?</p>
    <button onclick="checkAnswer('${jets[0]}', '${jets[1]}', 'speed', this)">${jets[0]}</button>
    <button onclick="checkAnswer('${jets[0]}', '${jets[1]}', 'speed', this)">${jets[1]}</button>
  `;
}

function checkAnswer(jet1, jet2, stat, button) {
  const jet1Card = document.querySelector(`.jet-card[data-jet="${jet1}"]`);
  const jet2Card = document.querySelector(`.jet-card[data-jet="${jet2}"]`);

  const jet1Value = parseInt(jet1Card.dataset[stat]);
  const jet2Value = parseInt(jet2Card.dataset[stat]);

  const correctJet = jet1Value > jet2Value ? jet1 : jet2;

  if (button.innerText === correctJet) {
    score += 10;
    animateJet(correctJet);
    alert(`Correct! +10 points`);
  } else {
    alert(`Wrong! The correct answer was ${correctJet}`);
  }

  scoreboard.innerText = `Score: ${score}`;
  selectedJets = [];
  jetCards.forEach(card => card.classList.remove('selected'));
  questionContainer.innerHTML = '';

  if (score >= 50) { // game end condition
    endGame();
  }
}

function animateJet(jet) {
  const jetCard = document.querySelector(`.jet-card[data-jet="${jet}"]`);
  jetCard.classList.add('takeoff');
  setTimeout(() => jetCard.classList.remove('takeoff'), 1000);
}

function endGame() {
  finalScoreSpan.innerText = score;
  endGameDiv.style.display = 'block';
  questionContainer.style.display = 'none';
}
