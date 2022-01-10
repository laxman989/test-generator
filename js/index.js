const questions = [
    {
        question: 'What is the capital of India?',
        options: [
            {value: 'Delhi'},
            {value: 'Mumbai'},
            {value: 'Chennai'},
            {value: 'kolkata'},
        ],
        correctAnswer: 'Delhi'
    },
    {
        question: 'Which is the largest state in area?',
        options: [
            {value: 'Maharashtra'},
            {value: 'Uttar Pradesh'},
            {value: 'Rajasthan'},
            {value: 'Gujarat'},
        ],
        correctAnswer: 'Rajasthan'
    },
    {
        question: 'What is the capital of Maharashtra?',
        options: [
            {value: 'Pune'},
            {value: 'Mumbai'},
            {value: 'Chennai'},
            {value: 'Patna'},
        ],
        correctAnswer: 'Mumbai'
    },
    {
        question: 'How many states are in India?',
        options: [
            {value: '27'},
            {value: '28'},
            {value: '29'},
            {value: '30'},
        ],
        correctAnswer: '28'
    },
    {
        question: 'Who is the first President of India?',
        options: [
            {value: 'A. P. J. Abdul Kalam'},
            {value: 'Ram Nath Kovind'},
            {value: 'Pranab Mukherjee'},
            {value: 'Rajendra Prasad'},
        ],
        correctAnswer: 'Rajendra Prasad'
    },
    {
        question: 'When India got independence from British?',
        options: [
            {value: '26 January, 1947'},
            {value: '26 January, 1950'},
            {value: '15 August, 1947'},
            {value: '15 August, 1950'},
        ],
        correctAnswer: '15 August, 1947'
    },
    {
        question: 'What is the capital of Rajasthan?',
        options: [
            {value: 'Jaipur'},
            {value: 'Mumbai'},
            {value: 'Kolkata'},
            {value: 'Lucknow'},
        ],
        correctAnswer: 'Jaipur'
    },
    {
        question: 'Which of these is not a state?',
        options: [
            {value: 'Kerela'},
            {value: 'Mumbai'},
            {value: 'Rajasthan'},
            {value: 'Gujarat'},
        ],
        correctAnswer: 'Mumbai'
    },
    {
        question: 'Who is the current Prime Minister of India?',
        options: [
            {value: 'Rahul Gandhi'},
            {value: 'Amit Shah'},
            {value: 'Narendra Modi'},
            {value: 'Arvind Kejriwal'},
        ],
        correctAnswer: 'Narendra Modi'
    },
    {
        question: 'Which city is also known as Pink City?',
        options: [
            {value: 'Jaipur'},
            {value: 'Mumbai'},
            {value: 'Kolkata'},
            {value: 'Lucknow'},
        ],
        correctAnswer: 'Jaipur'
    },
];

var answerSheet = {};
var selectedQuestion = 0;
var questionsAttempted = 0;

// Function to create Question in Question-Viewer
function createQuestion(question){
    var questionDiv = document.querySelector('.question-viewer');
    var questionText = document.createElement('p');
    questionText.className = 'question';
    questionText.textContent = (selectedQuestion+1) + '. ' + question.question;
    questionDiv.appendChild(questionText);
    createQuestionOptions(question.options, questionDiv);
    disableEnableBtn();
    // return questionText
}

// Function to create Pointer for each question in Question-Explorer
function createQuestionPointer(index){
    var questionPointer = document.createElement('button');
    questionPointer.className = 'explorer-btn';
    questionPointer.id = 'btn-'+index;
    questionPointer.textContent = index + 1;
    questionPointer.addEventListener('click', function(){
        selectedQuestion = index;
        document.querySelector('#btn-'+selectedQuestion).classList.add('visited');
        document.querySelector('.question-viewer').textContent = '';
        createQuestion(questions[selectedQuestion]);
    });
    document.querySelector('.question-explorer').appendChild(questionPointer)
    // return questionPointer
}

// Function to create options for particular question
function createQuestionOptions(options, questionDiv) {
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        var optionElement = document.createElement('div');
        optionElement.className = 'option';
        var optionRadio = document.createElement('input');
        optionRadio.type = 'radio';
        optionRadio.name = 'question-option';
        optionRadio.value = option.value;
        optionRadio.addEventListener('change', function () {
            answerSheet[selectedQuestion] = document.querySelector('input[name="question-option"]:checked').value;
            document.getElementById('btn-'+selectedQuestion).className = 'explorer-btn attempted';
            questionsAttempted += 1;
        });
    
        var optionLabel = document.createElement('label');
        optionLabel.textContent = option.value;

        optionElement.appendChild(optionRadio);
        optionElement.appendChild(optionLabel);
        questionDiv.appendChild(optionElement);
    }
}

// Function to create Question-Explorer 
function questionExplorer(){
    for (let i = 0; i < questions.length; i++) {
        createQuestionPointer(i);
    }
    document.getElementById('btn-'+selectedQuestion).className = 'explorer-btn visited';
    createQuestion(questions[selectedQuestion]);
}

// Function to change Questions on button(click) listener
function changeQuestion(factor) {
    if(selectedQuestion + factor < 0 || selectedQuestion + factor > questions.length - 1){
        return;
    } 
    else{
        selectedQuestion += factor;
    }
    document.querySelector('#btn-'+selectedQuestion).classList.add('visited');
    document.querySelector('.question-viewer').textContent = '';
    createQuestion(questions[selectedQuestion])
}

// Function to disable/enable Previous and Next Button
function disableEnableBtn(){
    let previousBtnElement = document.getElementById('previous');
    let nextBtnElement = document.getElementById('next');
    if(selectedQuestion == 0){
        previousBtnElement.disabled = true;
        previousBtnElement.className = 'disabled';
        previousBtnElement.style.cursor = 'not-allowed';
    }
    else if(selectedQuestion == (questions.length -1)){
        nextBtnElement.disabled = true;
        nextBtnElement.className = 'disabled';
        nextBtnElement.style.cursor = 'not-allowed';
    }
    else{
        previousBtnElement.className = '';
        nextBtnElement.className = '';
        previousBtnElement.disabled = false;
        previousBtnElement.style.cursor = 'pointer';
        nextBtnElement.disabled = false;
        nextBtnElement.style.cursor = 'pointer';
    }
}

// Function to Submit Test
function submitTest(){
    var totalScore = 0;
    var attemptedCorrect = 0;
    var attemptedWrong = 0;
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var correctAnswer = question.correctAnswer;
        if (answerSheet[i]) {
            if (answerSheet[i] === correctAnswer) {
                totalScore += 4;
                attemptedCorrect += 1;
            }
            else{
                attemptedWrong += 1;
            }
        }
    }
    document.querySelector('#attempted').textContent = 'No. of Questions Attempted : ' + questionsAttempted;
    document.querySelector('#attemptedCorrect').textContent = 'No. of Correct Answers : ' + attemptedCorrect;
    document.querySelector('#attemptedWrong').textContent = 'No. of Wrong Answers : ' + attemptedWrong;
    document.querySelector('#score').textContent = 'Your Score out of : ' + totalScore + '/' + questions.length*4;
    document.querySelector('.test-window').style.display = 'none';
    document.querySelector('.score-window').style.display = 'block';
}

// Function to Set Timer
function setTimer(){
    var startMinutes = 2;
    var startTime = startMinutes*60;
    var time = startTime;
    
    var timerElement = document.querySelector('#timer')
    setInterval(function (){
        let minutes = Math.floor(startTime / 60);
        let seconds = startTime % 60;
    
        seconds = (seconds < 10) ? ('0' + seconds) : (seconds);
        minutes = (minutes < 10) ? ('0' + minutes) : (minutes);
    
        timerElement.textContent = `Time Left - ${minutes}:${seconds}`;
        startTime--;
        if(startTime < 0){
            submitTest();
        }
        if(startTime < time/2){
            document.querySelector('#timer').style.color = 'rgb(255, 189, 91)';
        }
        if(startTime < time/4){
            document.querySelector('#timer').style.color = 'rgb(255, 91, 91)';
        }
    }, 1000);
}

// All Event Listeners

// Start Test - Listener
document.querySelector('#start-test').addEventListener('click', function(){
    questionExplorer();
    document.querySelector('.welcome-window').style.display = 'none';
    document.querySelector('.test-window').style.display = 'flex';
    setTimer();
});

// Question to add for Review - Listener
document.querySelector("#review").addEventListener("click", function (){
    document.querySelector('#btn-'+selectedQuestion).classList.add('review');
    document.querySelector('#btn-'+selectedQuestion).classList.remove('visited');
});

// Route previous question - Listener
document.querySelector("#previous").addEventListener("click", function () {
    changeQuestion(-1);
});

// Route next question - Listener
document.querySelector("#next").addEventListener("click", function () {
    changeQuestion(1);
});

// Submit Test - Listener
document.querySelector("#submit-test").addEventListener("click", function () {
    submitTest();
});

// Close Test - Listener
document.querySelector('#close-test').addEventListener('click', function(){
    window.close();
})

//document.getElementById('instructions-list').firstElementChild.textContent = 'You will have ' + questions.length + ' questions to attempt.';