const numberButtons = document.querySelectorAll('.btn');
const operatorButtons = document.querySelectorAll('.operator-btns');

const equalsBtn = document.querySelector('#equals-btn');
const periodBtn = document.querySelector('#period-btn');
const clearBtn = document.querySelector('#clear-btn');
const deleteBtn = document.querySelector('#delete-btn');

const expressionEl = document.querySelector('#expression-el');
const currentNumberEl = document.querySelector('#current-number-el');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

clearBtn.addEventListener('click', () => {
  currentNumberEl.textContent = '0';
  expressionEl.textContent = '';

  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
});

deleteBtn.addEventListener('click', () => {
  if (currentNumberEl.textContent === '0') {
    return;
  }

  if (currentNumberEl.textContent.length === 1) {
    currentNumberEl.textContent = '0';

    return;
  }

  currentNumberEl.textContent = currentNumberEl.textContent.slice(0, -1);
});

periodBtn.addEventListener('click', () => {
  if (currentNumberEl.textContent.includes('.')) {
    return;
  }

  currentNumberEl.textContent += '.';
});

numberButtons.forEach(numberButton => {
  numberButton.addEventListener('click', () => {
    if (currentNumberEl.textContent === '0') {
      currentNumberEl.textContent = numberButton.textContent;

      return;
    }

    if (currentNumberEl.textContent.length === 11) {
      return;
    }
      
    currentNumberEl.textContent += numberButton.textContent;
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    if (currentOperator !== null) {
      evaluate();
    }

    firstOperand = currentNumberEl.textContent;
    currentOperator = operatorButton.textContent;

    currentNumberEl.textContent = '0';
    expressionEl.textContent = `${firstOperand} ${currentOperator} `;
  });
});

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case '+': return firstOperand + secondOperand;
    case '−': return firstOperand - secondOperand;
    case '×': return firstOperand * secondOperand;
    case '÷':
      if (secondOperand === 0) {
        alert('[WARNING]: Cannot divide by 0');

        return;
      }

      return firstOperand / secondOperand;
  }
}

equalsBtn.addEventListener('click', () => evaluate());

function evaluate() {
  if (currentOperator === null) {
    return;
  }

  secondOperand = currentNumberEl.textContent;

  expressionEl.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
  currentNumberEl.textContent = operate(
    currentOperator, Number(firstOperand), Number(secondOperand)
  );

  currentOperator = null;
}