// get all dom elements
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort-richest");
const calculateWealthBtn = document.getElementById("calculate-entire-wealth");

const contentParent = document.getElementById("content");
const wealthParent = document.getElementById("wealth");

// Event listeners
addUserBtn.addEventListener("click", addUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);

// for saving the users globally in our app
let users = [];

// call function to get 3 users on load
window.onload = () => {
  addUser();
  addUser();
  addUser();
};

async function addUser() {
  try {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();

    const user = data.results[0];
    const fullName = `${user.name.first} ${user.name.last}`;
    // const firstName = user.name.first;
    // const lastName = user.name.last;

    const newUser = {
      name: fullName,
      money: Math.floor(Math.random() * 1_000_000),
    };

    users.push(newUser);

    updateDom();
  } catch (error) {
    console.log(error);
  }
}

function doubleMoney() {
  // map over the users array and double the money using map method
  users = users.map((user) => {
    return { name: user.name, money: user.money * 2 };
  });

  updateDom();
}

function showMillionaires() {
  // filter the users array and return only the users with money more than 1 million using filter method
  users = users.filter((user) => user.money > 1_000_000);

  updateDom();
}

function sortRichest() {
  // sort the users array by money using sort method
  users = users.sort((a, b) => b.money - a.money);

  updateDom();
}

function calculateWealth() {
  // reduce the users array and return the total money using reduce method
  const totalWealth = users.reduce((acc, current) => (acc += current.money), 0);

  wealthParent.innerHTML = `<h3>Total Wealth:</h3> <strong>${totalWealth} $</strong>`;
}

function updateDom() {
  // clear the content parent
  contentParent.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");

    userDiv.classList.add("flex", "justify-between");

    userDiv.innerHTML = `<h3>${user.name}</h3> <span>${user.money} $</span> `;

    contentParent.appendChild(userDiv);
  });
}

// MATH METHODS
// square root
Math.sqrt(25); // 5
// absolute value
Math.abs(-5); // 5
// power
Math.pow(2, 3); // 8
// random number
Math.random(); // 0.123456789
// floor number
Math.floor(2.9); // 2
// ceil number
Math.ceil(2.1); // 3

// normal filter vs arrow function higher-order method: filter

const array = [4, 6, 3, 1, 5, 2, 7, 10, 9, 8];
// let evenValues = [];

// for (let i = 0; i < array.length; i++) {
//   if (array[i] % 2 === 0) {
//     evenValues.push(array[i]);
//   }
// }

// const evenValues = array.filter((value) => value % 2 === 0);

// normal sort vs arrow function higher-order method: sort
let sortedByDescending = [];

for (let i = 0; i < array.length; i++) {
  for (let j = i; j < array.length; j++) {
    if (array[i] < array[j]) {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}

sortedByDescending = array.sort((a, b) => b - a);