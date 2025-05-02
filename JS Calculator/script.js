// Katie Elder 5-2-25
// JavaScript Calculator
// This JS script performs basic arithmetic operations (addition, subtraction, multiplication, and division)
// based on a user-provided number and displays the results.

function add() {
    // Get the user input number
    const num = parseFloat(document.getElementById('num').value);
    let result = '';
    // Loop through numbers 1 to 10 and calculate addition
    for (let i = 1; i <= 10; i++) {
        result += `${i} + ${num} = ${i + num}\n`;
    }
    // Display the result in the addition paragraph
    document.getElementById('addition').innerText = result.trim();
}

function subtract() {
    // Get the user input number
    const num = parseFloat(document.getElementById('num').value);
    let result = '';
    let i = 1;
    // Loop through numbers 1 to 10 and calculate subtraction
    while (i <= 10) {
        result += `${i} - ${num} = ${i - num}\n`;
        i++;
    }
    // Display the result in the subtraction paragraph
    document.getElementById('subtraction').innerText = result.trim();
}

function multiply() {
    // Get the user input number
    const num = parseFloat(document.getElementById('num').value);
    let result = '';
    let i = 1;
    // Loop through numbers 1 to 10 and calculate multiplication
    do {
        result += `${i} * ${num} = ${i * num}\n`;
        i++;
    } while (i <= 10);
    // Display the result in the multiplication paragraph
    document.getElementById('multiplication').innerText = result.trim();
}

function divide() {
    // Get the user input number
    const num = parseFloat(document.getElementById('num').value);
    let result = '';
    // Loop through numbers 1 to 10 and calculate division
    for (let i = 1; i <= 10; i++) {
        result += `${i} / ${num} = ${(i / num).toFixed(2)}\n`;
    }
    // Display the result in the division paragraph
    document.getElementById('division').innerText = result.trim();
}

// Function to calculate all operations
function calculateAll() {
    add();
    subtract();
    multiply();
    divide();
}

// Add event listener to the calculate button
document.getElementById('calculateBtn').addEventListener('click', calculateAll);
