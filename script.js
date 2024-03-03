document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const trackerSection = document.getElementById("trackerSection");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const setBudgetBtn = document.getElementById("setBudgetBtn");
  const addExpenseBtn = document.getElementById("addExpenseBtn");
  const budgetInput = document.getElementById("budget");
  const monthSelect = document.getElementById("month");
  const expenseInput = document.getElementById("expense");
  const resultDiv = document.getElementById("result");
  const expensesTable = document.getElementById("expensesTable");
  const loginMessage = document.getElementById("loginMessage");

  let budgets = {};
  let expenses = {};

  loginBtn.addEventListener("click", function () {
    const username = usernameInput.value;
    const password = passwordInput.value;
    // Simulate authentication (replace with actual authentication logic)
    if (username === "user" && password === "abc") {
      loginForm.classList.add("hidden");
      trackerSection.classList.remove("hidden");
      loginMessage.textContent = "";
    } else {
      loginMessage.textContent = "Invalid username or password.";
    }
  });

  setBudgetBtn.addEventListener("click", function () {
    const month = monthSelect.value;
    const budget = parseFloat(budgetInput.value);
    if (!isNaN(budget)) {
      budgets[month] = budget;
      budgetInput.value = budget;
      updateResult();
    } else {
      alert("Please enter a valid budget amount.");
    }
  });

  addExpenseBtn.addEventListener("click", function () {
    const month = monthSelect.value;
    const expense = parseFloat(expenseInput.value);
    if (!isNaN(expense)) {
      if (!expenses[month]) {
        expenses[month] = [];
      }
      expenses[month].push(expense);
      expenseInput.value = "";
      updateResult();
      updateExpensesTable();
    } else {
      alert("Please enter a valid expense amount.");
    }
  });

  function updateResult() {
    resultDiv.innerHTML = "";
    for (const month in budgets) {
      const totalExpense = expenses[month]
        ? expenses[month].reduce((acc, val) => acc + val, 0)
        : 0;
      const difference = budgets[month] - totalExpense;
      const result = document.createElement("p");
      if (difference >= 0) {
        result.textContent = `${month}: You are within your budget by $${difference.toFixed(
          2
        )}`;
        result.style.color = "green";
      } else {
        result.textContent = `${month}: You are over your budget by $${Math.abs(
          difference
        ).toFixed(2)}`;
        result.style.color = "red";
      }
      resultDiv.appendChild(result);
    }
  }

  function updateExpensesTable() {
    expensesTable.innerHTML = "";
    for (const month in expenses) {
      const table = document.createElement("table");
      const header = document.createElement("tr");
      const monthHeader = document.createElement("th");
      monthHeader.textContent = month;
      header.appendChild(monthHeader);
      const expenseHeader = document.createElement("th");
      expenseHeader.textContent = "Expenses";
      header.appendChild(expenseHeader);
      table.appendChild(header);
      expenses[month].forEach((expense, index) => {
        const row = document.createElement("tr");
        const dayCell = document.createElement("td");
        dayCell.textContent = `Day ${index + 1}`;
        row.appendChild(dayCell);
        const expenseCell = document.createElement("td");
        expenseCell.textContent = `$${expense.toFixed(2)}`;
        row.appendChild(expenseCell);
        table.appendChild(row);
      });
      expensesTable.appendChild(table);
    }
  }
});
