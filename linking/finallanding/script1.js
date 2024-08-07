function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }

  document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseout", () => {
            card.classList.remove("hovered");
        });
    });
})

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseout", () => {
            card.classList.remove("hovered");
        });
    });

})





//expense tracker
document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    const incomeInput = document.getElementById("income-input");
    const netWorthInput = document.getElementById("net-worth-input");
    const updateIncomeButton = document.getElementById("update-income");
    const updateNetWorthButton = document.getElementById("update-net-worth");

    let expenses = [];
    let income = 0;
    let netWorth = 0;

    // Add expense
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalAmount();
        updateCards();

        expenseForm.reset();
    });

    // Edit or delete expense
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
            updateCards();
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
            updateCards();
        }
    });

    // Filter by category
    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category);
            displayExpenses(filteredExpenses);
        }
        updateCards();
    });

    // Update income
    updateIncomeButton.addEventListener("click", () => {
        income = parseFloat(incomeInput.value);
        updateCards();
    });

    // Update net worth
    updateNetWorthButton.addEventListener("click", () => {
        netWorth = parseFloat(netWorthInput.value);
        updateCards();
    });

    // Display expenses in the table
    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }

    // Update total amount of expenses
    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    // Update values on the cards
    function updateCards() {
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const savings = income - totalExpenses;

        document.getElementById("income").textContent = `$${income.toFixed(2)}`;
        document.getElementById("expenses").textContent = `$${Math.abs(totalExpenses).toFixed(2)}`;
        document.getElementById("savings").textContent = `$${savings.toFixed(2)}`;
        document.getElementById("net-worth").textContent = `$${netWorth.toFixed(2)}`;
    }
});

