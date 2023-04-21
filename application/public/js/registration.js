const KEY = "abc123blahblahblah";

var inputEmail = document.getElementById("email");
var inputUname = document.getElementById("uname");
var inputPW = document.getElementById("pw");
var inputConfirmPW = document.getElementById("confirmpw");
function submitForm(inputEmail, inputUname, inputPW, inputConfirmPW) {

}

function checkForm() {
    if (checkEmail === true) {
        if (checkUname() === true) {
            if (checkPassword() === true) {
                if (checkConfirmPassword() === true) {
                    
                }
            }
        }
    }
}

function checkEmail() {
    for (let i = 0; i < inputEmail.length; i++) {
        if (inputEmail[i] === "@") {
            return true
        } else {
            return false
        }
    }
}

function checkUname() {
    if (inputUname[0].value.match(/[a-z]/g)) {
        if (inputUname[0].value.match(/[A-Z]/g)) {
            if (inputUname.length >= 3) {
                return true
            }
        }
    }
}

function checkPassword() {
    if (inputPW.length >= 8) {
        for (let i = 0; i < inputPW.length; i++) {
            if (inputPW[i].value.match(/[0-9]/g)) {
                return true
            } else {
                return false
            }
        }
    }
}
function checkConfirmPassword() {
    if (inputConfirmPW.value = inputPW.value) {
        return true
    }
}