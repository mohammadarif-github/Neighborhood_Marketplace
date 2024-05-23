async function Transactions() {
    const url = "https://neighborhood-marketplace-869o.onrender.com/api/transactions/";
    const options = {
        method: "GET",
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            const data = await response.json();
            showTransactions(data);
        } else {
            console.error('Failed to fetch transactions:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        // Optionally display an error message to the user
    }
};

const showTransactions =(items) =>{
    const transactionTable = document.getElementById("transactionTable");
    
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Date</th>
        <th>User</th>
        <th>Status</th>
        <th>Listing Title</th>
        <th>Action</th>
    `;
    transactionTable.appendChild(headerRow);

    items.forEach((transaction) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>${transaction.buyer.username}</td>
            <td>${transaction.status}</td>
            <td>${transaction.listing.title}</td>
            <td>
                <button class="btn btn-warning btn-sm mx-1" onclick="updateTransaction(${transaction.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </td>
        `;
        transactionTable.appendChild(row);
    });
};
const updateTransaction = (id) => {
    window.location.href = `transaction_update.html?id=${id}`;
};

const deleteTransaction = async (id) => {
    const url = `https://neighborhood-marketplace-869o.onrender.com/api/transactions/${id}/`;
    const options = {
        method: 'DELETE',
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Transaction deleted successfully');
            window.location.href = "transaction.html";
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting Transaction:', error);
    }
};

Transactions();