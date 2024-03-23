const mainDisplay = document.getElementById("display");
const display = document.getElementById("upper");
const buttons = document.querySelectorAll("button");
const ceButton = document.getElementById("CE");
const cButton = document.getElementById("C");
const toggleButton = document.getElementById("toggle");
const equalsButton = document.getElementById("equals");

let currentExpression = "";
let allowButtonClick = false;

buttons.forEach(button => {
  button.addEventListener("click", handleButtonClick);
});

ceButton.addEventListener("click", clearEntry);
cButton.addEventListener("click", clearAll);
toggleButton.addEventListener("click", toggleSign);
equalsButton.addEventListener("click", evaluateExpression);

document.addEventListener("keydown", handleKeyPress);


function handleButtonClick(event) {
  const value = event.target.getAttribute("data-value");
  const operator = event.target.getAttribute("data-operator");
  condition = false;
  if (value) {
    currentExpression += value;
  } else if (operator) {
    currentExpression += ` ${operator} `;
  }

  display.innerHTML = currentExpression;
}

function clearEntry() {
  const numberDis = Array.from(currentExpression);
  numberDis.pop();

  console.log(numberDis);
  //currentExpression = currentExpression.replace(/\s*\S+\s*$/, "");
  currentExpression = numberDis.join("");
  display.innerHTML = currentExpression;
  if(currentExpression==""){
    display.innerHTML = " "
  }
}

function clearAll(cButton) {
  if(!allowButtonClick){
  currentExpression = "";
  display.innerHTML = " ";
  mainDisplay.innerHTML = "0";
  }  
}

function toggleSign() {
  currentExpression = currentExpression.replace(/\b\S+\b$/, match => {
    return parseFloat(match) * -1;
  });
  display.innerHTML = currentExpression;
}

function evaluateExpression() {
  
  console.log(currentExpression);
  try {
    
    var result = eval(currentExpression);
    mainDisplay.innerHTML = result;
    currentExpression = result.toString();
    
  } catch (error) {
    mainDisplay.innerHTML = "Error";
    currentExpression = "";
  }
  console.log(currentExpression);
}
  

function handleKeyPress(event) {
  const key = event.key;
  const keyButton = Array.from(buttons).find(button =>
    button.textContent === key || button.getAttribute("data-value") === key
  );
  if (keyButton) {
    keyButton.click();
    console.log(keyButton)
  } else if (key === "Enter") {
    allowButtonClick = true;
    evaluateExpression();
  } else if (key === "Backspace") {
    clearEntry();
  }
}

document.addEventListener("keyup", () => {
  allowButtonClick = false;
});