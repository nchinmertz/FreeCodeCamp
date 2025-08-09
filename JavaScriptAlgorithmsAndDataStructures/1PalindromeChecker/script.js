const userInput = document.getElementById("text-input")
const checkBtn = document.getElementById("check-btn")
const ret = document.getElementById("result")

const checkPalindrome = (input) =>{
    const originalInput = input;
    if (input===""){
        alert("Please input a value");
        return;
    }
    ret.replaceChildren();

    const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
    let resultMsg = `${originalInput} ${
      lowerCaseStr === [...lowerCaseStr].reverse().join('') ? 'is' : 'is not'
    } a palindrome.`;

    const pTag = document.createElement('p');
    pTag.className = 'output';
    pTag.innerText = resultMsg;
    ret.appendChild(pTag);

    ret.classList.remove('hidden');
}

checkBtn.addEventListener("click", () => {
    checkPalindrome(userInput.value);
    userInput.value = "";
})