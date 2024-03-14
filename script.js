//connecting the dom
let cash = document.getElementById("cash");
let purchaseBtn = document.getElementById("purchase-btn");
let total = document.getElementById("total");
let cashInRegister = document.getElementById("cash-in-register");
let changeDue = document.getElementById("change-due");
let price = 19.5;
total.textContent = `Total: $${price}`;

//Function that draws from register and returns the the register after and subtracted values and shows status
function drawFromRegister(change, cashInReg) {
  let subtractedValues = [];

  for (let i = cashInReg.length - 1; i >= 0; i--) {
    let currencyName = cashInReg[i][0];
    let currencyTotalValue = cashInReg[i][1];
    let currencyUnitValue = currencyValues[currencyName];
    let subtractedValue = 0;

    while (change >= currencyUnitValue && currencyTotalValue > 0) {
      change -= currencyUnitValue;
      change = parseFloat(change.toFixed(2));
      currencyTotalValue = parseFloat(
        (currencyTotalValue - currencyUnitValue).toFixed(2)
      );
      subtractedValue += currencyUnitValue;
    }

    cashInReg[i][1] = currencyTotalValue;
    if (subtractedValue > 0) {
      subtractedValues.push([
        currencyName,
        parseFloat(subtractedValue.toFixed(2)),
      ]);
    }
  }

  if (change > 0) {
    return "INSUFFICIENT_FUNDS";
  }

  let status = "OPEN";
  for (let i = 0; i < cashInReg.length; i++) {
    if (cashInReg[i][1] !== 0) {
      status = "OPEN";
      break;
    }
    status = "CLOSED";
  }

  return { status, cashInReg, subtractedValues };
}

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

//Values of each currency to reduce the cid depending on change
let currencyValues = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

// this function updated the cid to the values after the change has been subtracted
function updateCashInRegister(cashInRegister) {
  while (cashInRegister.firstChild) {
    cashInRegister.removeChild(cashInRegister.firstChild);
  }

  let cashInRegisterHeader = document.createElement("p");
  let strongElement = document.createElement("strong");
  strongElement.textContent = "Cash in register:";
  cashInRegisterHeader.appendChild(strongElement);
  cashInRegister.appendChild(cashInRegisterHeader);

  let currencyNames = [
    "Pennies",
    "Nickels",
    "Dimes",
    "Quarters",
    "Ones",
    "Fives",
    "Tens",
    "Twenties",
    "Hundreds",
  ];
  for (let i = 0; i < cid.length; i++) {
    let p = document.createElement("p");
    p.textContent = `${currencyNames[i]}: $${cid[i][1]}`;
    cashInRegister.appendChild(p);
  }
}

// on click it displays the subtracted values in the dom and updates the cid and shows status
purchaseBtn.addEventListener("click", () => {
  let change = Number(cash.value - price);
  let result = drawFromRegister(change, cid);

  while (changeDue.firstChild) {
    changeDue.removeChild(changeDue.firstChild);
  }

  if (result === "INSUFFICIENT_FUNDS") {
    changeDue.textContent = "INSUFFICIENT_FUNDS";
    return;
  }

  if (cash.value < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (change === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    let changeDueHeader = document.createElement("p");
    let strongElement = document.createElement("strong");
    strongElement.textContent = `Status: ${result.status}`;
    changeDueHeader.appendChild(strongElement);
    changeDue.appendChild(changeDueHeader);

    for (let i = 0; i < result.subtractedValues.length; i++) {
      let p = document.createElement("p");
      p.textContent = `${result.subtractedValues[i][0]}: $${result.subtractedValues[i][1]}`;
      changeDue.appendChild(p);
    }
  }
  updateCashInRegister(cashInRegister);
});

// cid has to be shown in the dom before the purchase button is clicked
let cashInRegisterHeader = document.createElement("p");
let strongElement = document.createElement("strong");
strongElement.textContent = "Cash in register:";
cashInRegisterHeader.appendChild(strongElement);
cashInRegister.appendChild(cashInRegisterHeader);

let currencyNames = [
  "Pennies",
  "Nickels",
  "Dimes",
  "Quarters",
  "Ones",
  "Fives",
  "Tens",
  "Twenties",
  "Hundreds",
];
for (let i = 0; i < cid.length; i++) {
  let p = document.createElement("p");
  p.textContent = `${currencyNames[i]}: $${cid[i][1]}`;
  cashInRegister.appendChild(p);
}
