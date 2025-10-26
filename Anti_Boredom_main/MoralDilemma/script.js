const dilemmas = [
      {
        q: "The Trolley Problem: A runaway trolley is heading toward 5 people on the tracks. You can pull a lever to divert it to another track where 1 person is standing.",
        emoji: "🚋",
        choices: [
          {text: "Pull the lever (save 5, sacrifice 1)", type: "utilitarian"},
          {text: "Do nothing (let fate decide)", type: "deontological"}
        ],
        education: "This classic thought experiment explores utilitarianism (greatest good for greatest number) vs. deontological ethics (the morality of actions themselves). Pulling the lever is an active choice to cause harm, while doing nothing avoids direct responsibility."
      },
      {
        q: "Your best friend asks if you like their new haircut. You think it looks terrible and doesn't suit them at all.",
        emoji: "💇",
        choices: [
          {text: "Tell a white lie to protect their feelings", type: "virtue"},
          {text: "Be honest and explain gently why it doesn't work", type: "deontological"}
        ],
        education: "This explores virtue ethics (compassion vs. honesty) and the social contract. Some philosophers argue that minor dishonesty can strengthen relationships, while others believe honesty builds authentic trust."
      },
      {
        q: "You discover your company is hiding a safety defect in its product. Reporting it could save lives but will likely cost many employees their jobs.",
        emoji: "🏢",
        choices: [
          {text: "Blow the whistle to protect public safety", type: "utilitarian"},
          {text: "Handle it internally to protect colleagues", type: "virtue"}
        ],
        education: "Whistleblowing dilemmas pit individual duty against collective welfare. This touches on professional ethics, loyalty, and the responsibility to prevent harm. Many philosophers argue truth-telling trumps loyalty when lives are at risk."
      },
      {
        q: "A person suffering from a terminal illness with no hope of recovery asks for help ending their life peacefully on their own terms.",
        emoji: "💊",
        choices: [
          {text: "Support their autonomy and right to choose", type: "utilitarian"},
          {text: "Refuse, believing life should run its natural course", type: "deontological"}
        ],
        education: "End-of-life ethics involves autonomy, the sanctity of life, and what it means to die with dignity. Different cultures and philosophies have vastly different views on whether individuals have the right to choose when to end suffering."
      },
      {
        q: "You can donate money to charity or use it for self-care activities that would significantly improve your mental health.",
        emoji: "💝",
        choices: [
          {text: "Donate to help others in greater need", type: "utilitarian"},
          {text: "Invest in your own wellbeing first", type: "virtue"}
        ],
        education: "This explores the ethics of care and effective altruism. While helping others is noble, philosophers debate whether you can pour from an empty cup. Self-care isn't selfish—it enables sustainable compassion."
      },
      {
        q: "You witness a friend shoplifting a small item from a large corporation. They're struggling financially and you know they're not a bad person.",
        emoji: "🏪",
        choices: [
          {text: "Report it—stealing is wrong regardless of reason", type: "deontological"},
          {text: "Stay silent and perhaps help them another way", type: "virtue"}
        ],
        education: "This explores rule-based ethics vs. situational ethics. While laws provide order, context matters. Some argue that rigid rule-following lacks compassion, while others say exceptions erode societal foundations."
      },
      {
        q: "An AI system you designed shows bias against certain groups. Fixing it will delay launch by months and may cost your job, but hiding it maintains the status quo.",
        emoji: "🤖",
        choices: [
          {text: "Delay and fix the bias transparently", type: "deontological"},
          {text: "Launch now and patch it quietly later", type: "utilitarian"}
        ],
        education: "Technology ethics involves responsibility for systems we create. This touches on transparency, accountability, and whether intentions matter if outcomes cause harm. Tech ethics is increasingly crucial as AI impacts millions."
      },
      {
        q: "You have evidence that would exonerate a stranger but incriminate someone you love. The stranger will face 5 years in prison if you stay silent.",
        emoji: "⚖️",
        choices: [
          {text: "Present the evidence and let justice prevail", type: "deontological"},
          {text: "Protect your loved one—loyalty matters", type: "virtue"}
        ],
        education: "This pits justice against personal loyalty. Most legal systems require truth-telling, but our deepest bonds often conflict with impartial justice. Philosophers debate whether pure objectivity is even possible or desirable."
      },
      {
        q: "You can use AI to impersonate someone's voice for an elaborate surprise party that would make them incredibly happy.",
        emoji: "🎭",
        choices: [
          {text: "Use it—the joy justifies the deception", type: "utilitarian"},
          {text: "Avoid deception even for a good cause", type: "deontological"}
        ],
        education: "Modern technology raises new ethical questions about consent, identity, and deception. Even well-intentioned uses of deepfakes normalize technologies that can be weaponized. Intent and outcome both matter."
      },
      {
        q: "You have one dose of life-saving medicine. You can give it to a young child with their whole life ahead or an elderly scientist close to a breakthrough that could save millions.",
        emoji: "💉",
        choices: [
          {text: "Save the child—every life has equal value", type: "deontological"},
          {text: "Save the scientist—maximize lives saved", type: "utilitarian"}
        ],
        education: "This explores whether all lives have equal value or if consequences matter. Utilitarians calculate outcomes; deontologists argue people aren't means to ends. There's no easy answer—just different frameworks for impossible choices."
      }
    ];

    let currentQuestion = 0;
    let scores = {utilitarian: 0, deontological: 0, virtue: 0};
    let answers = [];

    function renderQuestion() {
      const d = dilemmas[currentQuestion];
      const progress = ((currentQuestion) / dilemmas.length) * 100;
      
      document.getElementById('gameArea').innerHTML = `
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="question-card">
          <div class="question-number">Question ${currentQuestion + 1} of ${dilemmas.length}</div>
          <div class="question-text">${d.emoji} ${d.q}</div>
        </div>
        
        <div class="choices">
          ${d.choices.map((choice, i) => `
            <div class="choice" onclick="selectAnswer(${i})">
              ${choice.text}
            </div>
          `).join('')}
        </div>
        
        <div id="educationBox"></div>
      `;
    }

    function selectAnswer(choiceIndex) {
      const d = dilemmas[currentQuestion];
      const selectedChoice = d.choices[choiceIndex];
      
      scores[selectedChoice.type]++;
      answers.push({
        question: currentQuestion,
        choice: choiceIndex,
        type: selectedChoice.type
      });
      
      showEducation(d.education);
    }

    function showEducation(educationText) {
      document.getElementById('educationBox').innerHTML = `
        <div class="info-box">
          <div class="info-title">📚 Educational Insight</div>
          <div class="info-text">${educationText}</div>
          <button class="button" onclick="nextQuestion()" style="margin-top: 15px;">
            ${currentQuestion < dilemmas.length - 1 ? 'Next Question →' : 'See Results 🎉'}
          </button>
        </div>
      `;
    }

    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < dilemmas.length) {
        renderQuestion();
      } else {
        showResults();
      }
    }

    function showResults() {
      const total = answers.length;
      const dominant = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
      );
      
      const profiles = {
        utilitarian: {
          icon: "🎯",
          title: "The Consequentialist",
          description: "You focus on outcomes and the greatest good for the greatest number. You believe the ends can justify the means when lives and wellbeing are at stake. You're pragmatic and results-oriented.",
          philosophers: "Jeremy Bentham, John Stuart Mill, Peter Singer"
        },
        deontological: {
          icon: "⚖️",
          title: "The Principled",
          description: "You believe in universal moral rules and duties. For you, certain actions are inherently right or wrong, regardless of consequences. You value integrity, honesty, and following ethical principles.",
          philosophers: "Immanuel Kant, W.D. Ross, Thomas Aquinas"
        },
        virtue: {
          icon: "💝",
          title: "The Compassionate",
          description: "You emphasize character, relationships, and context. You believe ethics is about being a good person and showing virtues like compassion, loyalty, and wisdom. You consider relationships and individual circumstances.",
          philosophers: "Aristotle, Confucius, Nel Noddings"
        }
      };
      
      const profile = profiles[dominant];
      const progress = ((currentQuestion) / dilemmas.length) * 100;
      
      document.getElementById('gameArea').innerHTML = `
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="result-card">
          <div class="result-icon">${profile.icon}</div>
          <div class="result-title">${profile.title}</div>
          <div class="result-description">${profile.description}</div>
          
          <div class="stats-summary">
            <div class="stats-title">Your Ethical Profile</div>
            <div class="score-grid">
              <div class="score-item">
                <div class="score-label">Consequentialist</div>
                <div class="score-value">${scores.utilitarian}</div>
              </div>
              <div class="score-item">
                <div class="score-label">Principled</div>
                <div class="score-value">${scores.deontological}</div>
              </div>
              <div class="score-item">
                <div class="score-label">Compassionate</div>
                <div class="score-value">${scores.virtue}</div>
              </div>
            </div>
          </div>
          
          <div class="info-box">
            <div class="info-title">📖 Notable Philosophers</div>
            <div class="info-text">${profile.philosophers}</div>
          </div>
          
          <div style="margin-top: 30px;">
            <button class="button" onclick="restart()">Play Again 🔄</button>
            <button class="button button-secondary" onclick="reviewAnswers()">Review Answers 📝</button>
          </div>
        </div>
      `;
    }

    function reviewAnswers() {
      let reviewHTML = `
        <div class="result-card">
          <h2 style="color: #667eea; margin-bottom: 20px;">📝 Your Answer Review</h2>
      `;
      
      answers.forEach((answer, idx) => {
        const d = dilemmas[answer.question];
        const choice = d.choices[answer.choice];
        reviewHTML += `
          <div class="question-card" style="margin-bottom: 15px; text-align: left;">
            <div class="question-number">Question ${idx + 1}</div>
            <div class="question-text" style="font-size: 1rem; margin-bottom: 10px;">${d.emoji} ${d.q}</div>
            <div style="color: #667eea; font-weight: 600;">Your choice: ${choice.text}</div>
            <div style="color: #666; margin-top: 5px; font-size: 0.9rem;">Ethical framework: ${choice.type}</div>
          </div>
        `;
      });
      
      reviewHTML += `
          <button class="button" onclick="showResults()">Back to Results</button>
          <button class="button button-secondary" onclick="restart()">Play Again</button>
        </div>
      `;
      
      document.getElementById('gameArea').innerHTML = reviewHTML;
    }

    function restart() {
      currentQuestion = 0;
      scores = {utilitarian: 0, deontological: 0, virtue: 0};
      answers = [];
      renderQuestion();
    }

    renderQuestion();