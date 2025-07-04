document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const finalScoreElement = document.getElementById('final-score');
    const maxScoreElement = document.getElementById('max-score');
    const finalTimeElement = document.getElementById('final-time');
    const performanceMessageElement = document.getElementById('performance-message');
    const timerElement = document.getElementById('time');

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer = 0;
    let timerInterval;
    let questions = [];
    let selectedOption = null;

    // Sample questions - in a real app, you might fetch these from an API
    const sampleQuestions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris",
            explanation: "Paris has been the capital of France since the 10th century."
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars",
            explanation: "Mars appears red due to iron oxide (rust) on its surface."
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            answer: "Blue Whale",
            explanation: "The blue whale can reach lengths of up to 100 feet and weights of 200 tons."
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: "JavaScript",
            explanation: "JavaScript is the programming language of the Web."
        },
        {
            question: "What does HTML stand for?",
            options: [
                "Hypertext Markup Language",
                "Hypertext Machine Language",
                "Hypertext Marking Language",
                "Hyper Transfer Markup Language"
            ],
            answer: "Hypertext Markup Language",
            explanation: "HTML is the standard markup language for creating web pages."
        }
    ];

    // Initialize the quiz
    function initQuiz() {
        questions = [...sampleQuestions];
        shuffleQuestions();
        totalQuestionsElement.textContent = questions.length;
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        timer = 0;
        scoreElement.textContent = score;
        startTimer();
        showQuestion();
    }

    // Shuffle questions array
    function shuffleQuestions() {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    // Shuffle options for a question
    function shuffleOptions(options) {
        const shuffled = [...options];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Display the current question
    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        questionText.textContent = currentQuestion.question;
        
        const shuffledOptions = shuffleOptions(currentQuestion.options);
        
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectOption(button, option));
            optionsContainer.appendChild(button);
        });
    }

    // Reset the quiz state for a new question
    function resetState() {
        selectedOption = null;
        nextBtn.classList.add('hidden');
        feedbackElement.classList.add('hidden');
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
        
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    // Handle option selection
    function selectOption(button, option) {
        selectedOption = option;
        const currentQuestion = questions[currentQuestionIndex];
        
        // Highlight selected option
        const options = optionsContainer.querySelectorAll('.option-btn');
        options.forEach(opt => {
            opt.classList.remove('selected');
            opt.disabled = true;
        });
        button.classList.add('selected');
        
        // Check if answer is correct
        const isCorrect = option === currentQuestion.answer;
        if (isCorrect) {
            button.classList.add('correct');
            score++;
            scoreElement.textContent = score;
            feedbackElement.textContent = 'Correct! ' + currentQuestion.explanation;
            feedbackElement.classList.add('correct');
        } else {
            button.classList.add('incorrect');
            // Highlight correct answer
            options.forEach(opt => {
                if (opt.textContent === currentQuestion.answer) {
                    opt.classList.add('correct');
                }
            });
            feedbackElement.textContent = `Incorrect. The correct answer is: ${currentQuestion.answer}. ${currentQuestion.explanation}`;
            feedbackElement.classList.add('incorrect');
        }
        
        feedbackElement.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }

    // Move to the next question or end quiz
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    // Start the quiz timer
    function startTimer() {
        clearInterval(timerInterval);
        timer = 0;
        timerElement.textContent = timer;
        timerInterval = setInterval(() => {
            timer++;
            timerElement.textContent = timer;
        }, 1000);
    }

    // End the quiz and show results
    function endQuiz() {
        clearInterval(timerInterval);
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        
        finalScoreElement.textContent = score;
        maxScoreElement.textContent = questions.length;
        finalTimeElement.textContent = timer;
        
        // Performance message
        const percentage = (score / questions.length) * 100;
        let message;
        if (percentage >= 80) {
            message = "Excellent work! You're a quiz master!";
        } else if (percentage >= 60) {
            message = "Good job! You know your stuff!";
        } else if (percentage >= 40) {
            message = "Not bad! Keep learning!";
        } else {
            message = "Keep practicing! You'll get better!";
        }
        performanceMessageElement.textContent = message;
    }

    // Restart the quiz
    function restartQuiz() {
        resultsScreen.classList.add('hidden');
        initQuiz();
    }

    // Event listeners
    startBtn.addEventListener('click', initQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
});