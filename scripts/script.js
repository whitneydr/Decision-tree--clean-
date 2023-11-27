// Variables
let questionNumber = 'q001';
let prevQuestionNumber = 'q001';
let decisionTree = document.getElementById("decision-tree");

// Initiates the decision tree
// Removes the start banner and displays the first question
const handleStartBtn = () => {
    document.getElementById('decisionTree-start').remove();
    buildQuestionBlock('q001');
};

// Display question
// Finds the relevant question from the question array and displays the content in the question block
const buildQuestionBlock = (qnum) => {
    // Build the question screen
    let questionBlock = document.createElement('div');
    questionBlock.classList = "decisionTree__questions";
    questionBlock.id = "decisionTree__questions";

    // Main template for the questions to be inserted into
    let questionContent = `
    <div class="decisionTree__questions">
    <div class="decisionTree__question" id="question-section"></div>
    <div id="form-field"></div>
    <div class="decisionTree__nav">
    <button id="prev-btn" class="btn btn--secondary" onclick="goBack('${prevQuestionNumber}')">Previous</button>
    <button id="next-btn" class="btn btn--primary" onclick="nextQuestion()">Next</button></div>
    </div>
    `;

    questionBlock.innerHTML = questionContent;
    decisionTree.appendChild(questionBlock);
    console.log(questionNumber,prevQuestionNumber);

    // Search the questions array for the correct question and insert the values into the template
    for (let q of questions) {
        if (q.stepCode === qnum) {
            let getQuestion = `<h3>${q.question}</h3>
            <p>${q.questionDescription}</p>`;
            document.getElementById('question-section').insertAdjacentHTML("beforeend", getQuestion);

            // Retrieves and inserts the correct number of radio button options
            q.options.forEach(option => {
                let radioContent = `<div class="input-component-container-radio py-s "><input id="${option.answer}" name="radio"
                type="radio" title="${option.answer}" aria-label="${option.answer}" aria-required="true"
                class="input-component-container-radio__input" value="${option.nextStep}"><label
                class="label--radio" for="${option.answer}" title="${option.answer}"
                aria-label="${option.answer}">${option.answer}</label>
                </div>`;
                document.getElementById('form-field').insertAdjacentHTML("beforeend", radioContent)
            })
        }
    }
}


// Displays final results
// Finds the relevant result from the results array and builds an information card with the data
const buildResultBlock = (result) => {
    let resultBlock = document.createElement('div');
    resultBlock.id = 'result';
    let resultContent;

    // Search for the relevant result
    for (let r of results) {
        if (r.stepCode === result) {
            // Insert account information into result card
            resultContent = `<div class="decisionTree__questions"><p>Your result is <strong>${r.accountName}</strong></p>
            <div class="decisionTree-resultCard">
            <div class="decisionTree-resultCard__image"><img src="${r.img}" /></div>
            <div class="decisionTree-resultCard__text">
            <h3>${r.accountName}</h3>
            <p><strong>${r.accountInterest}</strong></p>
            <p>${r.accountDescription}</p>
            <p><strong>Minimum deposit:</strong> ${r.minimumDeposit}</p>
            </div>
            </div></div>
            <div class="decisionTree__nav">
            <button id="prev-btn" class="btn btn--secondary" onclick="goBack('${prevQuestionNumber}')">Previous</button>
            <button id="next-btn" class="btn btn--primary" onclick="goBack('q000')">Start over</button></div>
            </div>`;
        }
    }

    // Remove previous question and insert result content into the page
    resultBlock.innerHTML = resultContent;
    clearScreen();
    decisionTree.appendChild(resultBlock);
}

// Select next question or result based on user's choice
const nextQuestion = (nextStep) => {
    console.log(document.querySelector('input[name="radio"]:checked').value);
    nextStep = document.querySelector('input[name="radio"]:checked').value;
    prevQuestionNumber = questionNumber;

    if (nextStep.startsWith('q')) {
       clearScreen();
        questionNumber = nextStep;
        buildQuestionBlock(nextStep);  
    } else {
        buildResultBlock(nextStep);
    }
}

// Go back to the previous question
const goBack = (prev) => {
    clearScreen();
    if (prev === 'q000') {
        decisionTree.innerHTML = `<div class="decisionTree-banner" id="decisionTree-start">
        <div class="decisionTree-banner__image">
            <img
                src='https://www.co-operativebank.co.uk/contentAsset/raw-data/ddd0b18a-9d00-4c27-ac73-e404add9aa60/fileAsset?language_id=1' />
        </div>
        <div class='decisionTree-banner__text'>
            <h2>Find the account that suits your needs</h2>
            <p>
                Answer a few multiple choice questions to see which of our business bank accounts you might be
                eligible for.
            </p>
            <button data-test="component-button" class="btn btn--primary" id="startBtn" onclick="handleStartBtn()">
                Compare our accounts
            </button>
        </div>`;
    } else {
        buildQuestionBlock(prevQuestionNumber);
    }
}

// Remove previous content to make way for next question or result
const clearScreen = () => {
    decisionTree.removeChild(decisionTree.firstElementChild);
}

// Collection of available questions
const questions = [
    {
        stepCode: "q001",
        question: "How often do you need access to your cash?",
        questionDescription: "The less you dip in, the higher your interest rate may be",
        optionType: "radio",
        options: [
            {
                answer: "Any time",
                nextStep: "q002"
            },
            {
                answer: "Occasionally",
                nextStep: "a003"
            },
            {
                answer: "Rarely (once a year or less)",
                nextStep: "q003"
            }
        ]
    },
    {
        stepCode: "q002",
        question: "Do you already have a bank account with us?",
        questionDescription: "",
        optionType: "radio",
        options: [
            {
                answer: "Yes",
                nextStep: "a001"
            },
            {
                answer: "No",
                nextStep: "a004"
            }
        ]
    },
    {
        stepCode: "q003",
        question: "How much do you have to lock away?",
        questionDescription: "",
        options: [
            {
                answer: "Over £1,000",
                nextStep: "a002"
            },
            {
                answer: "Less than £1000",
                nextStep: "a003"
            }
        ]
    }
]

// Collection of available results
const results = [
    {
        stepCode: "a001",
        accountType: "Instant Access",
        accountName: "Online Saver",
        accountDescription: "An instant access account, with an exclusive rate for Co-operative Bank current account holders only. Sole accounts only.",
        accountInterest: "2.65% gross / AER variable",
        minimumDeposit: "£1",
        img: "https://www.co-operativebank.co.uk/contentAsset/raw-data/4823f132-5b94-4d8f-b894-4c708b8323ac/fileAsset?language_id=1"
    },
    {
        stepCode: "a002",
        accountType: "Fixed Term",
        accountName: "Fixed Term Deposit (1 year)",
        accountDescription: "A fixed term deposit for all savers. Sole and joint accounts available.",
        accountInterest: "4.75% gross / AER fixed (annually). Monthly interest option available",
        minimumDeposit: "£1,000",
        img: "https://www.co-operativebank.co.uk/contentAsset/raw-data/9421baa2-0e84-4f93-9dd3-c4ec488ec238/fileAsset?language_id=1"
    },
    {
        stepCode: "a003",
        accountType: "Limited Access",
        accountName: "Select Access Saver",
        accountDescription: "A limited access account for all savers. Sole accounts and joint accounts available.",
        accountInterest: "3.25% gross / AER variable. <br /> 1.31% gross / AER variable if you make five or more withdrawals in a calendar year",
        minimumDeposit: "£1",
        img: "https://www.co-operativebank.co.uk/contentAsset/raw-data/6c5e83e0-46e9-465d-95e4-3fbfa5c5ece9/fileAsset?language_id=1"
    },
    {
        stepCode: "a004",
        accountType: "Instant Access",
        accountName: "Smart Saver",
        accountDescription: "An instant access account for all savers. Sole accounts and joint accounts available.",
        accountInterest: "1.81% gross / AER variable",
        minimumDeposit: "£1",
        img: "https://www.co-operativebank.co.uk/contentAsset/raw-data/ca6d3f14-4514-42db-a1f7-3374dd980bf1/fileAsset?language_id=1"
    }
]