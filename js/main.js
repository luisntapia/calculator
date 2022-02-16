// display
let displayValue = "";
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

numsAndOperators.forEach((button) => {
  button.addEventListener("click", () => {
    const lastItem = selectLastItem(displayValue);
    const penultimalItem = selectLastItem(displayValue, 2);
    const value = button.textContent;
    // validate space or not
    const spaceNeeded =
      isMultOrDiv(lastItem) ||
      isOperator(value) ||
      (isAddOrSub(lastItem) &&
        !isAddOrSub(penultimalItem) &&
        !(isNum(value) && isAddOrSub(lastItem) && isMultOrDiv(penultimalItem)));

    const validInput =
      value.match(/\d*\.?\d+/) ||
      (/\./.test(value) && !lastItem.includes(".")) ||
      (isAddOrSub(value) && (isNum(lastItem) || isMultOrDiv(lastItem))) ||
      (isMultOrDiv(value) && isNum(lastItem));

    const replaceInput =
      ((isMultOrDiv(lastItem) || /\+/.test(lastItem)) &&
        (isMultOrDiv(value) || /\+/.test(value)) &&
        !isMultOrDiv(penultimalItem)) ||
      (/\-/.test(lastItem) &&
        isOperator(value) &&
        !isMultOrDiv(penultimalItem));

    if (!validInput) {
      if (replaceInput) {
        displayValue = replaceLastItem(displayValue, value);
      } else {
        return;
      }
    } else {
      if (spaceNeeded) displayValue += " ";
      displayValue += value;
    }

    screen.textContent = displayValue;
  });
});

ce.addEventListener("click", () => {
  displayValue = "";
  screen.textContent = displayValue;
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
