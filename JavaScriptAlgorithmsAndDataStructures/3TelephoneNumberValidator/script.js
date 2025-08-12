const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

function checkUserInput(){
    if (userInput.value === "") {
        alert("Please provide a phone number");
        return;
    }else{
        const regex = /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})([\s\-]?)([0-9]{3}[\s\-]?[0-9]{4}$)/;
        result.innerHTML = `<p>${(regex.test(userInput.value)?"Valid US number: ":"Invalid US number: ")+userInput.value}</p>`;
    }
}

checkBtn.addEventListener("click", checkUserInput);
clearBtn.addEventListener("click", ()=>{result.innerHTML=""})