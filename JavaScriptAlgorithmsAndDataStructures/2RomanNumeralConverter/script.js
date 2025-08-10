const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

function convertNumber(input){
    let m = ["", "M", "MM", "MMM"];
    let c = ["", "C", "CC", "CCC", "CD",
             "D", "DC", "DCC", "DCCC", "CM"];
    let x = ["", "X", "XX", "XXX", "XL",
             "L", "LX", "LXX", "LXXX", "XC"];
    let i = ["", "I", "II", "III", "IV",
             "V", "VI", "VII", "VIII", "IX"];

    return m[Math.floor(input / 1000)] + c[Math.floor((input % 1000) / 100)] + x[Math.floor((input % 100) / 10)] + i[input % 10];
}


const checkUserInput = () => {
    const ret = "";
    const inputInt = parseInt(numberInput.value);
    if (!numberInput.value || isNaN(inputInt)) {
        output.textContent = "Please enter a valid number";
    }else if(inputInt<0){
        output.textContent = "Please enter a number greater than or equal to 1";
    }else if(inputInt>=4000){
        output.textContent = "Please enter a number less than or equal to 3999";
    }else{
        output.textContent = convertNumber(inputInt)
    }
    output.classList.remove('hidden');
}

convertBtn.addEventListener("click", checkUserInput);