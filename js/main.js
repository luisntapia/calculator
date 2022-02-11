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
    const value = button.textContent;
    displayValue += value;
    screen.textContent = displayValue;
  });
});

ce.addEventListener("click", () => {
  displayValue = "";
  screen.textContent = displayValue;
});

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
