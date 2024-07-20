class Calculator {
    currentValue = '';
    previousValue = '';
    operation = undefined;
    currentDisplayElement;
    previousDisplayElement;

    constructor(current, previous) {
        this.currentDisplayElement = current;
        this.previousDisplayElement = previous;
    }

    conCatNumber(number) {
        this.currentValue += number.toString();
        this.displayNumber();
        console.log(this.currentValue);
    }

    allClear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
    }

    removeNumber() {
        if (this.currentValue === '') {
            return;
        }
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        console.log(operation);
        if (this.currentValue === '') {
            return;
        }
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '%':
                calculation = prev % current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '/':
                calculation = prev / current;
                break;
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            default:
                return;
        }
        this.currentValue = calculation;
        this.operation = undefined;
        this.previousValue = '';
    }

    displayNumber() {
        this.currentDisplayElement.innerText = this.currentValue;
        if (this.operation != null) {
            this.previousDisplayElement.innerText = `${this.previousValue} ${this.operation}`;
        } else {
            this.previousDisplayElement.innerText = '';
        }
    }
}

// Selectors
const currentText = document.querySelector("div[data-current]");
const previousText = document.querySelector("div[data-previous]");
const numbers = document.querySelectorAll("div[data-number]");
const operand = document.querySelectorAll("div[data-operand]");
const allClear = document.querySelector("div[data-all-clear]");
const remove = document.querySelector("div[data-delete]");
const equal = document.querySelector("div[data-equal]");

calculator = new Calculator(currentText, previousText);

// Events
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        calculator.conCatNumber(number.getAttribute('data-number'))
    });
});

allClear.addEventListener('click', () => {
    calculator.allClear();
    calculator.displayNumber();
});

remove.addEventListener('click', () => {
    calculator.removeNumber();
    calculator.displayNumber();
});

equal.addEventListener('click', () => {
    calculator.calculate();
    calculator.displayNumber();
});

operand.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.getAttribute('data-operand'))
        calculator.displayNumber()
    });
});


