const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      case '**':
        return Math.pow(firstOperand, secondOperand);
      case '%':
        return firstOperand * (secondOperand / 100);
      case 'sqrt':
        return Math.sqrt(firstOperand);
      case 'neg':
        return -firstOperand;
      case '!':
        return factorial(firstOperand);
      default:
        return secondOperand;
    }
  }
  
  function factorial(num) {
    if (num < 0) return "Invalid Input";
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
  
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '**':
      case '%':
      case 'sqrt':
      case 'neg':
      case '!':
        handleOperator(value);
        break;
      case '=':
        handleOperator(calculator.operator);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        inputDigit(value);
    }
  
    updateDisplay();
  });
  