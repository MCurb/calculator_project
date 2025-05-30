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
//Gets called inside event handler function
function percent(num1) {
  return Number(num1) / 100;
}

const container = document.querySelector(".container");
const display = document.querySelector(".display");

let firstOperand;
let secondOperand;
let activeOperator;
let result;
let clearOnNextInput = false;

function performOperation(firstOperand, secondOperand, activeOperator) {
  //Convert string values into numbers
  firstOperand = +firstOperand;
  secondOperand = +secondOperand;

  switch (activeOperator) {
    case "divide":
      //Prevent division by zero
      if (secondOperand === 0) {
        display.textContent = "lmao";
      } else {
        result = divide(firstOperand, secondOperand);

        //Format result: use scientific notation if it's too long
        display.textContent = checkDisplayOverflow(result);
      }
      break;

    case "multiply":
      result = multiply(firstOperand, secondOperand);
      display.textContent = checkDisplayOverflow(result);
      break;

    case "add":
      result = add(firstOperand, secondOperand);
      display.textContent = checkDisplayOverflow(result);
      break;

    case "subtract":
      result = subtract(firstOperand, secondOperand);
      display.textContent = checkDisplayOverflow(result);
      break;

    default:
      return;
  }
  clear();
}

//Format result: use scientific notation if it's too long
function checkDisplayOverflow(result) {
  return result.toString().length > 10 ? result.toExponential(4) : result;
}

function clear() {
  firstOperand = "";
  secondOperand = "";
  activeOperator = "";
}

function appendNumber(value) {
  // Replace display if starting fresh or after a calculation
      if (display.textContent === "0" || clearOnNextInput) {
        replaceDisplay(value);
        //Take input if display has less than 10 digits
      } else if (display.textContent.length < 10) {
        display.textContent += value;
      }
}

// Replace display if starting fresh or after a calculation
function replaceDisplay(value) {
  display.textContent = "";
  display.textContent = value;
  clearOnNextInput = false;
}

function handleOperators(action, value) {
  // Handle operator logic: replace, chain, or assign depending on current state
      if (clearOnNextInput && activeOperator !== "") {
        replaceOperator(action, value);
      } else if (activeOperator !== "") {
        handleChainedOperators(action, value);
      } else {
        handleFirstOperator(action, value);
      }
}

// Handles operator chaining:
// - Uses the current display as second operand
// - Performs calculation
// - Updates firstOperand with the result
// - Updates the operator in the activeOperator variable
// - Updates the display to show the current operator
// - Flags that a calculation was just performed
function handleChainedOperators(action, value) {
  secondOperand = display.textContent;
  performOperation(firstOperand, secondOperand, activeOperator);
  firstOperand = display.textContent;
  activeOperator = action;
  display.textContent += value;
  clearOnNextInput = true;
}

// Replaces the current operator if a new one is selected:
// - Removes the previous operator from the display
// - Updates firstOperand in case the number changed
// - Sets and displays the new active operator
function replaceOperator(action, value) {
  display.textContent = display.textContent.slice(0, -1);
  firstOperand = display.textContent;
  activeOperator = action;
  display.textContent += value;
}

// Handles the first operator selection:
// - Stores the current display as firstOperand
// - Sets the active operator
// - Displays the operator symbol
// - Flags that a new number input should clear the screen
function handleFirstOperator(action, value) {
  firstOperand = display.textContent;
  activeOperator = action;
  display.textContent += value;
  clearOnNextInput = true;
}

function evaluateCalc() {
  //Prevent re-calculating if result is already displayed
      if (clearOnNextInput) {
        return;
      } else {
        //Store current display as second operand and perform calculation
        secondOperand = display.textContent;
        performOperation(firstOperand, secondOperand, activeOperator);

        // Set flag to clear display only if user starts typing a number (not an operator, dot or erase btn)
        // This allows chaining operations or modifying the result without erasing it
        clearOnNextInput = true;
      }
}

function appendDot(value) {
  // Prevent adding a dot if:
      // 1) A calculation just finished and an operator is active (waiting for next input)
      // 2) Or if there's already a dot on screen
      if (
        (clearOnNextInput && activeOperator !== "") ||
        display.textContent.includes(".") ||
        display.textContent === ""
      ) {
        return;
      } else {
        clearOnNextInput = false;
        display.textContent += value;
      }
}

function eraseNumber() {
  // Remove the last character from the display
      display.textContent = display.textContent.slice(0, -1);

      if (clearOnNextInput) {
        activeOperator = "";
        clearOnNextInput = false;
      }
}

function clearAll() {
  display.textContent = 0;
      firstOperand = "";
      secondOperand = "";
      activeOperator = "";
      result = "";
      clearOnNextInput = false;
}

// Use event delegation to handle clicks on all calculator buttons
container.addEventListener("click", handleClicks);
function handleClicks(e) {
  // Support clicks on nested elements (like SVGs) by finding the nearest button
  const clickedButton = e.target.closest("button");
  if (!clickedButton) return;

  // Get button type and value from data attributes
  const action = clickedButton.dataset.action;
  const value = clickedButton.dataset.value;

  switch (action) {
    case "number":
      appendNumber(value);
      break;

    case "add":
    case "subtract":
    case "divide":
    case "multiply":
      handleOperators(action, value);
      break;

    case "equal":
      evaluateCalc();
      break;

    case "percent":
      if (clearOnNextInput && activeOperator !== "") {
        return;
      } else {
        result = percent(display.textContent);
        //Format result: use scientific notation if it's too long
        display.textContent =
          result.toString().length > 10 ? result.toExponential(4) : result;
      }
      break;

    case "dot":
      appendDot(value);
      break;

    case "plus/minus":
      if (clearOnNextInput && activeOperator !== "") {
        replaceDisplay(value)
      } else {
        display.textContent *= -1;
      }
      break;

    case "erase":
      eraseNumber();
      break;

    case "all-clear":
      clearAll();
      break;
  }
}

// Keyboard Support
container.addEventListener("keydown", handleKey);
function handleKey(e) {
if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
 convertOperator(e.key);
} else if (e.key >= 0 && e.key <= 9) {
  appendNumber(e.key);
} else if (e.key === '.') {
  appendDot(e.key);
} else if (e.key === '=' || e.key === 'Enter') {
  evaluateCalc();
} else if (e.key === 'Backspace') {
  eraseNumber();
} else if (e.key === 'Escape') {
  clearAll();
}
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') {
    action = "divide";
    value = "÷"
    handleOperators(action, value);
  }
  if (keyboardOperator === '*') {
    action = "multiply";
    value = "⨯";
    handleOperators(action, value);
  }
  if (keyboardOperator === '-') {
    action = "subtract";
    value = "–"
    handleOperators(action, value);
  }
  if (keyboardOperator === '+') {
    action = "add";
    value = "+"
    handleOperators(action, value);
  }
}