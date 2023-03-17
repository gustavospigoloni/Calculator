const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
let operation = "";

const numberButtons = document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    })
});

const operationButtons = document.querySelectorAll(".operation").forEach((button) => {
    button.addEventListener('click', () => operationButtonPressed(button.innerText))
});

const percentageButton = document.querySelector(".percentage").addEventListener('click', percentage);

const equalButton = document.querySelector(".equal").addEventListener('click', equalButtonPressed);

const deleteButton = document.querySelector(".delete").addEventListener('click', () => {
    currentOperand.innerText = currentOperand.innerText.slice(0,-1);
});

const allClearButton = document.querySelector(".all-clear").addEventListener('click', allClear);

const positiveNegativeButton = document.querySelector(".pos-neg").addEventListener('click', () => {
    if (currentOperand.innerText.includes("-")) currentOperand.innerText = currentOperand.innerText.slice(1);
    else currentOperand.innerText = "-" + currentOperand.innerText;
});

function operate (operation) {
    const previousnumber = parseFloat(previousOperand.innerText.slice(0, -2));
    const currentNumber = parseFloat(currentOperand.innerText);
    switch (operation) {
        case "+":
            return previousnumber + currentNumber;
        case "-":
            return previousnumber - currentNumber;
        case "*":
            return previousnumber * currentNumber;
        case "/":
            return previousnumber / currentNumber;
        default:
            return;
    }
}

function percentage () {
    if (currentOperand.innerText === "") return;
    currentOperand.innerText = parseFloat(currentOperand.innerText) / 100;
}

function allClear () {
    operation = "";
    previousOperand.innerText = "";
    currentOperand.innerText = "";
}

function appendNumber (number) {
    if (number === "." && currentOperand.innerText.includes(".")) return;
    if (number === "0" && currentOperand.innerText === "0") return;
    if (currentOperand.innerText === "0" && number !== ".") return currentOperand.innerText = number;
    if (currentOperand.innerText === "" && number === ".") return currentOperand.innerText = "0.";
    currentOperand.innerText = currentOperand.innerText + number;
}

function divisionByZero () {
    alert ("Hey, what are you doing? Division by 0 isn't possible, change that number right now!");
}

function equalButtonPressed () {
    if (currentOperand.innerText === "" || previousOperand.innerText === "") return;
    if (currentOperand.innerText === "0" && operation === "/") return divisionByZero();
    currentOperand.innerText = operate(operation);
    previousOperand.innerText = "";
    operation = ""
}

function operationButtonPressed (keyPressed) {
    if (currentOperand.innerText === "" && previousOperand.innerText === "") return;
    if (operation !== "") {
        if (currentOperand.innerText === "") {
            operation = keyPressed;
            previousOperand.innerText = previousOperand.innerText.slice(0, -2) + " " + operation;
            return;
        }
        if (currentOperand.innerText === "0" && operation === "/") return divisionByZero();
        previousOperand.innerText = operate(operation) + " " + keyPressed;
        operation = keyPressed;
        currentOperand.innerText = "";
    } else {
        operation = keyPressed;
        previousOperand.innerText = currentOperand.innerText + " " + operation;
        currentOperand.innerText = "";
    }
}

//keyboard
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "Numpad0":
            appendNumber("0");
            break;
        case "Digit0":
            appendNumber("0");
            break;
        case "Numpad1":
            appendNumber("1");
            break;
        case "Digit1":
            appendNumber("1");
            break;
        case "Numpad2":
            appendNumber("2");
            break;
        case "Digit2":
            appendNumber("2");
            break;
        case "Numpad3":
            appendNumber("3");
            break;
        case "Digit3":
            appendNumber("3");
            break;
        case "Numpad4":
            appendNumber("4");
            break;
        case "Digit4":
            appendNumber("4");
            break;
        case "Numpad5":
            appendNumber("5");
            break;
        case "Digit5":
            if(event.shiftKey) {
                percentage();
                break;
            }
            appendNumber("5");
            break;
        case "Numpad6":
            appendNumber("6");
            break;
        case "Digit6":
            appendNumber("6");
            break;
        case "Numpad7":
            appendNumber("7");
            break;
        case "Digit7":
            appendNumber("7");
            break;
        case "Numpad8":
            appendNumber("8");
            break;
        case "Digit8":
            if(event.shiftKey) {
                operationButtonPressed("*");
                break;
            }
            appendNumber("8");
            break;
        case "Numpad9":
            appendNumber("9");
            break;
        case "Digit9":
            appendNumber("9");
            break;
        case "NumpadDecimal":
            appendNumber(".");
            break;
        case "Period":
            appendNumber(".");
            break;
        case "NumpadDivide":
            operationButtonPressed("/");
            break;
        case "IntlRo":
            operationButtonPressed("/");
            break;
        case "NumpadMultiply":
            operationButtonPressed("*");
            break;
        case "NumpadSubtract":
            operationButtonPressed("-");
            break;
        case "Minus":
            operationButtonPressed("-");
            break;
        case "NumpadAdd":
            operationButtonPressed("+");
            break;
        case "Backspace":
            currentOperand.innerText = currentOperand.innerText.slice(0,-1);
            break;
        case "Delete":
            allClear();
        case "NumpadEnter":
            event.preventDefault();
            equalButtonPressed();
            break;
        case "Enter":
            event.preventDefault();
            equalButtonPressed();
            break;
        case "Equal":
            if (event.shiftKey) {
                operationButtonPressed("+");
                break;
            }
            equalButtonPressed();
            break;
        default:
            break;
    }
});