/* 
Katie Elder 3/8/2025 
*/

// Paragraph 1
/* Initialize a string variable named myName with your full name */
const myName ="Katie Elder"; 
/* create and initialize a variable named para1 and set 
it equal to document.getElementById("p1"); */
const para1 = document.getElementById("p1");
para1.textContent = "Question 1: What is your name? " + myName;

// Paragraph 2
/* Initialize two number variables with the names n1 and n2 
using any numeric values desired */
let n1 = 5;
let n2 = 10;

/* Initialize a variable named numberSum to add the two 
numbers using their variable names */
const numberSum = n1 + n2;
document.getElementById("p2").textContent = "Question 2: \
    What is the sum of " + n1 + " and " + n2 + "? " + numberSum;

// Paragraph 3
/* create and initialize a variable named numberMult to 
multiply the two numbers using their variable names. */
const numberMult = n1 * n2; 
document.getElementById("p3").textContent = "Question 3: What \
    is the product of " + n1 + " and " + n2 + "? " + numberMult;

// Paragraph 4
/* create and initialize a variable named myNameAddNum to add
one of your numeric variables to the string variable */
const myNameAddNum = myName  + n1;
document.getElementById("p4").textContent = "Question 4: What do \
    you get when you add " + n1 + " to your name? " + myNameAddNum;

// Paragraph 5
/* create and initialize a variable named myNameMultNum to 
multiply one of your numeric variables to the string variable */
const myNameMultNum = myName * n1;
document.getElementById("p5").textContent = "Question 5: What do \
    you get when you multiply " + n1 + " by your name? " + myNameMultNum;

// Paragraph 6
/* create and initialize a variable named ageCompare to compare
your age to the multiplication of your numeric variables. */
const myAge = 36
const ageCompare = myAge > numberMult;
document.getElementById("p6").textContent = "Question 6: Is your age \
    greater than the product of " + n1 + " and " + n2 + "? " + ageCompare;


