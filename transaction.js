const Trasactions =()=> {
    const Token = localStorage.getItem("token");
    fetch("https://neighborhood-marketplace-869o.onrender.com/transactions/",{
        method : "GET",
        headers :{
            "Authorization":`Token ${Token}`,
        }
    })
    .then((res)=>res.json())
    .then((data)=>showtransactions(data))
    .catch((error)=>console.log("Error Fetching Listings",error));
};

const showtransactions =(items) =>{
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
const deleteTransaction = (id) => {
    const Token = localStorage.getItem("token")
    fetch(`https://neighborhood-marketplace-869o.onrender.com/transactions/${id}/`, {
        method: 'DELETE',
        headers :{
            "Authorization":`Token ${Token}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Transaction deleted successfully');
        window.location.href = "transaction.html";
    })
    .catch(error => {
        console.error('Error deleting Transaction:', error);
    });
};

Trasactions();