class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.allClear()
    }
    //Input: None
    //Output: Cleared current and previous operand fields and reset operation
    //Purpose: To allow the user to reset the calculator without refreshing the page
    allClear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    //Input: None
    //Output: Cleared current operand and reset operation
    //Purpose: To allow the user to clear their current pending operation to the operand
    clear(){
        this.currentOperand = ''
        operation = undefined
    }
    //Input: number from the button
    //Output: changes the value of the current operand to be the original concatinated with the new digit
    //Purpose: To allow numbers with multiple digets to be computed
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    //Input: operation from button
    //Output: sets the operation value to the selected operation
    //Purpose: To allow simple computations to be selected
    choseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.computer()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    //Input: none
    //Output: the result of an operation occuring
    //Purpose: this is the brains of the calculator providing the actual calculation results
    computer(){
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '*':
                computation = previous * current
                break
            case '-':
                computation = previous - current
                break
            case '/':
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    //Input: Number from the current operand
    //Output: Nicely formatted current operand string
    //Purpose: To format the current operand string to have ',' in the right spot and work with inputing a '.' as the first item
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    //Input: None
    //Output: Updates the display with new info
    //Purpose: Allows the user to view the changes made from their inputs
    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
    }
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        //console.log(button.innerText) //Debugging output
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.choseOperation(button.innerText)
        //console.log(button.innerText) //Debugging output
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.computer()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.allClear()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})