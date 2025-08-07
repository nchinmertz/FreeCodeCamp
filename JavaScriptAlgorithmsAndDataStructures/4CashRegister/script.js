let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const changeDueDisplay = document.getElementById('change-due');
const cashGiven = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

const formatResults = (status, change) => {
    changeDueDisplay.innerHTML = `<p>Status: ${status}</p>`;
    for(let i=0; i<9; i++){
        changeDueDisplay.innerHTML += `<p>${change[i][0]}: \$${change[i][1]}</p>`;
    }
};

const checkCashRegister = () => {
    const cashCents = Math.round(Number(cashGiven.value) * 100);
    const priceCents = Math.round(price * 100);
    if (cashCents < priceCents) {
        alert('Customer does not have enough money to purchase the item');
        //cashGiven.value = '';
        return;
    }

    if (cashCents === priceCents) {
        changeDueDisplay.innerHTML =
        '<p>No change due - customer paid with exact cash</p>';
        //cashGiven.value = '';
        return;
    }

    let totalCID = 0;
    const reversedCID = cid.reverse();
    for(let i=0; i<9;i++){
        const amount = Math.round(reversedCID[i][1]*100)
        reversedCID[i][1] = amount;
        totalCID += amount;
    }
    let changeDue = cashCents - priceCents;
    const result = { status: 'OPEN', change: [] };
    const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  
    if (totalCID < changeDue) {
        changeDueDisplay.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        return;
    }

    if (totalCID === changeDue) {
        result.status = 'CLOSED';
    }

    for (let i = 0; i <= reversedCID.length; i++) {
        if (changeDue >= denominations[i] && changeDue > 0) {
            const [denominationName, total] = reversedCID[i];
            const possibleChange = Math.min(total, changeDue);
            const count = Math.floor(possibleChange / denominations[i]);
            const amountInChange = count * denominations[i];
            changeDue -= amountInChange;
            if (count > 0) {
                result.change.push([denominationName, amountInChange / 100]);
            }
        }
    }
    if (changeDue > 0) {
        changeDueDisplay.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        return;
    }
    formatResults(result.status, result.change);
};

const checkResults = () => {
  if (!cashGiven.value) {
    return;
  }
  checkCashRegister();
};
purchaseBtn.addEventListener('click', checkResults);