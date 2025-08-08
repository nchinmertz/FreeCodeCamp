const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSepecialAttack = document.getElementById("special-attack");
const creatureSpecialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

const resetInfo = () =>{
    creatureName.textContent = "";
    creatureId.textContent = "";
    creatureWeight.textContent = "";
    creatureHeight.textContent = "";
    creatureHp.textContent = "";
    creatureAttack.textContent = "";
    creatureDefense.textContent = "";
    creatureSepecialAttack.textContent = "";
    creatureSpecialDefense.textContent = "";
    creatureSpeed.textContent = "";
    creatureTypes.textContent = "";
};

const displayInfo = (info) =>{
    creatureName.textContent = `${info.name.toUpperCase()}`;
    creatureId.textContent = `#${info.id}`;
    creatureWeight.textContent = `Weight: ${info.weight}`;
    creatureHeight.textContent = `Height: ${info.height}`;
    creatureHp.textContent = `${info.stats[0].base_stat}`;
    creatureAttack.textContent = `${info.stats[1].base_stat}`;
    creatureDefense.textContent = `${info.stats[2].base_stat}`;
    creatureSepecialAttack.textContent = `${info.stats[3].base_stat}`;
    creatureSpecialDefense.textContent = `${info.stats[4].base_stat}`;
    creatureSpeed.textContent = `${info.stats[5].base_stat}`;
    creatureTypes.innerHTML = info.types.map(type => `<p>${type.name}</p>`).join("");
    
};

const getCreature = async () => {
    try {
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${userInput.value.toLowerCase()}`);
        const data = await res.json();  
        displayInfo(data);
        //console.log(data)
    } catch (err) {
        resetInfo();
        alert("Creature not found");
        //console.log(err);
    }
};

searchBtn.addEventListener("click", getCreature);