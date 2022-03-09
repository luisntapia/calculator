"use strict";

// track
let isDebugging = false;

// display
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
const decimal = document.getElementById("decimal");
// operators
const division = document.getElementById("division");
const multiplication = document.getElementById("multiplication");
const subtraction = document.getElementById("subtraction");
const addition = document.getElementById("addition");

// actions
const ac = document.getElementById("clear");
const del = document.getElementById("backspace");
const equals = document.getElementById("equals");

// groups
const calcBtns = document.querySelectorAll("#calculator button");

// operations
let result = 0;
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
let operandState = "adding_first";

// regexes
const DOT = /\./;
const DIGIT = /[0-9]/;
const NEGATIVE = /\-/;
const OPERATOR = /[\+\-x\*÷]/;
const EQUALS = /=/;
const MINUS = /-/;
const MULT_OR_DIV = /[x\*\/÷]/;

ac.addEventListener("click", resetCalc);
del.addEventListener("click", () => {
  screen.textContent = screen.textContent.slice(0, -1);
});

calcBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.textContent;
    switch (operandState) {
      case "adding_first":
        if (screen.textContent === "0" || screen.textContent === "") {
          if (DIGIT.test(input) || NEGATIVE.test(input) || DOT.test(input)) {
            if (DIGIT.test(input) || NEGATIVE.test(input)) {
              screen.textContent = input;
            } else if (DOT.test(input)) {
              screen.textContent = "0.";
            }
          }
        } else if (screen.textContent === "-") {
          if (DIGIT.test(input) || DOT.test(input)) {
            screen.textContent += input;
          } else {
            return;
          }
        } else if (DIGIT.test(input) || DOT.test(input)) {
          if (DOT.test(input)) {
            if (screen.textContent.includes(".")) {
              return;
            } else {
              screen.textContent += ".";
            }
          } else if (DIGIT.test(input)) {
            screen.textContent += input;
          }
        } else if (OPERATOR.test(input)) {
          const screenValue = Number(screen.textContent);
          firstOperand = screenValue;
          operator = convertOperator(input);
          operandState = "waiting_second";
        }
        break;
      case "waiting_second":
        if (MINUS.test(input) && MULT_OR_DIV.test(operator)) {
          screen.textContent = input;
          operandState = "adding_second";
        } else if (OPERATOR.test(input)) {
          operator = convertOperator(input);
        } else if (DIGIT.test(input) || DOT.test(input) || MINUS.test(input)) {
          if (DOT.test(input)) {
            screen.textContent = "0.1";
          } else if (DIGIT.test(input)) {
            screen.textContent = input;
          }
          operandState = "adding_second";
        }
        break;
      case "adding_second":
        if (screen.textContent === "0" || screen.textContent === "") {
          if (DIGIT.test(input) || NEGATIVE.test(input) || DOT.test(input)) {
            if (DIGIT.test(input) || NEGATIVE.test(input)) {
              screen.textContent = input;
            } else if (DOT.test(input)) {
              screen.textContent = "0.";
            }
          }
        } else if (screen.textContent === "-") {
          if (DIGIT.test(input) || DOT.test(input)) {
            screen.textContent += input;
          } else {
            return;
          }
        } else if (DIGIT.test(input) || DOT.test(input)) {
          if (DOT.test(input)) {
            if (screen.textContent.includes(".")) {
              return;
            } else {
              screen.textContent += ".";
            }
          } else if (DIGIT.test(input)) {
            screen.textContent += input;
          }
        } else if (OPERATOR.test(input) || EQUALS.test(input)) {
          secondOperand = Number(screen.textContent);
          const result = operate(operator, firstOperand, secondOperand);
          screen.textContent = result;
          operation.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
          firstOperand = result;

          if (OPERATOR.test(input)) {
            operandState = "waiting_second";
          } else if (EQUALS.test(input)) {
            operandState = "result_displayed";
          }
        }
        break;
      case "result_displayed":
        if (OPERATOR.test(input)) {
          operator = convertOperator(input);
          operandState = "waiting_second";
        } else if (DIGIT.test(input) || DOT.test(input)) {
          if (DIGIT.test(input)) {
            screen.textContent = input;
          } else if (DOT.test(input)) {
            screen.textContent = "0.";
          }
          operandState = "adding_first";
        }
        break;
    }
  });
});

window.addEventListener("keydown", clickBtnFromKeyboard);

function clickerPromise() {
  return new Promise((resolve, reject) => {
    if (isDebugging) {
      resolve("Ready to click");
    } else {
      reject("Clicking stopped");
    }
  });
}

function clickBtnFromKeyboard(e) {
  const key = e.key;
  if (key === "0") {
    zero.click();
  } else if (key === "1") {
    one.click();
  } else if (key === "2") {
    two.click();
  } else if (key === "3") {
    three.click();
  } else if (key === "4") {
    four.click();
  } else if (key === "5") {
    five.click();
  } else if (key === "6") {
    six.click();
  } else if (key === "7") {
    seven.click();
  } else if (key === "8") {
    eight.click();
  } else if (key === "9") {
    nine.click();
  } else if (key === ".") {
    decimal.click();
  } else if (e.ctrlKey && key === "Backspace") {
    ac.click();
  } else if (key === "Backspace") {
    del.click();
  } else if (key === "/") {
    division.click();
  } else if (key === "*") {
    multiplication.click();
  } else if (key === "+") {
    addition.click();
  } else if (key === "-") {
    subtraction.click();
  } else if (key === "Enter" || key === "=") {
    equals.click();
  }
}

// validation
function isOperator(str) {
  const operators = ["+", "-", "x", "*", "÷", "/"];
  return operators.includes(str);
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

function convertOperator(op) {
  if (/[x*]/.test(op)) {
    return "*";
  } else if (/[÷/]/.test(op)) {
    return "/";
  } else if (op === "+" || op === "-") {
    return op;
  }
}

function resetCalc() {
  operation.textContent = "";
  screen.textContent = "";
  firstOperand = 0;
  secondOperand = 0;
  operator = "";
  operandState = "adding_first";
}
