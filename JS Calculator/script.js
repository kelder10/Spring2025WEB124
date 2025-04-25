function add() {
const num = parseFloat(document.getElementById('num').value);
let result = '';
for (let i = 1; i <= 10; i++) {
result += `${i} + ${num} = ${i + num}\n`;
}
document.getElementById('addition').innerText = result.trim();
}

function subtract() {
const num = parseFloat(document.getElementById('num').value);
let result = '';
let i = 1;
while (i <= 10) {
result += `${i} - ${num} = ${i - num}\n`;
i++;
}
document.getElementById('subtraction').innerText = result.trim();
}

function multiply() {
const num = parseFloat(document.getElementById('num').value);
let result = '';
let i = 1;
do {
result += `${i} * ${num} = ${i * num}\n`;
i++;
} while (i <= 10);
document.getElementById('multiplication').innerText = result.trim();
}

function divide() {
const num = parseFloat(document.getElementById('num').value);
let result = '';
for (let i = 1; i <= 10; i++) {
result += `${i} / ${num} = ${(i / num).toFixed(2)}\n`;
}
document.getElementById('division').innerText = result.trim();
}
