// Defining a function to set a Cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Variable to store the reference of SignUp button
let sign_up = document.querySelector(".signup_button");

// Variable to store the reference to Name input field
let inputName = document.querySelector(".input_name");

// Variable to store the reference to Age input field
let inputAge = document.querySelector(".input_age");

// Variable to store the reference to Name input field
let inputEmail = document.querySelector(".input_email");

// Variable to store the reference of SnackBar
let snackBar = document.querySelector("#snack_bar");

// Defining a click event listener on SignUp button
sign_up.addEventListener("click", () => {
    if (inputName.value != "" && inputAge.value != null && inputEmail.value != "") {    
        setCookie("Name", inputName.value, 1);
        setCookie("Age", inputAge.value, 1);
        setCookie("Email", inputEmail.value, 1);
        document.location.href = "survey.html";
    } else {
        // Adding a message to the SnackBar
        snackBar.innerHTML = "Please fill all the fields to continue!";

        // Displaying the SnackBar
        snackBar.className = "show";

        // Hiding the SnackBar
        setTimeout(function () { 
            snackBar.className = snackBar.className.replace("show", "");
        }, 3000);
    }
})