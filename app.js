//? USE REQUIRE AND MODULE EXPORTS?

// GET ALL THE BUTTONS
// Numbers
const zero = document.querySelector(".zero");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
// Operators
const add = document.querySelector(".plus");
const subtract = document.querySelector(".minus");
const multiply = document.querySelector(".mult");
const divide = document.querySelector(".div");
const equal = document.querySelector(".eq");
// Others
const dot = document.querySelector(".dot");
const allClean = document.querySelector(".ac");
const cancelEntry = document.querySelector(".ce");
// Header Display
const displayMain = document.querySelector(".display-main");
const displayOperations = document.querySelector(".display-operations");
const displayIndicate = document.querySelector(".display-indicate");

// Declare variables needed
let firstNumber;
let secondNumber;
let afterEqual = false;
const buttons = document.querySelectorAll("button");

// Get every buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let selectedButton = button.textContent;
        // Give functions to every buttons
        switch(selectedButton){
            case "0":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "1":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "2":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "3":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "4":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "5":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "6":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "7":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "8":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "9":
                displayNumber(selectedButton);
                enableOperations();
                break;
            case "+":
                displayOperator(selectedButton);
                break;
            case "−":
                displayOperator(selectedButton);
                break;
            case "x":
                displayOperator(selectedButton);
                break;
            case "%":
                displayOperator(selectedButton);
                break;
            case "=":
                calculate();
                break;
            case ".":
                if(displayMain.textContent.includes(".")){
                    return;
                }else{
                    changeMainDisplay(selectedButton);
                }
                break;
            case "ac":
                clearAll();
                enableNumbers();
                button.disabled = false;
                break;
            case "ce":
                backspace();
                enableOperations();
                break;
            default:
                console.log("Nothing is pressed!");
        }
    });
});

//! THERE ARE STILL A LOT OF BUGS AND WEIRD STUFF HAPPENING! I AM REALLY SORRY!

// Display the symbol of the operator
// Buttons: + - x %
function displayOperator(operator){
    enableNumbers();
    if(displayIsEmpty()){
        firstNumber = 0; // initialize the first number to 0 if user does not click any
        displayOperations.textContent += firstNumber + "" + operator;
    }else{
        if(operationsFound(displayOperations.textContent)){
            displayOperations.textContent = displayOperations.textContent.substring(0, displayOperations.textContent.length - 1);
            displayOperations.textContent += displayMain.textContent + "" + operator; 
            displayMain.textContent = "";
        }else{
            if(displayMain.textContent === ""){
                firstNumber = Number(displayOperations.textContent);
            }else{
                firstNumber = Number(displayMain.textContent);
            }
            displayOperations.textContent += displayMain.textContent + "" + operator; 
            displayMain.textContent = "";
        }
    }
    // Disable the "clicked" operator (for it not to display more than one if the user keeps clicking)
    switch(operator){
        case "+":
            add.disabled = true;
            break;
        case "−":
            subtract.disabled = true;
            break;
        case "x":
            multiply.disabled = true;
            break;
        case "%":
            divide.disabled = true;
            break;
    }
}

// Calculate the given mathematical operation
// Buttons: =
function calculate(){
    secondNumber = Number(displayMain.textContent);
    if(displayOperations.textContent.includes("+")){ // Addition
        displayOperations.textContent += "" + displayMain.textContent;
        displayMain.textContent = firstNumber + secondNumber;
    } else if(displayOperations.textContent.includes("−")){ // Subtraction
        displayOperations.textContent += "" + displayMain.textContent;
        displayMain.textContent = firstNumber - secondNumber;
    } else if(displayOperations.textContent.includes("x")){ // Multiplication
        if(displayOperations.textContent.includes(".")){
            displayOperations.textContent += "" + displayMain.textContent;
            displayMain.textContent = (firstNumber * secondNumber).toFixed(1); // limit the decimal to 1 digit/character
        }else{
            displayOperations.textContent += "" + displayMain.textContent;
            displayMain.textContent = firstNumber * secondNumber;
        }
    } else if(displayOperations.textContent.includes("%")){ // Division
        displayOperations.textContent += "" + displayMain.textContent;
        if((firstNumber / secondNumber).toString().length > 9){
            displayMain.textContent = (firstNumber / secondNumber).toFixed(9); // limit the decimal to 9 digits/characters
        }else{
            displayMain.textContent = firstNumber / secondNumber;
        }
    }
    displayOperations.textContent = "";
    afterEqual = true;
}


// Delete last character / backspace
// Button: CE
function backspace(){
    if((displayOperations.textContent !== "") && (displayMain.textContent !== "")){
        displayMain.textContent = displayMain.textContent.slice(0, -1);
    }
    else if((displayOperations.textContent !== "") && (displayMain.textContent === "")){
        if(!operationsFound(displayOperations.textContent)){
            displayOperations.textContent = displayOperations.textContent.slice(0, -1);
            displayMain.textContent = displayOperations.textContent;
            displayOperations.textContent = "";
        }else{
            displayOperations.textContent = displayOperations.textContent.slice(0, -1);
        }        
    }else{
        displayMain.textContent = displayMain.textContent.slice(0, -1);
    }
    
    if(displayIsEmpty()){
        enableNumbers();
    }
}

// Check if an operator is present/found
function operationsFound(textContent){
    if(textContent.includes("+") || textContent.includes("−") || textContent.includes("x") || textContent.includes("%")){
        return true;
    }else{
        return false;
    }
}

// Check if the main display is empty or not
function displayIsEmpty(){
    if((displayMain.textContent === "") && (displayOperations.textContent === "")){
        return true;
    }else{
        return false;
    }
}

// Change the main display (specifically for numbers)
function displayNumber(character){
    if(afterEqual === true){ // New calculation after equal sign is pressed
        displayMain.textContent = "";
        displayMain.textContent += character;
    }else{
        displayMain.textContent += character;
    }
    afterEqual = false;
}

// Change the main display (in general?)
function changeMainDisplay(character){
    displayMain.textContent += character;
}

// Clear all the characters in both main and operations display
function clearAll(){
    displayMain.textContent = "";
    displayOperations.textContent = "";
}

// Enable every operator buttons
function enableOperations(){
    add.disabled = false;
    subtract.disabled = false;
    multiply.disabled = false;
    divide.disabled = false;
}

// Enable every number buttons
function enableNumbers(){
    zero.disabled = false;
    one.disabled = false;
    two.disabled = false;
    three.disabled = false;
    four.disabled = false;
    five.disabled = false;
    six.disabled = false;
    seven.disabled = false;
    eight.disabled = false;
    nine.disabled = false;
}

// Disable every number buttons
function disableNumbers(){
    zero.disabled = true;
    one.disabled = true;
    two.disabled = true;
    three.disabled = true;
    four.disabled = true;
    five.disabled = true;
    six.disabled = true;
    seven.disabled = true;
    eight.disabled = true;
    nine.disabled = true;
}