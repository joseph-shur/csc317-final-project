
let inputEmail = document.getElementById("email");
let inputUsername = document.getElementById("username");
let inputPassword = document.getElementById("password");
let inputConfirmPassword = document.getElementById("confirmpassword");

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

    let usernameString = username.value;

    let firstChar = usernameString.charAt(0);

    if (username.value.length >= 3) {
        if (firstChar.match(/[a-z]/i)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

function validatePassword (password) {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (password.length >= 8) {
            return re.test(password);
        } else {
            return false
        }
}

function validateConfirmPassword (confirmPassword, password) {
    validatePassword(inputPassword);

    if (confirmPassword.value === password) {
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

    console.log(username);

    if (validateUsername(inputUsername) === true) {
        userInput.classList.add('valid-text');
        userInput.classList.remove('invalid-text');
    } else {
        userInput.classList.remove('valid-text');
        userInput.classList.add('invalid-text');
    }
});

document.getElementById("password").addEventListener("input", function (ev) {
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
document.getElementById("confirmpassword").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let confirmPassword = userInput.value;

    if (inputPassword.value === inputConfirmPassword.value) {
        userInput.classList.add('valid-text');
        userInput.classList.remove('invalid-text');
    } else {
        userInput.classList.remove('valid-text');
        userInput.classList.add('invalid-text');
    }
});

//button submission, should have every validate____() function included
document.getElementById("reg-form").addEventListener("submit", function (ev) {
    if (validateEmail(inputEmail) === true) {
        if (validateUsername(inputUsername) === true) {
            if (validatePassword(inputPassword.value) === true) {
                if (validateConfirmPassword(inputConfirmPassword.value) === true) {
                    console.log("It worked");
                } else {
                    ev.preventDefault();
                    console.log("ConfirmPassword not validated");
                }
            } else {
                ev.preventDefault();
                console.log("Password not validated");
            }
        } else {
            ev.preventDefault();
            console.log("Username not validated");
        }
    } else {
        ev.preventDefault();
        console.log("Email not validated");
    }
    console.log(ev);
});
