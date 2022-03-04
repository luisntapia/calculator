// track
let lastBtn;
let lastNum;
let lastOp;
let currOp = "";
let total = 0;
let isDebugging = false;
const inputList = [];
const masterList = [];

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

ac.addEventListener("click", resetCalc);
del.addEventListener("click", () => {
  screen.textContent = screen.textContent.slice(0, -1);
});

calcBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const btnTxt = button.textContent;
    if (screen.textContent === "0" && isNum(btnTxt) && !isOperator(lastBtn)) {
      resetCalc();
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
      } else if (isOperator(lastBtn)) {
        screen.textContent = "0.";
        inputList.push(convertOperator(lastBtn));
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

calcBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (!validateOperationList(inputList)) {
      debugger;
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

function clickRandomBtns() {
  if (isDebugging) return "Already debugging";
  isDebugging = true;
  clickerPromise()
    .then((message) => {
      console.log(message);
      const clickEvent = new CustomEvent("click");
      while (isDebugging) {
        const randomInt = getRandomInt(calcBtns.length);
        const randomBtn = calcBtns[randomInt];
        randomBtn.dispatchEvent(clickEvent);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function stopRandomClicking() {
  if (isDebugging) {
    isDebugging = false;
  } else {
    return "Already stopped";
  }
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
