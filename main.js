let display = document.querySelector('.screen');
let expression = [];
let showingAnswer = false;

let numbers = document.querySelectorAll('.number');
numbers.forEach((button) => {
    button.addEventListener('click', () => {
        if (showingAnswer) {
            clear();
        }
        if (expression.length === 0 || isNaN(expression[expression.length - 1])) {
            expression.push(button.innerHTML);
        } else {
            expression[expression.length - 1] += button.innerHTML;
        }
        console.log(expression);
        display.innerHTML += button.innerHTML;
        enableOperations();
    });
});

let operations = document.querySelectorAll('.operation, .other');
operations.forEach((button) => {
    button.addEventListener('click', () => {
        expression.push(button.innerHTML)
        console.log(expression);
        display.innerHTML += button.innerHTML;
        disableOperations();
    });
});

let AC = document.querySelector('.AC');
AC.addEventListener('click', clear);

let evaluate = document.querySelector('.evaluate');
evaluate.addEventListener('click', () => {
    let answer = calculate(expression);
    if (answer.toString().length > 8) {
        display.innerHTML = (+answer).toExponential(2);
    } else {
        display.innerHTML = answer;
    }
    showingAnswer = true;
});

clear();
// calculate([3, "+", "(", "(", 4, "×", 3, ")", "+", "3", ")", "÷", "10"]);

function clear() {
    expression = [];
    display.innerHTML = '';
    showingAnswer = false;
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
    for (let i = 0; i < expression.length; i++) {
        if (expression[i + 1] === "×") {
            expression.splice(i, 3, +expression[i] * +expression[i + 2]);
        } else if (expression[i + 1] === "÷") {
            expression.splice(i, 3, +expression[i] / +expression[i + 2]);
        }
    }

    // Addition and subtraction
    for (let i = 0; i < expression.length; i++) {
        if (expression[i + 1] === "+") {
            expression.splice(i, 3, +expression[i] + +expression[i + 2]);
        } else if (expression[i] === "-") {
            expression.splice(i, 3, +expression[i] - +expression[i + 2]);
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