// Variable to store the reference to the main container 
let container = document.querySelector(".container");

// Declaring an empty array for storing questions
let questions = [];

// Variable to store current question
let currentQuestion = {}

// Variable to store current question number
let questionNumber = 0;

// An array to store all the column names of the dataframe
let columnNames = [
                "self_employed","family_history",
                "work_interfere","no_employees","remote_work",
                "tech_company","benefits","care_options",
                "wellness_program","seek_help","anonymity",
                "leave","mental_health_consequence","phys_health_consequence",
                "coworkers","supervisor","mental_health_interview",
                "phys_health_interview","mental_vs_physical","obs_consequence"
            ]

// An array to store all the options selected by the user
let selectedOptions = [];

// A dictionary to store all the options selected by the user
let selectedOptionsDict = {};

// Variable to store reference of question on UI
const questionText = document.querySelector(".ques");

// Variable to store reference of options container on UI
const optionsGrid = document.querySelector(".opt_grid");

// Variable to store the radio buttons
let optionsRadio;

// Variable to store the result of survey
let result;

// Flag variable to store whether any option is selected or not
let flag;

// Flag variable to store whether the survey has ended or not
let endSurveyFlag = 0;

// Variable to store the reference of SnackBar
let snackBar = document.querySelector("#snack_bar");

// Variable to store the reference of Next button on UI
const nextButton = document.querySelector(".next_button");

// Defining a function to set a Cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Fetching all the questions from a JSON file 
fetch("questions.json").then(res => {
    return res.json();
}).then(receivedQuestions => {
    questions = receivedQuestions;
    getNextQuestion();
}).catch(error => {
    console.log("We were not able to fetch questions from the API!", error);
});

// Defining a function to get the next question 
getNextQuestion = () => {
    if (questionNumber < 20) {    
        // Variable to store ASCII code of 'A'
        let ASCII = 65;

        // Initializing the flag variable with 0
        flag = 0;

        // Emptying the options grid
        optionsGrid.innerHTML = "";

        // Getting the question from questions array
        currentQuestion = questions[questionNumber];

        // Setting the question on the UI
        questionText.innerHTML = "<span>Q" + (questionNumber + 1) + "</span><p>" + currentQuestion["question"] + "</p>";

        // Setting the option values on the UI
        currentQuestion["options"].forEach(option => {
            // Declaring a variable to store option integer value
            let optionIntValue;

            // Setting an integer value to each option according to their string value
            if (currentQuestion["options"].length == 3 && option == "Yes") { optionIntValue = 2; }
            else if (currentQuestion["options"].length == 2 && option == "Yes") { optionIntValue = 1; }
            else if ((currentQuestion["options"].includes("Some of them") || currentQuestion["options"].includes("Not sure")) && currentQuestion["options"].length == 3 && option == "No") { optionIntValue = 0; }
            else if (currentQuestion["options"].length == 3 && option == "No") { optionIntValue = 1; }
            else if (currentQuestion["options"].length == 2 && option == "No") { optionIntValue = 0; }
            else if (option == "Maybe") { optionIntValue = 0; }
            else if (option == "Some of them") { optionIntValue = 1; }
            else if (option == "Not Sure") { optionIntValue = 1; }
            else if (option == "Don't know") { optionIntValue = 0; }
            else if (option == "Never") { optionIntValue = 1; }
            else if (option == "Often") { optionIntValue = 2; }
            else if (option == "Rarely") { optionIntValue = 3; }
            else if (option == "Sometimes") { optionIntValue = 4; }
            else if (option == "1-5") { optionIntValue = 0; }
            else if (option == "100-500") { optionIntValue = 1; }
            else if (option == "26-100") { optionIntValue = 2; }
            else if (option == "500-1000") { optionIntValue = 3; }
            else if (option == "6-25") { optionIntValue = 4; }
            else if (option == "More than 1000") { optionIntValue = 5; }
            else if (option == "Somewhat difficult") { optionIntValue = 1; }
            else if (option == "Somewhat easy") { optionIntValue = 2; }
            else if (option == "Very difficult") { optionIntValue = 3; }
            else if (option == "Very easy") { optionIntValue = 4; }

            // Setting the options in the optionsGrid
            optionsGrid.innerHTML += 
                                    '<div class="option_container">' +
                                        '<input type="radio" name="option" class="option_radio" data-value="' + optionIntValue + '"/>' +
                                        '<div class="opt_child" data-number="1">' +
                                            '<div class="child_sr">' +
                                                '<p>&#' + ASCII + ';</p>' +
                                            '</div>' +
                                            '<p class="opt_text">' + option + '</p>' +
                                        '</div>' +
                                    '</div>';
            ASCII++;
        });

        // Variable to store all the radio buttons in an array
        optionsRadio = document.querySelectorAll(".option_radio");

        // Incrementing the question number
        questionNumber++;
    } else {
        if (questionNumber == 20) {
            console.log(questionNumber);
            columnNames.forEach((columnName, selectedOption) => selectedOptionsDict[columnName] = selectedOptions[selectedOption]);
            // console.log(selectedOptionsDict);
            getPredictions(selectedOptions);
        } else {
            console.log(questionNumber);
        }
    }
}

// Defining a function to save the selected option in an array
function saveSelectedAnswer() {
    optionsRadio.forEach(optionRadio => {
        if (optionRadio.checked) {
            flag = 1;
            selectedOptions.push(parseInt(optionRadio.dataset["value"]));
            console.log(selectedOptions);
        }
    })
}

// Defining a function get the prediction from the ML model
function getPredictions(selectedOptions) {
    // Creating a new XMLHttpRequest()
    const xhr = new XMLHttpRequest();

    // Requesting a response from server
    xhr.onload = function() {
        // var serverResponse = document.querySelector(".server_response");
        // serverResponse.innerHTML = this.responseText;
        setCookie("Result", this.responseText, 1);
        document.location.href = "result.html";
    }

    // Opening a POST request
    xhr.open("POST", "http://127.0.0.1:5000/PredictResults");

    // Defining the type of content(data) that is to be sent
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sending the actual data in the form: "key1=value1&key2=value2&key3=value3......so on"
    xhr.send(JSON.stringify({"Selected Options": selectedOptionsDict}));
}

// Defining a click event listener on next button
nextButton.addEventListener("click", () => {
    if (endSurveyFlag == 0) {
        // Saving the answer selected by the user
        saveSelectedAnswer();

        // Checking whether the user has selected an option
        if (flag == 0) {
            // Adding a message to the SnackBar
            snackBar.innerHTML = "Please select an option to continue!";

            // Displaying the SnackBar
            snackBar.className = "show";

            // Hiding the SnackBar
            setTimeout(function () { 
                snackBar.className = snackBar.className.replace("show", "");
            }, 3000);
        } else {
            // Displaying the next question if the user has selected any option
            getNextQuestion();
        }
    } else {
        console.log("The Survey has ended!");
    }
})