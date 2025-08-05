const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.querySelector(".rules-container");

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

function rollDice(){
  diceValuesArr = [];
  listOfAllDice.forEach((dice) => {
    const num = Math.floor(Math.random() * 6) + 1
    dice.textContent = num;
    diceValuesArr.push(num)
    });
};

function updateStats(){
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
}

function updateRadioOption(index, score){
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].textContent = `, score = ${score}`
}

function updateScore(selectedValue, achieved){
    score+=parseInt(selectedValue);
    totalScoreElement.textContent = score;
    scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
}

function getHighestDuplicates(arr){
    const numAppear = [0,0,0,0,0,0];
    arr.forEach((num)=>{numAppear[num-1]+=1;})
    const sumOfDice = arr.reduce((a, b) => a + b, 0);
    numAppear.forEach((count)=>{
        if(count>=4){
            updateRadioOption(1, sumOfDice)
            updateRadioOption(0, sumOfDice)
        }if(count>=3){
            updateRadioOption(0, sumOfDice)
        }
    })
}

function detectFullHouse(arr){
    const numAppear = [0,0,0,0,0,0];
    arr.forEach((num)=>{numAppear[num-1]+=1;})
    let two = false;
    let three = false;
    numAppear.forEach((count)=>{
        if(count===2){two=true;}
        else if(count===3){three=true;}
    })
    if(two&&three){
        updateRadioOption(2, 25);
    }
}

function resetRadioOptions(){
    for(let i=0; i<6;i++){
        scoreInputs[i].disabled = true;
        scoreInputs[i].checked = false;
        scoreSpans[i].textContent = "";
    }
}

function resetGame(){
    listOfAllDice.forEach((dice)=>dice.textContent="0")
    rolls = 0;
    score = 0;
    round = 1;
    totalScoreElement.textContent = score;
    scoreHistory.textContent = "";
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
    resetRadioOptions();
}

function checkForStraights(arr){
    const counts = [0,0,0,0,0,0];
    arr.forEach((num)=>{counts[num-1]+=1;})
    console.log(counts);
    let num_consecutive = 0;
    let i =0;
    while(i<6){
        if(counts[i]>=1){
            num_consecutive = 1;
            let j = i+1;
            while(j<6){
                if(counts[j]>=1){
                    num_consecutive += 1;
                    j += 1;
                }else{
                    break;
                }
            }
            if (num_consecutive>=4){
                console.log("Consecutive 4")
                updateRadioOption(3,30);
                if(num_consecutive>=5){
                    console.log("Consecutive 5")
                    updateRadioOption(4,40);
                }
            }
            num_consecutive = 0;
            i=j;
        }
        i+=1;
    }
}

rollDiceBtn.addEventListener("click", ()=>{
    
    if (rolls===3){
        alert("You have already rolled 3 times. Must select a score")
    }else{
        rolls+=1;
        rollDice();
        updateStats();
        getHighestDuplicates(diceValuesArr);
        detectFullHouse(diceValuesArr);
        checkForStraights(diceValuesArr);
        updateRadioOption(5,0);
    }
});

rulesBtn.addEventListener("click", ()=>{
    isModalShowing = !isModalShowing;
    rulesContainer.style.display = isModalShowing?"block":"none" ;
    rulesBtn.innerHTML = isModalShowing?"Hide rules":"Show rules"
})

keepScoreBtn.addEventListener("click",()=>{
    let selected = false
    let value;
    let id;

    for(const option of scoreInputs){
        if(option.checked){
            selected = true; 
            value = option.value;
            id = option.id;
            break;
        }
    }
    if(selected){
        rolls = 0;
        round += 1;
        updateStats();
        resetRadioOptions();
        updateScore(value, id);
        if(round>6){
            setTimeout(() => {alert(`Game Over! Your total score is ${score}`);resetGame();}, 500);
        }
    }else{
        alert("Please select an option or roll the dice");
        resetGame();
    }
})