//Operator functions
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
function percent(num1) {
 return Number(num1) / 100;
}

let firstOperand = 0;
let secondOperand = 0;
let activeOperator = 0;
let result = 0;
let justCalculated = false;
let dotForbidden = false;

//Operate function: this will take the variables and call the necessary operator function

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
        //If result has 10+ num, convert to scientific notation, if not return result
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
const addBtn = document.querySelector(".add")

//Take second operand from display, perform calculation, make result the first operand for next calculation with selected operator, also leave a flag that a calculation was performed.
function handleSecondOperation() {
  secondOperand = display.textContent;
  operate(firstOperand, secondOperand, activeOperator);
  firstOperand = display.textContent;
  justCalculated = true;
}

container.addEventListener("click", handleClick);

//Check what was the clicked button inside container and do something about it
function handleClick(e) {
  //Find the closest button to the clicked element
  const clickedButton = e.target.closest("button");
  if (!clickedButton) return;

  //Use previously set data-action and data-value in HTML
  const action = clickedButton.dataset.action;
  const value = clickedButton.dataset.value;

  switch (action) {
    case "number":
      //Clean display and write new input after calculation
      if (display.textContent === "0" || justCalculated) {
        display.textContent = "";
        display.textContent = value;
        dotForbidden = false;
        justCalculated = false;
      } else {
        //Stop listening if 10 numbers on display
        if (display.textContent.length >= 10) {
          display.removeEventListener("click", handleClick);
        } else {
          display.textContent += value;
        }
      }
      break;

    case "multiply":
      // If there's a pending operation and the user enters a new number followed by another operator, calculate the result. Else just activate the operator and wait for second operand.
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
      dotForbidden = true;
      justCalculated = true;
      break;

    case "percent":
     display.textContent = percent(display.textContent);
     break;

    case "dot":
      if (display.textContent.includes(".") || dotForbidden) {
        return
      } else {
        display.textContent += value;
      }
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
      justCalculated = false;
      dotForbidden = false;
      break;
  }
}