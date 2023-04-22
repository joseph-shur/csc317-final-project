
let inputEmail = document.getElementById("email");
let inputUsername = document.getElementById("username");
let inputPassword = document.getElementById("pw");
let inputConfirmPassword = document.getElementById("confirmpw");

var digitsRegex = /[0-9]/;
var alphaRegex = /[A-Za-z]/;

function validateEmail (email) {
    if (email.value.indexOf("@", 0) >= 0) {
        if (email.value.indexOf(".", 0) >= 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
function validateUsername (username) {
    var includesNumber = digitsRegex.test(username);
    var includesLetter = alphaRegex.test(username);

    if (username.length >= 3) {
        return true
    } else {
        return false
    }
}

function validatePassword (password) {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return re.test(password);
}

function validateConfirmPassword (confirmPassword, password) {
    if (confirmPassword.value === password.value) {
        return true
    } else {
        return false
    }
}

document.getElementById("email").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let email = userInput.value;

    if (validateEmail(inputEmail) === true) {
        userInput.classList.add('valid-text');
        userInput.classList.remove('invalid-text');
    } else {
        userInput.classList.remove('valid-text');
        userInput.classList.add('invalid-text');
    }
});

document.getElementById("username").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let username = userInput.value;

    if (validateUsername(inputUsername) === true) {
        userInput.classList.add('valid-text');
        userInput.classList.remove('invalid-text');
    } else {
        userInput.classList.remove('valid-text');
        userInput.classList.add('invalid-text');
    }
});

document.getElementById("pw").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let password = userInput.value;

    if (validatePassword(password) === true) {
        userInput.classList.add('valid-text');
        userInput.classList.remove('invalid-text');
    } else {
        userInput.classList.remove('valid-text');
        userInput.classList.add('invalid-text');
    }
});
document.getElementById("confirmpw").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let confirmpassword = userInput.value;

    if (validateConfirmPassword(confirmpassword, password) === true) {
        userInput.classList.add('valid-text');
        userInput.classList.remove('invalid-text');
    } else {
        userInput.classList.remove('valid-text');
        userInput.classList.add('invalid-text');
    }
});

//button submission, should have every validate____() function included
document.getElementById("reg-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    console.log(ev);
});