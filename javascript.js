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

let firstNum = 0;
let secondNum = 0;
let operator = 0;

function operate(firstNum, secondNum, operator) {
    if (operator === "divide") {
        displayContent.textContent = divide(firstNum, secondNum);
    } else if (operator === "multiply") {
        displayContent.textContent = multiply(firstNum, secondNum);
    } else if (operator === "add") {
        displayContent.textContent = add(firstNum, secondNum); 
    } else if (operator === "subtract") {
        displayContent.textContent = subtract(firstNum, secondNum); 
    }
}

const container = document.querySelector(".container");
const displayContent = document.querySelector(".display");
const divideBtn = document.querySelector(".divide-operator");

container.addEventListener("click", (e) => {
  if (e.target.matches(".number")) {
    //every time a number button is pressed it will update the display content text
    displayContent.textContent = displayContent.textContent + e.target.textContent;
  } else if (e.target.matches(".divide-operator")) {
    //update the firstNum and operator variables
    firstNum = displayContent.textContent;
    operator = "divide";
    divideBtn.setAttribute("style", "background: blue");
    //errase the text content and wait for the second number input
    displayContent.textContent = "";
    // console.log(firstNum);
  } else if (e.target.matches(".multiply-operator")) {
    firstNum = displayContent.textContent;
    operator = "multiply";
    displayContent.textContent = "";
  } else if (e.target.matches(".add-operator")) {
    firstNum = displayContent.textContent;
    operator = "add";
    displayContent.textContent = "";
  } else if (e.target.matches(".subtract-operator")) {
    firstNum = displayContent.textContent;
    operator = "subtract";
    displayContent.textContent = "";
  } else if (e.target.matches(".equal-operator")) {
    //update the second num variable
    secondNum = displayContent.textContent;
    //call the operate function to make the calculation
    operate(firstNum, secondNum, operator);
  } else if (e.target.matches(".all-clear")) {
    displayContent.textContent = "";
    firstNum = 0;
    secondNum = 0;
    operator = 0;
  }
  
  
  
  
  
  
  
});
