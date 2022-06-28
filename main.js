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
        if (expression.length === 0 || (isNaN(expression[expression.length - 1]) && expression[expression.length - 1] !== '.')) {
            expression.push(button.innerHTML);
        } else {
            expression[expression.length - 1] += button.innerHTML;
        }
        
        display.innerHTML += button.innerHTML;

        if (!button.classList.contains('decimal')) {
            leftBrace.disabled = false;
            if (openBraces > 0) {
                rightBrace.disabled = false;
            } else {
                evaluate.disabled = false;
            }
            enableOperations();
        } else {
            leftBrace.disabled = true;
        }
        console.log(expression);
    });
});

operations.forEach((button) => {
    button.addEventListener('click', () => {
        expression.push(button.innerHTML);
        display.innerHTML += button.innerHTML;
        decimal.disabled = false;
        evaluate.disabled = true;
        disableOperations();
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
    disableOperations();
    evaluate.disabled = true;
    rightBrace.disabled = true;
});

decimal.addEventListener('click', () => {
    decimal.disabled = true;
});

leftBrace.addEventListener('click', () => {
    openBraces++;
    rightBrace.disabled = true;
    expression.push(leftBrace.innerHTML);
    display.innerHTML += leftBrace.innerHTML;
    decimal.disabled = false;
    evaluate.disabled = true;
    disableOperations();
    console.log(expression);
    console.log(openBraces);
});

rightBrace.addEventListener('click', () => {
    openBraces--;
    if (openBraces === 0) {
        rightBrace.disabed = true;
        evaluate.disabled = false;
    }
    expression.push(rightBrace.innerHTML);
    display.innerHTML += rightBrace.innerHTML;
    decimal.disabled = false;
    enableOperations();
    console.log(expression);
});

function clear() {
    expression = [];
    display.innerHTML = '';
    decimal.disabled = false;
    evaluate.disabled = true;
    showingAnswer = false;
    openBraces = 0;
    leftBrace.disabled = false;
    rightBrace.disabled = true;
    disableOperations();
}

function calculate(expression) {
    console.log("evaluating:");
    console.log(expression);

    // Brackets
    for (let i = expression.length; i >= 0; i--) {
        if (expression[i] === "(") {
            let j = expression.indexOf(")", i);
            expression.splice(i, j - i + 1, calculate(expression.slice(i + 1, j)));
            console.log(expression);
            console.log(i);
        }
    }

    // Multiplication and division
    for (let i = 0; i < expression.length;) {
        if (expression[i + 1] === "×") {
            expression.splice(i, 3, +expression[i] * +expression[i + 2]);
        } else if (!isNaN(expression[i + 1])) {
            expression.splice(i, 3, +expression[i] * +expression[i + 1]);
        } else if (expression[i + 1] === "÷") {
            expression.splice(i, 3, +expression[i] / +expression[i + 2]);
        } else {
            i++
        }
    }

    // Addition and subtraction
    for (let i = 0; i < expression.length;) {
        if (expression[i + 1] === "+") {
            expression.splice(i, 3, +expression[i] + +expression[i + 2]);
        } else if (expression[i + 1] === "-") {
            expression.splice(i, 3, +expression[i] - +expression[i + 2]);
        } else {
            i++
        }
    }

    console.log(expression);
    return expression[0];
}

function enableOperations() {
    operations.forEach((button) => {
        button.disabled = false;
    })
}

function disableOperations() {
    operations.forEach((button) => {
        button.disabled = true;
    })
}