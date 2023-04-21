const KEY = "abc123blahblahblah";

var inputEmail = document.getElementById("email");
var inputUname = document.getElementById("uname");
var inputPW = document.getElementById("pw");
var inputConfirmPW = document.getElementById("confirmpw");
function checkInput(inputEmail, inputUname, inputPW, inputConfirmPW) {
    
}

inputPW.onkeyup = function() {

    if (inputUname[0].value.match(/[a-z]/g)) {
        if (inputUname[0].value.match(/[A-Z]/g)) {
            if (inputUname.length >= 3) {

            }
        }
    }

    if (inputPW.length >= 8) {
        for (let i = 0; i < inputPW.length; i++) {
            if (inputPW[i].value.match(/[0-9]/g)) {
                i = 8;
            } else {
            }
        }
    }

}