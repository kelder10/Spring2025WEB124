// Katie Elder
// 03/24/2025

// Declaring variables
let fullName = "Katie Elder";
console.log(fullName);

let desiredAnnualSalary = 80000; 
console.log(desiredAnnualSalary);

let veteranStatus = false;
console.log(veteranStatus);

let friends = ["Mary Lamb", "John Doe", "Ted Williams"];
console.log(friends);

let friendsSalaries = [70000, 75000, 78000];
console.log(friendsSalaries);

let anotherFriend = { 
    firstName: "Bob",
    lastName: "Ross",
    desiredAnnualSalary: 82000
};
console.log(anotherFriend);


// Updating the HTML with answers
document.getElementById("nameAnswer").textContent = fullName;
document.getElementById("salaryAnswer").textContent = desiredAnnualSalary;
document.getElementById("veteranAnswer").textContent = veteranStatus ? "Yes" : "No";
document.getElementById("friendsAnswer").textContent = friends.join(", ");
document.getElementById("friendsSalaryAnswer").textContent = friendsSalaries.join(", ");
document.getElementById("anotherFriendAnswer").textContent = `${anotherFriend.firstName} ${anotherFriend.lastName}: $${anotherFriend.desiredAnnualSalary}`;
