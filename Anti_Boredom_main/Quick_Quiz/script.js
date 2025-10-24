const questionBank = [
    {
        question: "What animal cannot jump?",
        answers: [
            { text: "Elephant", correct: true },
            { text: "Rhinoceros", correct: false },
            { text: "Hippopotamus", correct: false },
            { text: "Sloth", correct: false }
        ]
    },
    {
        question: "What color is an airplane's 'black box'?",
        answers: [
            { text: "Black", correct: false },
            { text: "Bright Orange", correct: true },
            { text: "Yellow", correct: false },
            { text: "White", correct: false }
        ]
    },
    {
        question: "In which country was the Caesar salad invented?",
        answers: [
            { text: "Italy", correct: false },
            { text: "Greece", correct: false },
            { text: "United States", correct: false },
            { text: "Mexico", correct: true }
        ]
    },
    {
        question: "How many hearts does an octopus have?",
        answers: [
            { text: "One", correct: false },
            { text: "Two", correct: false },
            { text: "Three", correct: true },
            { text: "Eight", correct: false }
        ]
    },
    {
        question: "What is a flock of crows called?",
        answers: [
            { text: "A Murder", correct: true },
            { text: "A Gaggle", correct: false },
            { text: "A Conspiracy", correct: false },
            { text: "A Parliament", correct: false }
        ]
    },
    {
        question: "What is the fear of long words called?",
        answers: [
            { text: "Arachnophobia", correct: false },
            { text: "Agoraphobia", correct: false },
            { text: "Sesquipedalophobia", correct: true },
            { text: "Glossophobia", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Indian", correct: false },
            { text: "Arctic", correct: false },
            { text: "Pacific", correct: true }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Kyoto", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Osaka", correct: false },
            { text: "Hiroshima", correct: false }
        ]
    },
    {
        question: "What element does 'O' represent on the periodic table?",
        answers: [
            { text: "Oxygen", correct: true },
            { text: "Osmium", correct: false },
            { text: "Gold", correct: false },
            { text: "Oganesson", correct: false }
        ]
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Venus", correct: false },
            { text: "Mercury", correct: true },
            { text: "Pluto", correct: false }
        ]
    },
    {
        question: "Which artist painted the Mona Lisa?",
        answers: [
            { text: "Michelangelo", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Raphael", correct: false },
            { text: "Donatello", correct: false }
        ]
    },
    {
        question: "What is the currency of Australia?",
        answers: [
            { text: "Dollar", correct: true },
            { text: "Pound", correct: false },
            { text: "Euro", correct: false },
            { text: "Yen", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Quartz", correct: false },
            { text: "Diamond", correct: true },
            { text: "Topaz", correct: false },
            { text: "Ruby", correct: false }
        ]
    },
    {
        question: "What is the only continent with land in all four hemispheres?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: false },
            { text: "Africa", correct: true },
            { text: "South America", correct: false }
        ]
    },
    {
        question: "How many bones are in the adult human body?",
        answers: [
            { text: "206", correct: true },
            { text: "212", correct: false },
            { text: "198", correct: false },
            { text: "230", correct: false }
        ]
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Toronto", correct: false },
            { text: "Vancouver", correct: false },
            { text: "Montreal", correct: false },
            { text: "Ottawa", correct: true }
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "K2", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Kangchenjunga", correct: false },
            { text: "Makalu", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: false },
            { text: "South Korea", correct: false },
            { text: "Japan", correct: true },
            { text: "Thailand", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Gd", correct: false }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the fastest land animal?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Pronghorn Antelope", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Wildebeest", correct: false }
        ]
    },
    {
        question: "What planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the main language spoken in Brazil?",
        answers: [
            { text: "Spanish", correct: false },
            { text: "Portuguese", correct: true },
            { text: "Brazilian", correct: false },
            { text: "English", correct: false }
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "What is the square root of 144?",
        answers: [
            { text: "12", correct: true },
            { text: "11", correct: false },
            { text: "13", correct: false },
            { text: "14", correct: false }
        ]
    },
    {
        question: "What is the name of the galaxy our solar system is in?",
        answers: [
            { text: "Andromeda", correct: false },
            { text: "Triangulum", correct: false },
            { text: "The Milky Way", correct: true },
            { text: "Messier 87", correct: false }
        ]
    },
    {
        question: "What is the name of the bell inside the famous London clock tower?",
        answers: [
            { text: "Big Ben", correct: true },
            { text: "The Great Bell", correct: false },
            { text: "Westminster Bell", correct: false },
            { text: "Old Tom", correct: false }
        ]
    },
    {
        question: "In which city is the Eiffel Tower located?",
        answers: [
            { text: "Rome", correct: false },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true }
        ]
    },
    {
        question: "What is the 'powerhouse' of the cell?",
        answers: [
            { text: "Nucleus", correct: false },
            { text: "Mitochondria", correct: true },
            { text: "Ribosome", correct: false },
            { text: "Cytoplasm", correct: false }
        ]
    },
    {
        question: "What is the world's largest island?",
        answers: [
            { text: "Australia", correct: false },
            { text: "Greenland", correct: true },
            { text: "Madagascar", correct: false },
            { text: "Borneo", correct: false }
        ]
    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            { text: "Buzz Aldrin", correct: false },
            { text: "Neil Armstrong", correct: true },
            { text: "Michael Collins", correct: false },
            { text: "Yuri Gagarin", correct: false }
        ]
    },
    {
        question: "What is acrophobia?",
        answers: [
            { text: "Fear of spiders", correct: false },
            { text: "Fear of heights", correct: true },
            { text: "Fear of water", correct: false },
            { text: "Fear of enclosed spaces", correct: false }
        ]
    },
    {
        question: "What is the softest mineral in the world?",
        answers: [
            { text: "Gypsum", correct: false },
            { text: "Talc", correct: true },
            { text: "Calcite", correct: false },
            { text: "Fluorite", correct: false }
        ]
    },
    {
        question: "What is the study of weather called?",
        answers: [
            { text: "Geology", correct: false },
            { text: "Meteorology", correct: true },
            { text: "Climatology", correct: false },
            { text: "Seismology", correct: false }
        ]
    },
    {
        question: "What do you call a baby kangaroo?",
        answers: [
            { text: "A calf", correct: false },
            { text: "A pup", correct: false },
            { text: "A joey", correct: true },
            { text: "A kit", correct: false }
        ]
    },
    {
        question: "What is the national sport of Japan?",
        answers: [
            { text: "Baseball", correct: false },
            { text: "Sumo", correct: true },
            { text: "Karate", correct: false },
            { text: "Soccer", correct: false }
        ]
    },
    {
        question: "What is the hottest planet in our solar system?",
        answers: [
            { text: "Mercury", correct: false },
            { text: "Venus", correct: true },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "What is the only mammal capable of true, sustained flight?",
        answers: [
            { text: "Flying squirrel", correct: false },
            { text: "Sugar glider", correct: false },
            { text: "Bat", correct: true },
            { text: "Ostrich", correct: false }
        ]
    },
    {
        question: "What is a group of lions called?",
        answers: [
            { text: "A pack", correct: false },
            { text: "A pride", correct: true },
            { text: "A herd", correct: false },
            { text: "A flock", correct: false }
        ]
    },
    {
        question: "What is the capital of Spain?",
        answers: [
            { text: "Barcelona", correct: false },
            { text: "Lisbon", correct: false },
            { text: "Madrid", correct: true },
            { text: "Seville", correct: false }
        ]
    },
    {
        question: "What is the chemical formula for water?",
        answers: [
            { text: "H2O2", correct: false },
            { text: "HO2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false }
        ]
    },
    {
        question: "Who painted 'Starry Night'?",
        answers: [
            { text: "Claude Monet", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Vincent van Gogh", correct: true },
            { text: "Salvador Dalí", correct: false }
        ]
    },
    {
        question: "What is the world's most venomous fish?",
        answers: [
            { text: "Pufferfish", correct: false },
            { text: "Stonefish", correct: true },
            { text: "Lionfish", correct: false },
            { text: "Box Jellyfish", correct: false }
        ]
    },
    {
        question: "What is the largest bone in the human body?",
        answers: [
            { text: "Tibia", correct: false },
            { text: "Femur", correct: true },
            { text: "Humerus", correct: false },
            { text: "Pelvis", correct: false }
        ]
    },
    {
        question: "What is the main component of Earth's atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: false },
            { text: "Nitrogen", correct: true },
            { text: "Argon", correct: false }
        ]
    },
    {
        question: "Who wrote 'Pride and Prejudice'?",
        answers: [
            { text: "Charlotte Brontë", correct: false },
            { text: "Jane Austen", correct: true },
            { text: "Mary Shelley", correct: false },
            { text: "Emily Brontë", correct: false }
        ]
    },
    {
        question: "What is the capital of Argentina?",
        answers: [
            { text: "Santiago", correct: false },
            { text: "Bogotá", correct: false },
            { text: "Buenos Aires", correct: true },
            { text: "Lima", correct: false }
        ]
    },
    {
        question: "How many sides does a hexagon have?",
        answers: [
            { text: "Five", correct: false },
            { text: "Six", correct: true },
            { text: "Seven", correct: false },
            { text: "Eight", correct: false }
        ]
    },
    {
        question: "What is the freezing point of water in Fahrenheit?",
        answers: [
            { text: "0°F", correct: false },
            { text: "32°F", correct: true },
            { text: "40°F", correct: false },
            { text: "100°F", correct: false }
        ]
    },
    {
        question: "Which country is the largest by area?",
        answers: [
            { text: "China", correct: false },
            { text: "USA", correct: false },
            { text: "Canada", correct: false },
            { text: "Russia", correct: true }
        ]
    },
    {
        question: "What is the currency of Switzerland?",
        answers: [
            { text: "Euro", correct: false },
            { text: "Dollar", correct: false },
            { text: "Swiss Franc", correct: true },
            { text: "Krone", correct: false }
        ]
    },
    {
        question: "Who discovered penicillin?",
        answers: [
            { text: "Marie Curie", correct: false },
            { text: "Alexander Fleming", correct: true },
            { text: "Louis Pasteur", correct: false },
            { text: "Robert Koch", correct: false }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Nauru", correct: false },
            { text: "Vatican City", correct: true },
            { text: "San Marino", correct: false }
        ]
    },
    {
        question: "What is the largest river in the world by volume?",
        answers: [
            { text: "Nile", correct: false },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false },
            { text: "Amazon", correct: true }
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New delhi", correct: true },
            { text: "Chennai", correct: false },
            { text: "Kolkata", correct: false }
        ]
    },
    {
        question: "What is the most spoken language in the world by native speakers?",
        answers: [
            { text: "English", correct: false },
            { text: "Hindi", correct: false },
            { text: "Mandarin Chinese", correct: true },
            { text: "Spanish", correct: false }
        ]
    },
    {
        question: "What is the highest waterfall in the world?",
        answers: [
            { text: "Niagara Falls", correct: false },
            { text: "Angel Falls", correct: true },
            { text: "Victoria Falls", correct: false },
            { text: "Iguazu Falls", correct: false }
        ]
    },
    {
        question: "Which continent is the driest?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Australia", correct: false },
            { text: "Antarctica", correct: true },
            { text: "Asia", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Silver?",
        answers: [
            { text: "Si", correct: false },
            { text: "Sv", correct: false },
            { text: "Ag", correct: true },
            { text: "Au", correct: false }
        ]
    },
    {
        question: "What is the national animal of Australia?",
        answers: [
            { text: "Koala", correct: false },
            { text: "Red Kangaroo", correct: true },
            { text: "Emu", correct: false },
            { text: "Wombat", correct: false }
        ]
    },
    {
        question: "What is the boiling point of water in Fahrenheit?",
        answers: [
            { text: "100°F", correct: false },
            { text: "212°F", correct: true },
            { text: "180°F", correct: false },
            { text: "200°F", correct: false }
        ]
    },
    {
        question: "What is the capital of Egypt?",
        answers: [
            { text: "Alexandria", correct: false },
            { text: "Giza", correct: false },
            { text: "Cairo", correct: true },
            { text: "Luxor", correct: false }
        ]
    },
    {
        question: "In Greek mythology, who was the king of the gods?",
        answers: [
            { text: "Apollo", correct: false },
            { text: "Zeus", correct: true },
            { text: "Hades", correct: false },
            { text: "Poseidon", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Neptune", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    {
        question: "How many strings does a standard violin have?",
        answers: [
            { text: "Four", correct: true },
            { text: "Five", correct: false },
            { text: "Six", correct: false },
            { text: "Seven", correct: false }
        ]
    },
    {
        question: "What is the fear of spiders called?",
        answers: [
            { text: "Acrophobia", correct: false },
            { text: "Arachnophobia", correct: true },
            { text: "Agoraphobia", correct: false },
            { text: "Claustrophobia", correct: false }
        ]
    },
    {
        question: "What is the national flower of Japan?",
        answers: [
            { text: "Rose", correct: false },
            { text: "Lotus", correct: false },
            { text: "Cherry Blossom", correct: true },
            { text: "Orchid", correct: false }
        ]
    },
    {
        question: "What is the name of the galaxy closest to the Milky Way?",
        answers: [
            { text: "Triangulum", correct: false },
            { text: "Andromeda", correct: true },
            { text: "Messier 87", correct: false },
            { text: "Sombrero", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Sodium?",
        answers: [
            { text: "So", correct: false },
            { text: "Na", correct: true },
            { text: "Sd", correct: false },
            { text: "Sm", correct: false }
        ]
    },
    {
        question: "What is the largest moon in the solar system?",
        answers: [
            { text: "Titan", correct: false },
            { text: "Ganymede", correct: true },
            { text: "Io", correct: false },
            { text: "Moon (Earth's)", correct: false }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answers: [
            { text: "Milan", correct: false },
            { text: "Venice", correct: false },
            { text: "Rome", correct: true },
            { text: "Naples", correct: false }
        ]
    },
    {
        question: "What is the study of earthquakes called?",
        answers: [
            { text: "Volcanology", correct: false },
            { text: "Geology", correct: false },
            { text: "Seismology", correct: true },
            { text: "Meteorology", correct: false }
        ]
    },
    {
        question: "Who was the first woman to fly solo across the Atlantic?",
        answers: [
            { text: "Bessie Coleman", correct: false },
            { text: "Amelia Earhart", correct: true },
            { text: "Harriet Quimby", correct: false },
            { text: "Jacqueline Cochran", correct: false }
        ]
    },
    {
        question: "What is the world's smallest ocean?",
        answers: [
            { text: "Indian", correct: false },
            { text: "Arctic", correct: true },
            { text: "Southern", correct: false },
            { text: "Atlantic", correct: false }
        ]
    },
    {
        question: "What is the name of the longest bone in the human arm?",
        answers: [
            { text: "Radius", correct: false },
            { text: "Ulna", correct: false },
            { text: "Humerus", correct: true },
            { text: "Femur", correct: false }
        ]
    },
    {
        question: "How many teeth does an adult human typically have?",
        answers: [
            { text: "28", correct: false },
            { text: "30", correct: false },
            { text: "32", correct: true },
            { text: "36", correct: false }
        ]
    },
    {
        question: "What is the capital of Russia?",
        answers: [
            { text: "Saint Petersburg", correct: false },
            { text: "Moscow", correct: true },
            { text: "Kazan", correct: false },
            { text: "Novosibirsk", correct: false }
        ]
    },
    {
        question: "What is the lightest element on the periodic table?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Lithium", correct: false },
            { text: "Oxygen", correct: false }
        ]
    },
    {
        question: "What is the largest country in South America?",
        answers: [
            { text: "Argentina", correct: false },
            { text: "Colombia", correct: false },
            { text: "Brazil", correct: true },
            { text: "Peru", correct: false }
        ]
    },
    {
        question: "Who painted the ceiling of the Sistine Chapel?",
        answers: [
            { text: "Leonardo da Vinci", correct: false },
            { text: "Michelangelo", correct: true },
            { text: "Raphael", correct: false },
            { text: "Donatello", correct: false }
        ]
    },
    {
        question: "What is the national bird of India?",
        answers: [
            { text: "Turkey", correct: false },
            { text: "Peafowl", correct: true },
            { text: "Bald eagle", correct: false },
            { text: "Robin", correct: false }
        ]
    },
    {
        question: "What is the world's most populous country?",
        answers: [
            { text: "China", correct: false },
            { text: "India", correct: true },
            { text: "United States", correct: false },
            { text: "Indonesia", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Potassium?",
        answers: [
            { text: "P", correct: false },
            { text: "Po", correct: false },
            { text: "K", correct: true },
            { text: "Pt", correct: false }
        ]
    },
    {
        question: "What is the name of the largest volcano on Earth (by mass and volume)?",
        answers: [
            { text: "Mount St. Helens", correct: false },
            { text: "Mauna Loa", correct: true },
            { text: "Mount Vesuvius", correct: false },
            { text: "Krakatoa", correct: false }
        ]
    },
    {
        question: "What is the unit of electrical resistance?",
        answers: [
            { text: "Volt", correct: false },
            { text: "Ampere", correct: false },
            { text: "Ohm", correct:true },
            { text: "Watt", correct: false }
        ]
    },
];

const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;
let quizData = [];

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz(){
    shuffleArray(questionBank);
    quizData = questionBank.slice(0, 10);
    
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;
    resultsContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    nextButton.classList.add('hidden');
    showQuestion();
}

function showQuestion(){
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn', 'w-full', 'p-4', 'border', 'border-gray-300', 'rounded-lg', 'text-left', 'transition-colors', 'duration-200', 'hover:bg-gray-100');

        if(answer.correct){
            button.dataset.correct = "true";
        }

        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState(){
    answerSelected = false;
    nextButton.classList.add('hidden');
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    if(answerSelected) return;
    answerSelected = true;

    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if(isCorrect){
        score++;
        selectedButton.classList.add('correct');
    }else{
        selectedButton.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    if(currentQuestionIndex < quizData.length - 1){
        nextButton.innerText = "Next";
    }else{
        nextButton.innerText = "Finish Quiz";
    }
    nextButton.classList.remove('hidden');
}

/**
 * Shows the final results.
 */
function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length){
        showQuestion();
    }else{
        showResults();
    }
}

document.addEventListener('DOMContentLoaded', startQuiz);
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);


