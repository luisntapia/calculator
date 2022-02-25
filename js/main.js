// display

let lastBtn;
let lastNum;
let lastOp;
let currOp = "";
let total = 0;
const inputList = [];
const masterList = [];

const operation = document.getElementById("operation");
const screen = document.getElementById("screen");
// numbers
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
// operators
const division = document.getElementById("division");
const multiplication = document.getElementById("multiplication");
const subtraction = document.getElementById("subtraction");
const addition = document.getElementById("addition");
// actions
const ce = document.getElementById("clear");
const equals = document.getElementById("equals");

const numsAndOperators = document.querySelectorAll(".num, .opr");
const operators = document.querySelectorAll(".opr");
const nums = document.querySelectorAll(".num");
const calcBtns = document.querySelectorAll("#calculator button");

calcBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (!validateOperationList(inputList)) {
      debugger;
    }
  });
});

ce.addEventListener("click", resetCalc);

calcBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const btnTxt = button.textContent;
    if (screen.textContent === "0" && isNum(btnTxt)) {
      screen.textContent = btnTxt;
    } else if (total === 0 && screen.textContent === "") {
      if (isNum(btnTxt) || btnTxt === "-") {
        screen.textContent += btnTxt;
      }
    } else if (isNum(btnTxt)) {
      if (lastBtn === "=") {
        resetCalc();
        screen.textContent = btnTxt;
      } else if (isNum(lastBtn) || screen.textContent === "-") {
        screen.textContent += btnTxt;
      } else if (isOperator(lastBtn)) {
        screen.textContent = btnTxt;
        inputList.push(convertOperator(lastBtn));
      }
    } else if (isOperator(btnTxt)) {
      if (btnTxt === "-" && lastBtn === "=") {
        // return;
      } else if (btnTxt === "-" && isOperator(lastBtn)) {
        // return;
      } else if (btnTxt === "-" && isOperator(lastBtn)) {
        inputList.push(lastBtn);
        screen.textContent = btnTxt;
      } else if (screen.textContent === "" || screen.textContent === "-") {
        // return;
      } else if (isOperator(lastBtn) || lastBtn === "=") {
        // return;
      } else {
        inputList.push(Number(screen.textContent));
        total = operateList(inputList);
      }
    } else if (btnTxt === ".") {
      if (lastBtn === "=") {
        resetCalc();
        screen.textContent = "0.";
      } else if (screen.textContent.includes(".")) {
        return;
      } else if (screen.textContent === "-" || screen.textContent === "") {
        screen.textContent += "0.";
      } else {
        screen.textContent += btnTxt;
      }
    } else if (btnTxt === "=") {
      if (lastBtn === "=" || isOperator(lastBtn)) {
        // return;
      } else if (screen.textContent === "" || screen.textContent === "-") {
        // return;
      } else {
        inputList.push(Number(screen.textContent));
        total = operateList(inputList);
        screen.textContent = total;
      }
    }
    //
    if (isNum(btnTxt)) {
      lastNum = btnTxt;
    } else {
      lastOp = btnTxt;
    }

    lastBtn = btnTxt;
    if (isNum(btnTxt)) {
      masterList.push(Number(btnTxt));
    } else {
      masterList.push(btnTxt);
    }
  });
});

// selection
function selectLastItem(str, negativeIndex = 1) {
  if (!str) return "";
  const regex = /[^ ]+/g;
  const items = str.match(regex);
  return items[items.length - negativeIndex];
}

function replaceLastItem(str, replacement) {
  let newStr;
  const replaced = selectLastItem(str);
  newStr = str.slice(0, str.length - replaced.length);
  newStr += replacement;
  return newStr;
}

// validation
function isOperator(str) {
  const operators = ["+", "-", "x", "*", "÷", "/"];
  return operators.includes(str);
}

function isAddOrSub(opr) {
  return opr === "+" || opr === "-";
}

function isMultOrDiv(opr) {
  return opr === "x" || opr === "*" || opr === "÷" || opr === "/";
}

function isNum(str) {
  const regex = /\d*\.?\d+/;
  return regex.test(str);
}
// operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, num1, num2) {
  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "ERROR: invalid operator";
  }
}

function solveStrOperation(strOp) {
  const regex = /[^ ]+/g;
  const items = strOp.match(regex);
  let currentOp = "";
  let result;
  for (let i = 0; i < items.length; i++) {
    currentOp += " " + items[i] + " ";
    const currentOpElements = currentOp.match(regex);
    if (currentOpElements.length === 3) {
      const num1 = Number(currentOpElements[0]);
      const num2 = Number(currentOpElements[2]);
      let operator = currentOpElements[1];
      operator = convertOperator(operator);
      result = operate(operator, num1, num2);
      currentOp = String(result);
    }
  }
  return result;
}

function convertOperator(op) {
  if (/[x*]/.test(op)) {
    return "*";
  } else if (/[÷/]/.test(op)) {
    return "/";
  } else if (op === "+" || op === "-") {
    return op;
  }
}

function operateList(arr) {
  let total = 0;
  let operator;

  if (!validateOperationList(arr)) {
    return "ERROR: invalid array";
  }
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      total = arr[i];
    } else if (typeof arr[i] === "string") {
      operator = convertOperator(arr[i]);
    } else if (typeof arr[i] === "number") {
      total = operate(operator, total, arr[i]);
    }
  }

  return total;
}

function validateOperationList(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0 && !isNum(arr[i]) && typeof arr[i] !== "number") {
      return false;
    }
    if (i % 2 === 1 && !isOperator(arr[i])) {
      return false;
    }
  }
  return true;
}

function resetCalc() {
  operation.textContent = "";
  screen.textContent = "";
  inputList.length = 0;
  total = 0;
  lastBtn = undefined;
}
