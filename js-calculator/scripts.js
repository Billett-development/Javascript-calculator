// object to keep track of the first operand(5), the operator(*), and the second operand(8) 
// display value will hold a string of every input done by the user and shows on the screen
const calculator = {

    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,

  };

// assings every div inside the calculator keys to keys varibale (event delegation)
const keys = document.querySelector('.calculator-keys');
// add a click event listener to every value in the keys variable
keys.addEventListener('click', (event) => {

    const { target } = event;
    //is the same as 
    //const target = event.target;

    // if the calculator is clicked but its not a button then return nothing
    if(!target.matches('button')) { return; }

    // if the target value contains an operator class 
    if(target.classList.contains('operator')) {

        // log the value of the button clicked value
        handleOperator(target.value)
        updateDisplay();
        return;
    }

    if(target.classList.contains('decimal')) {
        
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    //calls the input digit function with the target. value (digit)
    inputDigit(target.value);
    // calls the update display function
    updateDisplay();

});

function inputDigit(digit) {

    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {

        //set the display value to the value fo digit pressed
        calculator.displayValue = digit;
        //sets it back to false
        calculator.waitingForSecondOperand = false;

    } else {

        // Overwrite `displayValue` if the current value is '0' otherwise append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        //ternary operator
    }

    console.log(calculator);
}

function inputDecimal(dot) {

    if(calculator.waitingForSecondOperand === true) return;

    
    // if calculators display value does not contain a decimal point 
    if (!calculator.displayValue.includes(dot)) {

        //append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {

    const { firstOperand, displayValue, operator } = calculator;

    // when an operator key is pressed convert the number display on the screen to a number
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
      }


    if (firstOperand === null) {
        // if the value of the first operand is null then change it to the value on inputvalue variable
        calculator.firstOperand = inputValue;
    } else if (operator){

        const result = performCalculation[operator](firstOperand, inputValue);
        
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    // sets the boolean value of waiting from false to true
    calculator.waitingForSecondOperand = true;

    // sets the value of the operator to the value of the operator clicked
    calculator.operator = nextOperator;

    console.log(calculator);

}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {

    const display = document.querySelector('.calculator-screen-value');

    //sets the value of the calculator screen to the value outlined in the calculator object
    display.value = calculator.displayValue;
  }
  updateDisplay();