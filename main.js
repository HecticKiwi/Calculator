let expression = "";
expressionArray = [];

const display = document.querySelector('.screen');
display.innerHTML = expression;

let expressionButtons = document.querySelectorAll('.number, .operation, .other');
expressionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        expression += button.innerHTML;
        display.innerHTML = expression;
    })
});

let AC = document.querySelector('.AC');
AC.addEventListener('click', () => {
    expression = '';
    display.innerHTML = '';
});

let evaluate = document.querySelector('.evaluate');
evaluate.addEventListener('click', () => calculate(expression));

function operate(operation, a, b) {
    switch (operation) {
        case 'add': return add(a, b);
        case 'subtract': return subtract(a, b);
        case 'multiply': return multiply(a, b);
        case 'divide': return divide(a, b);
    }
}

calculate([3, "+", "(", "(", 4, "×", 3, ")", "+", "3", ")", "÷", "10"]);

function calculate(expression) {
    console.log("evaluating:");
    console.log(expression);

    // Brackets
    for (let i = expression.length; i >= 0; i--) {
        if (expression[i] === "(") {
            let j = expression.indexOf(")", i);
            expression.splice(i, j - i + 1, calculate(expression.slice(i+1, j)));
            console.log(expression);
            console.log(i);
        }
    }

    // Multiplication and division
    for (let i = 0; i < expression.length; i++) {
        if (expression[i+1] === "×") {
            expression.splice(i, 3, +expression[i] * +expression[i+2]);
        } else if (expression[i+1] === "÷") {
            expression.splice(i, 3, +expression[i] / +expression[i+2]);
        }
    }
    
    // Addition and subtraction
    for (let i = 0; i < expression.length; i++) {
        if (expression[i+1] === "+") {
            expression.splice(i, 3, +expression[i] + +expression[i+2]);
        } else if (expression[i] === "-") {
            expression.splice(i, 3, +expression[i] - +expression[i+2]);
        }
    }
    
    console.log(expression);
    return expression[0];
}