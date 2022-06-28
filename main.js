const display = document.querySelector('.screen');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const evaluate = document.querySelector('.evaluate');
const decimal = document.querySelector('.decimal');
const AC = document.querySelector('.AC');
const leftBrace = document.querySelector('.leftBrace');
const rightBrace = document.querySelector('.rightBrace');

let expression = [];
let showingAnswer = false;
let openBraces = 0;

clear();

numbers.forEach((button) => {
    button.addEventListener('click', () => {
        if (showingAnswer) {
            clear();
        }
        
        // If expression empty || previous token is an operator
        if (expression.length === 0 || (isNaN(expression.at(-1)) && expression.at(-1) !== '.')) {
            expression.push(button.innerHTML);
        } else {
            expression[expression.length - 1] += button.innerHTML;
        }
        
        if (!button.classList.contains('decimal')) {
            enable('.operation, .leftBrace');
            if (openBraces > 0) {
                enable('.rightBrace');
            } else {
                enable('.evaluate');
            }
        } else {
            disable('.leftBrace');
        }
        console.log(expression);
    });
});

operations.forEach((button) => {
    button.addEventListener('click', () => {
        enable('.decimal');
        disable('.operation, .evaluate, .rightBrace');
        console.log(expression);
    });
});

AC.addEventListener('click', clear);

evaluate.addEventListener('click', () => {
    let answer = calculate(expression);
    if (answer.toString().length > 8) {
        display.innerHTML = (+answer).toExponential(2);
    } else {
        display.innerHTML = answer;
    }
    showingAnswer = true;
    disable('.operation, .evaluate, .rightBrace');
});

decimal.addEventListener('click', () => {
    decimal.disabled = true;
});

leftBrace.addEventListener('click', () => {
    openBraces++;
    enable('.decimal');
    disable('.operation, .rightBrace, .evaluate');
    console.log(expression);
});

rightBrace.addEventListener('click', () => {
    if (--openBraces === 0) {
        disable('.rightBrace');
        enable('.evaluate');
    }
    enable('.operation, .decimal');
    console.log(expression);
});

document.querySelectorAll('.number, .operation, .leftBrace, .rightBrace')
    .forEach(button => button.addEventListener('click', () => display.innerHTML += button.innerHTML));
document.querySelectorAll('.operation, .leftBrace, .rightBrace')
    .forEach(button => button.addEventListener('click', () => expression.push(button.innerHTML)));

function clear() {
    expression = [];
    display.innerHTML = '';
    showingAnswer = false;
    openBraces = 0;
    disable('.operation, .evaluate, .rightBrace');
    enable('.decimal, .leftBrace');
}

function calculate(expression) {
    for (let i = 0; i < expression.length; i++) {
        if (!isNaN(expression[i])) {
            expression[i] = +expression[i];
        }
    }

    
    // Brackets
    for (let i = expression.length; i >= 0; i--) {
        if (expression[i] === "(") {
            let j = expression.indexOf(")", i);
            expression.splice(i, j - i + 1, calculate(expression.slice(i + 1, j)));
        }
    }
    
    // Multiplication and division
    for (let i = 0; i < expression.length;) {
        if (expression[i + 1] === "×") {
            expression.splice(i, 3, expression[i] * expression[i + 2]);
        } else if (!"+-".includes(expression[i]) && !isNaN(expression[i + 1])) {
            expression.splice(i, 2, expression[i] * expression[i + 1]);
        } else if (expression[i + 1] === "÷") {
            expression.splice(i, 3, expression[i] / expression[i + 2]);
        } else {
            i++;
        }
    }

    // Addition and subtraction
    for (let i = 0; i < expression.length;) {
        if (expression[i + 1] === "+") {
            expression.splice(i, 3, expression[i] + expression[i + 2]);
        } else if (expression[i + 1] === "-") {
            expression.splice(i, 3, expression[i] - expression[i + 2]);
        } else {
            i++;
        }
    }
    
    return expression[0];
}

function enable(classes) {
    document.querySelectorAll(classes).forEach((button) => button.disabled = false);
}

function disable(classes) {
    document.querySelectorAll(classes).forEach((button) => button.disabled = true);
}