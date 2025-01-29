const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (value) {
      if (currentInput === '0') currentInput = value;
      else currentInput += value;
      updateDisplay(currentInput);
    } else if (action) {
      handleAction(action);
    }
  });
});

function handleAction(action) {
  switch (action) {
    case 'clear':
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay('0');
      break;
    case 'backspace':
      currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay(currentInput);
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      if (currentInput) {
        if (previousInput && operator) {
          calculate();
        }
        operator = action;
        previousInput = currentInput;
        currentInput = '';
      }
      break;
    case 'equals':
      if (previousInput && operator) {
        calculate();
        operator = null;
      }
      break;
  }
}

function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  switch (operator) {
    case 'add':
      currentInput = (num1 + num2).toString();
      break;
    case 'subtract':
      currentInput = (num1 - num2).toString();
      break;
    case 'multiply':
      currentInput = (num1 * num2).toString();
      break;
    case 'divide':
      currentInput = num2 !== 0 ? (num1 / num2).toString() : 'Error';
      break;
  }
  updateDisplay(currentInput);
  previousInput = '';
}

function updateDisplay(value) {
  display.textContent = value;
}
