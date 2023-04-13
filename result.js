// Defining a function to get a cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Variable to store the result
let result = getCookie("Result");

// Variable to store the reference to Result Card
let resultCard = document.querySelector(".result");

// Variable to store the reference to emoji on Result Card
let emojiOnResultCard = document.querySelector(".box2");

// Variable to store Name on result card
let nameOnResultCard = document.querySelector(".name_on_result_card");

// Variable to store Age on result card
let ageOnResultCard = document.querySelector(".age_on_result_card");

// Variable to store Email on result card
let emailOnResultCard = document.querySelector(".email_on_result_card");

// Variable to store Result Text
let resultText = document.querySelector(".output_text");

nameOnResultCard.innerHTML = getCookie("Name");
ageOnResultCard.innerHTML = parseInt(getCookie("Age"));
emailOnResultCard.innerHTML = getCookie("Email");

if (result != 1) {
    resultCard.style.background = "#FFF5F5";
    emojiOnResultCard.src = "images/sad.svg";
    resultText.innerHTML = "After assessing your answers, we would suggest that you should definitely be seeking some healing!";
} else {
    emojiOnResultCard.src = "images/smilie.svg";
    resultText.innerHTML = "You have a Good Mental Health. You don’t need any kind of Healing!";
}



