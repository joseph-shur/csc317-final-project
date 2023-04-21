document.getElementById("email").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let username = userInput.value;
    if (username.length >= 3) {
        userInput.style.color = "green";
    } else {
        userInput.style.color = "red";
    }
});

function validateForm() {
    return true;


}

