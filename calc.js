const exprEl   = document.querySelector('.expression');
const resultEl = document.querySelector('.result');
const keyClear     = document.querySelector('.button.ac');
const keyDelete    = [...document.querySelectorAll('.button')].find(b => b.textContent.trim() === '<' || b.textContent.trim() === '‹');
const keyFunctions = document.querySelectorAll('.button.divide, .button.multiply, .button.minus, .button.plus');
const keyEquals    = document.querySelector('.button.equal');
const buttons      = document.querySelectorAll('.button');
const keyDot       = document.querySelector('.button.dot');

function startCalculator() {
  let value = 0;
  let inputValue = '';
  let operatorPre = '';
  let operator = '';

  const operate = function (op) {
    value = Number(value);
    inputValue = Number(inputValue);

    switch (op) {
      case '/': value /= inputValue; break;
      case '*': value *= inputValue; break;
      case '-': value -= inputValue; break;
      case '+': value += inputValue; break;
      default: return value;
    }
    return value;
  };

  // render 함수
  const render = function (showEq = false) {
    if (operator) {
      exprEl.textContent = `${value} ${operator} ${inputValue}${showEq ? ' =' : ''}`;
    } else if (inputValue !== '') {
      exprEl.textContent = `${inputValue}${showEq ? ' =' : ''}`;
    } else {
      exprEl.textContent = showEq ? `${value} =` : '';
    }

    resultEl.textContent =
      (inputValue !== '') ? inputValue : (operator ? value : '');
  };

  const equals = function () {
  const a  = value;
  const op = operator;
  const b  = inputValue;

  if (op && b !== '') {
    operate(op);
    exprEl.textContent   = `${a} ${op} ${b} =`;
    resultEl.textContent = value;              
  } else if (!op && b !== '') {
    value = Number(b);
    exprEl.textContent   = `${b} =`;
    resultEl.textContent = value;
  } else {
    exprEl.textContent   = '';
    resultEl.textContent = value;
  }

  operatorPre = '';
  operator    = '';
  inputValue  = '';
  };


  const clear = function () {
    value = 0;
    inputValue = '';
    operator = '';
    exprEl.textContent = '';
    resultEl.textContent = '';
  };

  const deleteOne = function () {
    inputValue = inputValue.slice(0, -1);
    resultEl.textContent = inputValue !== '' ? inputValue : '';
  };

  const addDot = function () {
    if (!inputValue.includes('.')) {
      inputValue = (inputValue === '' ? '0' : inputValue) + '.';
      render();
    }
  };

  const setNumber = function (num) {
    num = String(num).trim();
    if (!/^\d$/.test(num)) return;

    if (inputValue === '' || inputValue === '0') {
      inputValue = num;
    } else {
      inputValue += num;
    }
    render();
  };

  const setOperator = function (key) {
    if (key === '÷') key = '/';
    else if (key === '×') key = '*';
    else if (key === '−') key = '-';
    else if (key === '+') key = '+';

    if (operator && inputValue !== '') {
      operate(operator);
    } else if (!operator && inputValue !== '') {
      value = Number(inputValue);
    }

    operatorPre = operator;
    operator = key;
    inputValue = '';
    render();
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const txt = e.target.textContent.trim();
      if (/^\d$/.test(txt)) {
        setNumber(txt);
      }
    });
  });

  keyFunctions.forEach((key) =>
    key.addEventListener('click', (e) => {
      const keyText = e.target.textContent.trim();
      setOperator(keyText);
    })
  );

  if (keyEquals) keyEquals.addEventListener('click', equals);
  if (keyClear)  keyClear.addEventListener('click', clear);
  if (keyDelete) keyDelete.addEventListener('click', deleteOne);
  if (keyDot)    keyDot.addEventListener('click', addDot);

  window.addEventListener('keydown', function (e) {
    let key = e.key;
    if (!isNaN(key)) setNumber(key);
    else if (key === '/' || key === '*' || key === '-' || key === '+')
      setOperator(key);
    else if (key === 'Enter' || key === 'NumpadEnter') equals();
    else if (key === 'Backspace') deleteOne();
    else if (key === 'Escape') clear();
    else if (key === '.') addDot();
  });
}

startCalculator();
