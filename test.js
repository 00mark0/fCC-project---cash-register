let price = 19.5;
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

let cash = 20;
let change = cash - price;
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

function reduceChangeToZero(change, cid) {
  let subtractedValues = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    let currencyName = cid[i][0];
    let currencyTotalValue = cid[i][1];
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

    cid[i][1] = currencyTotalValue;
    subtractedValues.push([currencyName, subtractedValue]);
  }

  return { cid, subtractedValues };
}

console.log(reduceChangeToZero(change, cid));

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
