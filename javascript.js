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
    firstNum = +firstNum;
    secondNum = +secondNum;
    if (operator === "divide") {
        //First check if the second number is not 0
        if (secondNum === 0) {
            displayContent.textContent = "Fuck you bitch"
        } else {
            let result = divide(firstNum, secondNum);
        //Convert the function result to string and test if it's larger than 10 characters
        if (result.toString().length > 10) {
            //if result > than 10, return a value with maximum 2 numbers after the point
            displayContent.textContent = result.toFixed(2)
        } else {displayContent.textContent = result;}}
         
    } else if (operator === "multiply") {
        let result = multiply(firstNum, secondNum);
        if (result.toString().length > 10) {
            //if result > than 10, display the value in scientific notation
            displayContent.textContent = result.toExponential(4)
        } else {displayContent.textContent = result;}
    } else if (operator === "add") {
        let result = add(firstNum, secondNum);
        if (result.toString().length > 10) {
            displayContent.textContent = result.toExponential(4)
        } else {displayContent.textContent = result;} 
    } else if (operator === "subtract") {
        displayContent.textContent = subtract(firstNum, secondNum);
    }
}

const container = document.querySelector(".container");
const displayContent = document.querySelector(".display");
const divideBtn = document.querySelector(".divide-operator");

function handelClick(e) {
  if (e.target.matches(".number")) {
    //every time a number button is pressed it will update the display content text if the are not more than 10 numbers
    if(displayContent.textContent.length >= 10) {
        displayContent.removeEventListener("click", handelClick)
    } else {displayContent.textContent = displayContent.textContent + e.target.textContent;}
    
  } else if (e.target.matches(".divide-operator")) {
    //update the firstNum and operator variables
    firstNum = displayContent.textContent;
    operator = "divide";
    divideBtn.setAttribute("style", "background: blue");
    //errase the text content and wait for the second number input
    displayContent.textContent = "";
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
}
container.addEventListener("click", handelClick);
