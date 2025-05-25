function divide(num1, num2) {
  return num1 / num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}

let firstOperand = 0;
let secondOperand = 0;
let activeOperator = 0;
let result = 0;
let justCalculated = false;

function operate(firstOperand, secondOperand, activeOperator) {
  //Convert string values into numbers
  firstOperand = +firstOperand;
  secondOperand = +secondOperand;

  //Check what's the active operator and call the related function
  switch (activeOperator) {
    case "divide":
      if (secondOperand === 0) {
        display.textContent = "lmao";
      } else {
        result = divide(firstOperand, secondOperand);
        //If result has > 10 num reduce it to just 9 after 0, if not return result
        display.textContent =
          result.toString().length > 10 ? result.toExponential(4) : result;
      }
      break;

    case "multiply":
      result = multiply(firstOperand, secondOperand);
      //If result has > 10 num display it in scientific notation, if not return result
      display.textContent =
        result.toString().length > 10 ? result.toExponential(4) : result;
      break;

    case "add":
      result = add(firstOperand, secondOperand);

      display.textContent =
        result.toString().length > 10 ? result.toExponential(4) : result;
      break;

    case "subtract":
      result = subtract(firstOperand, secondOperand);

      display.textContent =
        result.toString().length > 10 ? result.toExponential(4) : result;
      break;

    default:
      return;
  }
  clearAll();
}

function clearAll() {
  firstOperand = "";
  secondOperand = "";
  activeOperator = "";
}

const container = document.querySelector(".container");
const display = document.querySelector(".display");

//Take the second operand from the screen, perform the calculation and make the result the first operand for the next calculation with the selected operator, also leave a flag that a calculation was performed.
function handleSecondOperation() {
  secondOperand = display.textContent;
  operate(firstOperand, secondOperand, activeOperator);
  firstOperand = display.textContent;
  justCalculated = true;
}

container.addEventListener("click", handleClick);

//Check what was the clicked button inside container
function handleClick(e) {
  const clickedButton = e.target.closest("button");
  if (!clickedButton) return;

  const action = clickedButton.dataset.action;
  const value = clickedButton.dataset.value;

  switch (action) {
    case "number":
      if (display.textContent === "0" || justCalculated) {
        display.textContent = "";
        display.textContent = value;
        justCalculated = false;
      } else {
        if (display.textContent.length >= 10) {
          display.removeEventListener("click", handleClick);
        } else {
          display.textContent += value;
        }
      }
      break;

    case "multiply":
      if (activeOperator != "") {
        handleSecondOperation();
        activeOperator = action;
      } else {
        firstOperand = display.textContent;
        activeOperator = action;
        justCalculated = true;
      }
      break;

    case "divide":
      if (activeOperator != "") {
        handleSecondOperation();
        activeOperator = "divide";
      } else {
        firstOperand = display.textContent;
        activeOperator = "divide";
        justCalculated = true;
      }
      break;

    case "add":
      if (activeOperator != "") {
        handleSecondOperation();
        activeOperator = action;
      } else {
        firstOperand = display.textContent;
        activeOperator = action;
        justCalculated = true;
      }
      break;

    case "subtract":
      if (activeOperator != "") {
        handleSecondOperation();
        activeOperator = action;
      } else {
        firstOperand = display.textContent;
        activeOperator = action;
        justCalculated = true;
      }
      break;

    case "equal":
      secondOperand = display.textContent;
      operate(firstOperand, secondOperand, activeOperator);
      justCalculated = true;
      break;

    case "dot":
      display.textContent += value;
      break;

    case "erase":
      display.textContent = display.textContent.slice(0, -1);
      break;

    case "all-clear":
      display.textContent = 0;
      firstOperand = "";
      secondOperand = "";
      activeOperator = "";
      result = "";
      justCalculated = true;
      break;
  }
}