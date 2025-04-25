function add() {
const num = parseFloat(document.getElementById('num').value);
let result = '';
for (let i = 1; i <= 10; i++) {
result += `${i} + ${num} = ${i + num}\n`;
}
document.getElementById('addition').innerText = result.trim();
}
